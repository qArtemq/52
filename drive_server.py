# -*- coding: utf-8 -*-
"""
Лёгкий сервер: статика сайта + прокси видео с Google Диска.

Браузер не может играть drive.usercontent напрямую (Origin/Range → HTML).
Прокси качает с Диска без Origin и отдаёт как video/mp4 с поддержкой Range.
"""
from __future__ import annotations

import os
import sys
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

PORT = int(os.environ.get("PORT", "8530"))
ROOT = os.path.dirname(os.path.abspath(__file__))
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self):
        if self.path.startswith("/media/"):
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
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
        if self.path.startswith("/media/"):
            self.proxy_drive(head_only=False)
            return
        super().do_GET()

    def proxy_drive(self, head_only: bool):
        raw = self.path[len("/media/") :]
        file_id = raw.split("?", 1)[0].split("#", 1)[0].strip()
        # decode percent-encoding if any
        from urllib.parse import unquote

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
