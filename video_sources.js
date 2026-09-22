/**
 * Источники видео для хостинга.
 *
 * Локально (launcher / start.bat): файлы с диска (быстрее, перемотка карт надёжнее).
 * На хостинге в интернете: Google Диск по ID ниже.
 *
 * Папки:
 *   Медиа_52_на_9 — https://drive.google.com/drive/folders/1B19TGNtL7uY4wgrTImsEJojjLcMGbpp4
 *   Массаж         — https://drive.google.com/drive/folders/17IENs7xLLLjMPxb2UdR3Ysl5JrdoKunX
 *   9 MOON         — https://drive.google.com/drive/folders/1dHu5xXfMnL7GdRcqOZcDegIET912iVvL
 *
 * Для роликов больше ~100 МБ (массаж) может понадобиться бесплатный API-ключ
 * Google Drive — иначе Диск показывает «проверка на вирусы». См. HOSTING_GOOGLE_DRIVE.md
 */
const GOOGLE_API_KEY = ''; // вставьте ключ, если массаж не играет без него

/** true = всегда с Диска, даже на localhost (для проверки ссылок) */
const FORCE_DRIVE_MEDIA = false;

/** Включить Диск через адрес: ?drive=1  (батник test_google_drive.bat) */
function driveForcedByQuery() {
  try {
    return new URLSearchParams(location.search).get('drive') === '1';
  } catch (e) {
    return false;
  }
}

/**
 * Ключ = путь как в приложении (относительно корня сайта).
 * Значение = ID файла на Google Диске.
 */
const VIDEO_DRIVE_IDS = {
  // ===== 52 на 9 (карты) =====
  'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ 1-3.mp4': '1abr4qXYRmZ9zT1_gaLTUq2FNHZuDD2tG',
  'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ 4-6.mp4': '1Y8j-7Ay7WRShK8ll8GaHCxFfIHJqDgZ-',
  'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ 7-9.mp4': '1jVU-TSPSLZrZLJ1l-EUxs2QH9NqbWVLq',
  'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ J-Q.mp4': '19bOHm_Kkw4gCx-KivcDIAUHEiqeYzddY',
  'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ K-A.mp4': '1nC-8b5zoLUtQjDWO7mvwOA53kTNUnnkY',
  'Медиа_52_на_9/ТЕХНИКА БЕЗОПАСНОСТИ.mp4': '1H4m4BT_7Mj_6JWGrvwHDeeoyZmGKnsuI',

  // ===== 9 MOON =====
  '9 MOON/[SW.BAND] 00Что такое 9 MOON.mp4': '17zkiiUdLpn3UcTQI6UUvzOvg-CI6bNNc',
  '9 MOON/[SW.BAND] 1-ая Луна.mp4': '1biiBOgfRJaH0YvLTmjJi4WyDNAmrEgok',
  '9 MOON/[SW.BAND] 2-ая Луна.mp4': '1L9lDA3pEn0Zt_g2baAneAXg-3ztva4Ib',
  '9 MOON/[SW.BAND] 3-ая Луна.mp4': '16V9yDb1amwa-uowhjsHMex-sOeYGuLAJ',
  '9 MOON/[SW.BAND] 4-ая Луна.mp4': '1dBDQ_Yo2QrvZcLqeDilW_2Y3V5u2w1ix',
  '9 MOON/[SW.BAND] 5-ая Луна.mp4': '1_FIQCKDV4-SuOPwzlIYY2XzHhEsDjQWy',
  '9 MOON/[SW.BAND] 6-ая Луна.mp4': '18ZL-VdI6wL7rEXnV7gVf02sHxjJeqeN1',
  '9 MOON/[SW.BAND] 7-ая Луна.mp4': '1Nsh1se3lIMSGy6jBg5r7b9v7VUThgSiH',
  '9 MOON/[SW.BAND] 8-ая Луна.mp4': '1XCB8D1DCvc3VukcK_gTPtcLJKVgo-UW2',
  '9 MOON/[SW.BAND] 9-ая Луна.mp4': '1TOQo2tPfS8rofacGd4vqOzx9rZdqQnAy',
  '9 MOON/[SW.BAND] 12.jpg': '1ATIVniy0w85czdyFLLvq3KrtMZtI8RMm',

  // ===== Массаж =====
  'Массаж/1 САМОТЫК - НАЧАЛО.mp4': '1D7-Cu4QnG1YA2UViE2W97BbWwHJpdqmY',
  'Массаж/2 СТОПЫ (ЧАСТЬ1).mp4': '12v3RqGx6WejPa8FaUUYysgmh38NUTST9',
  'Массаж/3 СТОПЫ (ЧАСТЬ 2).mp4': '10kXWyTn915NpJMSSOzqRRKmxQWMJoaeM',
  'Массаж/4 ГОЛЕНЬ (часть 1).mp4': '1QkLzCDYN0bzpYDUus0JpsSx8Vqh_T3H7',
  'Массаж/5 ГОЛЕНЬ (часть 2).mp4': '1QdiSEYKYymsi5e1l7zwjYy7UFAl86T0K',
  'Массаж/6 КОЛЕНИ.mp4': '1G89Mjarc9qa-jk-pFVDm2WlPk9qhe0Ps',
  'Массаж/7 БЁДРА.mp4': '10mjyc-G44tqb7fhXoa3hDMOb-x6Np_cm',
  'Массаж/8 ЗАНИМАТЕЛЬНАЯ АНАТОМИЯ 1.mp4': '1GmsT4k9CZeVL4_5Ne3FHzcP0T8G-5mbM',
  'Массаж/9 ЗАНИМАТЕЛЬНАЯ АНАТОМИЯ 2.mp4': '1Mwv-397FiTwLY5mVgVcVoaXCvIniBAVq',
  'Массаж/10 ТАЗ И ЯГОДИЦЫ.mp4': '1BCcRZj8S2dSMFuFSNqH5gIBm76jFxZun',
  'Массаж/11 ПОЯСНИЦА И ЖИВОТ.mp4': '1qoj2hbvhGc81cuLWYIG8QVc2tqkF8kfi',
  'Массаж/12 СПИНА И ЖИВОТ.mp4': '11VN3VyeIhbarwdxlzQV8V-TGys7T_Dwf',
  'Массаж/13 РЁБРА И ГРУДЬ.mp4': '1YxpAe7dTyA-9qE5bFOrzA9hAbPzVF53N',
  'Массаж/14 ПЛЕЧИ И ЛОПАТКИ.mp4': '1o1kF2yxrP578FsoMXeFCkVf7Ppq3cL92',
  'Массаж/15 АНАТОМИЯ ПОЗВОНОЧНИКА 1.mp4': '1Lr_4u0uMoSkix_5Am9PIYnIryl2f6mKC',
  'Массаж/16 АНАТОМИЯ ПОЗВОНОЧНИКА 2.mp4': '16w5FyTtl9mMyroHSOoizkZe0y5-qmL0V',
  'Массаж/17 АНАТОМИЯ ПОЗВОНОЧНИКА 3.mp4': '1CFn_nnxM-NZf5LWCd3X-r7G4X7G8KxLh',
  'Массаж/18 ПОЗВОНОЧНИК И ШЕЯ.mp4': '11iqZ1gTg8K1ZGx95FnkdQQdk2BOUOpiQ',
  'Массаж/19 ШЕЯ.mp4': '1pgcUGnzHp4ijd9mLl9OxqXasmBxKVfoR',
  'Массаж/20 АНАТОМИЯ ШЕИ.mp4': '1GlVZFz4YL-xqYKkzjuBnZ1CgCDHdhXsP',
  'Массаж/21 РУКИ 1.mp4': '1MNsU78v53_eOaiA__OUFsVa4PgxGOtAh',
  'Массаж/22 РУКИ 2.mp4': '1fDMDKVe4lExtmx0PLjbaUhsIHaFlW3Mu',
  'Массаж/23 ГОЛОВА 1.mp4': '1Xp_rfbGIu8A8ImC8Ku5BvYFECP6iFM3M',
  'Массаж/24 ГОЛОВА 2.mp4': '1kOcr7V5MGWH4OAfaiaKvfPoKFCXRu1pw',
  'Массаж/25 ПОДВЕДЁМ ИТОГИ. ФИНАЛ.mp4': '1i8PjlA_DVBogJihqovh_udg9O0HZs7jl'
};

