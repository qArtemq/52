# -*- coding: utf-8 -*-
"""
Лёгкий сервер: статика сайта + прокси видео с Google Диска.

Браузер не может играть drive.usercontent напрямую (Origin/Range → HTML).
Прокси качает с Диска без Origin и отдаёт как video/mp4 с поддержкой Range.
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs, unquote, urlparse

PORT = int(os.environ.get("PORT", "8530"))
ROOT = os.path.dirname(os.path.abspath(__file__))
PROFILE_FILE = os.path.join(ROOT, "profiles.json")
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)


def load_profiles():
    try:
        if os.path.exists(PROFILE_FILE):
            with open(PROFILE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception as e:
        print("Error loading profiles:", e, flush=True)
    return {}


def save_profiles(data):
    try:
        with open(PROFILE_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print("Error saving profiles:", e, flush=True)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def do_OPTIONS(self):
        if self.path.startswith("/media/") or self.path.startswith("/api/"):
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Range, Content-Type")
            self.end_headers()
            return
        self.send_error(404)

    def do_HEAD(self):
        if self.path.startswith("/media/"):
            self.proxy_drive(head_only=True)
            return
        super().do_HEAD()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/profile":
            self.handle_profile_get(parsed)
            return
        if self.path.startswith("/media/"):
            self.proxy_drive(head_only=False)
            return
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/profile":
            self.handle_profile_post()
            return
        self.send_error(404)

    def handle_profile_get(self, parsed):
        query = parse_qs(parsed.query)
        username = (query.get("user") or [""])[0]
        profiles = load_profiles()
        user_data = profiles.get(
            username,
            {"history": [], "currentWorkout": None, "massageProgress": {}},
        )
        body = json.dumps(user_data, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_profile_post(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length) if length else b"{}"
        try:
            req = json.loads(raw.decode("utf-8"))
            username = req.get("username")
            data = req.get("data")
            if username and data is not None:
                profiles = load_profiles()
                profiles[username] = data
                save_profiles(profiles)
                body = json.dumps({"status": "ok"}, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
        except Exception as e:
            print("Error parsing profile POST:", e, flush=True)
        self.send_response(400)
        self.end_headers()

    def proxy_drive(self, head_only: bool):
        raw = self.path[len("/media/") :]
        file_id = raw.split("?", 1)[0].split("#", 1)[0].strip()
        file_id = unquote(file_id)
        if not file_id or "/" in file_id or len(file_id) < 20:
            self.send_error(400, "bad file id")
            return

        url = (
            "https://drive.usercontent.google.com/download"
            f"?id={file_id}&export=download&confirm=t"
        )
        headers = {"User-Agent": UA}
        range_hdr = self.headers.get("Range")
        if range_hdr:
            headers["Range"] = range_hdr

        req = urllib.request.Request(url, headers=headers, method="GET")
        try:
            upstream = urllib.request.urlopen(req, timeout=120)
        except urllib.error.HTTPError as e:
            body = e.read(500)
            self.send_response(e.code)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            if not head_only:
                self.wfile.write(b"Drive error: " + body[:300])
            return
        except Exception as e:
            self.send_error(502, f"proxy failed: {e}")
            return

        with upstream:
            ctype = upstream.headers.get("Content-Type", "application/octet-stream")
            # Sometimes Drive returns HTML interstitial
            if "text/html" in ctype:
                peek = upstream.read(800)
                self.send_response(502)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.end_headers()
                if not head_only:
                    self.wfile.write(
                        b"Google Drive returned HTML instead of video. "
                        b"Check sharing: Anyone with the link -> Viewer.\n"
                    )
                    self.wfile.write(peek[:400])
                return

            status = upstream.status
            self.send_response(status)
            self.send_header("Content-Type", "video/mp4")
            self.send_header("Content-Disposition", "inline")
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Access-Control-Allow-Origin", "*")

            for h in ("Content-Length", "Content-Range"):
                v = upstream.headers.get(h)
                if v:
                    self.send_header(h, v)

            self.end_headers()
            if head_only:
                return

            while True:
                chunk = upstream.read(64 * 1024)
                if not chunk:
                    break
                try:
                    self.wfile.write(chunk)
                except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
                    # Browser aborted (seek / switch video) — normal
                    break
                except OSError as e:
                    # WinError 10053/10054 etc. when client closes early
                    if getattr(e, "winerror", None) in (10053, 10054) or e.errno in (32, 104):
                        break
                    raise

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


class QuietThreadingHTTPServer(ThreadingHTTPServer):
    def handle_error(self, request, client_address):
        err = sys.exc_info()[1]
        if isinstance(err, (BrokenPipeError, ConnectionResetError, ConnectionAbortedError)):
            return
        if isinstance(err, OSError) and getattr(err, "winerror", None) in (10053, 10054):
            return
        super().handle_error(request, client_address)


def main():
    os.chdir(ROOT)
    server = QuietThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Drive proxy server: http://127.0.0.1:{PORT}/", flush=True)
    print(f"Test page: http://127.0.0.1:{PORT}/test_drive.html", flush=True)
    print(f"App with Drive: http://127.0.0.1:{PORT}/index.html?drive=1", flush=True)
    print("Stop: Ctrl+C / close window", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped", flush=True)


if __name__ == "__main__":
    main()
