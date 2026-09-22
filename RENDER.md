# Выложить на Render (бесплатно)

Видео с Google Диска **нельзя** отдавать напрямую в `<video>` с другого сайта — браузер получает HTML вместо mp4. Поэтому на Render нужен **Web Service** с прокси `drive_server.py`, а не Static Site.

## 1. Подготовка

1. Запустите `pack_for_hosting.ps1` — папка `hosting_upload`.
2. Залейте **содержимое** `hosting_upload` в репозиторий GitHub (в корень).

В пакете должны быть: `index.html`, `app.js`, `video_sources.js`, `drive_server.py` и остальные лёгкие файлы. **Без** папок mp4.

## 2. Создать Web Service

1. [render.com](https://render.com) → войти через GitHub.
2. **New** → **Web Service**.
3. Подключите репозиторий.
4. Настройки:
   - **Runtime:** Python
   - **Build Command:** `echo ok`
   - **Start Command:** `python drive_server.py`
   - **Instance type:** Free
5. **Create Web Service**.

Render сам подставит переменную `PORT`. Сервер её читает.

Через пару минут будет ссылка вида `https://52-na-9.onrender.com`.

## 3. Проверка

1. Откройте сайт.
2. Нажмите карту / Луну / массаж — видео идут через `/media/...` с вашего сервера, а сервер тянет их с Диска.
3. Локально перед деплоем: `test_google_drive.bat`.

## Важно

- Бесплатный Web Service на Render «засыпает» после ~15 минут простоя — первый заход может подождать 30–60 секунд.
- Профили на сервере не хранятся: прогресс в `localStorage` браузера.
- Видео на GitHub/Render не заливайте.