/**
 * Браузер НЕ может играть drive.usercontent напрямую (Google отдаёт HTML на Range+Origin).
 * Поэтому берём видео через наш прокси /media/FILE_ID (drive_server.py / Render).
 */
function driveStreamUrl(fileId) {
  const id = encodeURIComponent(fileId);
  // Тот же хост, что и сайт — нужен drive_server.py (локально) или Web Service на Render
  if (typeof location !== 'undefined' && location.protocol.startsWith('http')) {
    return `${location.origin}/media/${id}`;
  }
  if (GOOGLE_API_KEY) {
    return `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${encodeURIComponent(GOOGLE_API_KEY)}`;
  }
  return `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;
}

function localMediaUrl(relativePath) {
  return relativePath.split('/').map(encodeURIComponent).join('/');
}

function isRemoteHost() {
  const h = (typeof location !== 'undefined' && location.hostname) || '';
  return Boolean(h && h !== 'localhost' && h !== '127.0.0.1');
}

/**
 * URL для <video>/<img>.
 * @param {string} relativePath путь как в данных приложения
 * @param {{ startSec?: number }} [opts] стартовая секунда (#t=) для карт
 */
function resolveMediaUrl(relativePath, opts) {
  if (!relativePath) return '';
  const id = VIDEO_DRIVE_IDS[relativePath];
  const hasId = Boolean(id && String(id).trim());
  const useDrive = hasId && (FORCE_DRIVE_MEDIA || driveForcedByQuery() || isRemoteHost());

  let url = useDrive ? driveStreamUrl(String(id).trim()) : localMediaUrl(relativePath);

  if (opts && typeof opts.startSec === 'number' && opts.startSec > 0) {
    url += `#t=${Math.floor(opts.startSec)}`;
  }
  return url;
}

function isUsingGoogleDrive() {
  return FORCE_DRIVE_MEDIA || driveForcedByQuery() || isRemoteHost();
}

function countFilledDriveIds() {
  return Object.values(VIDEO_DRIVE_IDS).filter((v) => v && String(v).trim()).length;
}

function countTotalDriveSlots() {
  return Object.keys(VIDEO_DRIVE_IDS).length;
}
