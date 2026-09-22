// База данных карт и их видео
const videos = {
    '1-3': 'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ 1-3.mp4',
    '4-6': 'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ 4-6.mp4',
    '7-9': 'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ 7-9.mp4',
    'J-Q': 'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ J-Q.mp4',
    'K-A': 'Медиа_52_на_9/РАЗБОР ТЕХНИКИ КАРТ K-A.mp4'
};

if (typeof resolveMediaUrl !== 'function') {
    console.error('Не загружен video_sources.js — видео не смогут брать ссылки с Google Диска');
} else {
    const filled = typeof countFilledDriveIds === 'function' ? countFilledDriveIds() : 0;
    const total = typeof countTotalDriveSlots === 'function' ? countTotalDriveSlots() : 0;
    const fromDrive = typeof isUsingGoogleDrive === 'function' && isUsingGoogleDrive();
    console.info(`Видео: ${filled}/${total} ID. Источник сейчас: ${fromDrive ? 'Google Диск' : 'локальные файлы'}`);
}

const suits = {
    '♦️': { name: 'Бубны', color: 'red' },
    '♥️': { name: 'Черви', color: 'red' },
    '♠️': { name: 'Пики', color: 'black' },
    '♣️': { name: 'Трефы', color: 'black' }
};

const cardsData = [
    // 1-3
    { val: '1', suit: '♦️', video: '1-3', start: 28, end: 122 },
    { val: '1', suit: '♥️', video: '1-3', start: 122, end: 190 },
    { val: '1', suit: '♠️', video: '1-3', start: 190, end: 260 },
    { val: '1', suit: '♣️', video: '1-3', start: 260, end: 325 },
    { val: '2', suit: '♦️', video: '1-3', start: 325, end: 371 },
    { val: '2', suit: '♥️', video: '1-3', start: 371, end: 428 },
    { val: '2', suit: '♠️', video: '1-3', start: 428, end: 478 },
    { val: '2', suit: '♣️', video: '1-3', start: 478, end: 569 },
    { val: '3', suit: '♦️', video: '1-3', start: 569, end: 657 },
    { val: '3', suit: '♥️', video: '1-3', start: 657, end: 710 },
    { val: '3', suit: '♠️', video: '1-3', start: 710, end: 760 },
    { val: '3', suit: '♣️', video: '1-3', start: 760, end: 1500 }, // до конца

    // 4-6
    { val: '4', suit: '♦️', video: '4-6', start: 7, end: 75 },
    { val: '4', suit: '♥️', video: '4-6', start: 75, end: 153 },
    { val: '4', suit: '♠️', video: '4-6', start: 153, end: 227 },
    { val: '4', suit: '♣️', video: '4-6', start: 227, end: 335 },
    { val: '5', suit: '♦️', video: '4-6', start: 335, end: 410 },
    { val: '5', suit: '♥️', video: '4-6', start: 410, end: 493 },
    { val: '5', suit: '♠️', video: '4-6', start: 493, end: 542 },
    { val: '5', suit: '♣️', video: '4-6', start: 542, end: 621 },
    { val: '6', suit: '♦️', video: '4-6', start: 621, end: 684 },
    { val: '6', suit: '♥️', video: '4-6', start: 684, end: 773 },
    { val: '6', suit: '♠️', video: '4-6', start: 773, end: 838 },
    { val: '6', suit: '♣️', video: '4-6', start: 838, end: 1500 },

    // 7-9
    { val: '7', suit: '♦️', video: '7-9', start: 11, end: 82 },
    { val: '7', suit: '♥️', video: '7-9', start: 82, end: 143 },
    { val: '7', suit: '♠️', video: '7-9', start: 143, end: 223 },
    { val: '7', suit: '♣️', video: '7-9', start: 223, end: 309 },
    { val: '8', suit: '♦️', video: '7-9', start: 309, end: 360 },
    { val: '8', suit: '♥️', video: '7-9', start: 360, end: 445 },
    { val: '8', suit: '♠️', video: '7-9', start: 445, end: 528 },
    { val: '8', suit: '♣️', video: '7-9', start: 528, end: 604 },
    { val: '9', suit: '♦️', video: '7-9', start: 604, end: 679 },
    { val: '9', suit: '♥️', video: '7-9', start: 679, end: 740 },
    { val: '9', suit: '♠️', video: '7-9', start: 740, end: 805 },
    { val: '9', suit: '♣️', video: '7-9', start: 805, end: 1500 },

    // J-Q
    { val: 'J', suit: '♦️', video: 'J-Q', start: 9, end: 232 },
    { val: 'J', suit: '♥️', video: 'J-Q', start: 232, end: 343 },
    { val: 'J', suit: '♠️', video: 'J-Q', start: 343, end: 430 },
    { val: 'J', suit: '♣️', video: 'J-Q', start: 430, end: 558 },
    { val: 'Q', suit: '♦️', video: 'J-Q', start: 558, end: 642 },
    { val: 'Q', suit: '♥️', video: 'J-Q', start: 642, end: 711 },
    { val: 'Q', suit: '♠️', video: 'J-Q', start: 711, end: 765 },
    { val: 'Q', suit: '♣️', video: 'J-Q', start: 765, end: 1500 },

    // K-A
    { val: 'K', suit: '♦️', video: 'K-A', start: 7, end: 71 },
    { val: 'K', suit: '♥️', video: 'K-A', start: 71, end: 118 },
    { val: 'K', suit: '♠️', video: 'K-A', start: 118, end: 175 },
    { val: 'K', suit: '♣️', video: 'K-A', start: 175, end: 238 },
    { val: 'A', suit: '♦️', video: 'K-A', start: 238, end: 298 },
    { val: 'A', suit: '♥️', video: 'K-A', start: 298, end: 398 },
    { val: 'A', suit: '♠️', video: 'K-A', start: 398, end: 485 },
    { val: 'A', suit: '♣️', video: 'K-A', start: 485, end: 1500 }
];

// Таймер логика
let timerInterval = null;
let timerSeconds = 0;
const timerDisplay = document.getElementById('timer');
const btnStartTimer = document.getElementById('btn-start-timer');
const btnResetTimer = document.getElementById('btn-reset-timer');

function formatTime(s) {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerSeconds);
}

btnStartTimer.addEventListener('click', () => {
    if (timerInterval) {
        // Pause
        clearInterval(timerInterval);
        timerInterval = null;
        btnStartTimer.textContent = 'СТАРТ';
        btnStartTimer.className = 'btn btn-primary';
    } else {
        // Start
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
        btnStartTimer.textContent = 'ПАУЗА';
        btnStartTimer.className = 'btn btn-secondary';
    }
});

btnResetTimer.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    updateTimerDisplay();
    btnStartTimer.textContent = 'СТАРТ';
    btnStartTimer.className = 'btn btn-primary';
});

const btnToggleTimer = document.getElementById('btn-toggle-timer');
const timerContent = document.getElementById('timer-content');
if (btnToggleTimer) {
    btnToggleTimer.addEventListener('click', () => {
        if (timerContent.style.display === 'none') {
            timerContent.style.display = 'block';
            btnToggleTimer.textContent = 'Скрыть таймер';
        } else {
            timerContent.style.display = 'none';
            btnToggleTimer.textContent = '⏱ Показать таймер';
        }
    });
}

// Логика раздачи карт
const btnDeal = document.getElementById('btn-deal');
const cardsContainer = document.getElementById('cards-container');
const videoModal = document.getElementById('video-modal');
const closeModal = document.getElementById('close-modal');
const exerciseVideo = document.getElementById('exercise-video');
const modalTitle = document.getElementById('modal-title');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let currentMode = 9;

document.getElementById('btn-mode-9').addEventListener('click', (e) => {
    currentMode = 9;
    e.target.className = 'btn btn-primary';
    e.target.style.flex = '1';
    const otherBtn = document.getElementById('btn-mode-6');
    otherBtn.className = 'btn btn-secondary';
    otherBtn.style.flex = '1';
});

document.getElementById('btn-mode-6').addEventListener('click', (e) => {
    currentMode = 6;
    e.target.className = 'btn btn-primary';
    e.target.style.flex = '1';
    const otherBtn = document.getElementById('btn-mode-9');
    otherBtn.className = 'btn btn-secondary';
    otherBtn.style.flex = '1';
});

const suitMap = {
    '♦️': 'diamonds',
    '♥️': 'hearts',
    '♠️': 'spades',
    '♣️': 'clubs',
    '♦': 'diamonds',
    '♥': 'hearts',
    '♠': 'spades',
    '♣': 'clubs'
};

function renderCards(drawnCards, animate = false) {
    cardsContainer.innerHTML = '';
    
    drawnCards.forEach((card, index) => {
        const suitName = suitMap[card.suit] || suitMap[card.suit.charAt(0)];
        const bgImage = `images/card_${card.val}_${suitName}.png?v=10`;
        
        const cardEl = document.createElement('div');
        cardEl.className = 'playing-card image-card';
        cardEl.style.backgroundImage = `url('${bgImage}')`;
        
        if (animate) {
            cardEl.style.opacity = '0';
            cardEl.style.animation = 'none';
            setTimeout(() => {
                cardEl.style.animation = 'flipIn 0.5s ease forwards';
            }, index * 150);
        } else {
            cardEl.style.opacity = '1';
            cardEl.style.animation = 'none';
        }
        
        cardEl.addEventListener('click', () => openVideo(card));
        cardsContainer.appendChild(cardEl);
    });
}

btnDeal.addEventListener('click', () => {
    cardsContainer.innerHTML = '<div class="empty-state">Тасовка колоды... 🃏</div>';
    
    setTimeout(() => {
        const deck = [...cardsData];
        shuffle(deck);
        const drawnCards = deck.slice(0, currentMode);
        
        // Сохраняем в localStorage
        localStorage.setItem('lastWorkout', JSON.stringify(drawnCards));
        
        // Сохраняем в профиль
        const now = new Date();
        const currentMs = now.getTime();
        const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Если предыдущая тренировка была сгенерирована менее 1 минуты назад, 
        // считаем, что пользователь просто 'роллит' колоду, и перезаписываем последнюю запись.
        let isReroll = false;
        if (userHistory.length > 0) {
            const lastEntry = userHistory[userHistory.length - 1];
            if (lastEntry.timestamp && (currentMs - lastEntry.timestamp < 1 * 60 * 1000)) {
                lastEntry.date = dateStr;
                lastEntry.timestamp = currentMs;
                lastEntry.mode = currentMode;
                lastEntry.cards = drawnCards;
                isReroll = true;
            }
        }
        
        if (!isReroll) {
            userHistory.push({
                date: dateStr,
                timestamp: currentMs,
                mode: currentMode,
                cards: drawnCards
            });
            // Ограничиваем историю 50 последними тренировками
            if (userHistory.length > 50) userHistory.shift();
        }
        
        syncProfileToServer();
        
        renderCards(drawnCards, true);
    }, 800);
});

// Восстановление последней тренировки по кнопке
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('lastWorkout');
    const btnRestore = document.getElementById('btn-restore');
    if (saved && btnRestore) {
        btnRestore.style.display = 'inline-block';
        
        btnRestore.addEventListener('click', () => {
            try {
                const drawnCards = JSON.parse(saved);
                renderCards(drawnCards, false);
                
                // Восстанавливаем режим 6/9
                if (drawnCards.length === 6) {
                    document.getElementById('btn-mode-6').click();
                } else {
                    document.getElementById('btn-mode-9').click();
                }
            } catch (e) {
                console.error('Failed to parse saved workout', e);
            }
        });
    }
});

// Текущая карта (нужна для кнопок перемотки)
let currentCard = null;



function openVideo(card) {
    currentCard = card;
    const relativePath = videos[card.video];
    const modalText = document.getElementById('modal-text');
    modalText.style.display = 'none';
    modalText.textContent = '';
    
    const exerciseImage = document.getElementById('exercise-image');
    if(exerciseImage) exerciseImage.style.display = 'none';
    
    modalTitle.innerHTML = `Карта: ${card.val} <span style="color: ${suits[card.suit].color}">${card.suit}</span>`;
    
    // Убираем старые обработчики
    exerciseVideo.ontimeupdate = null;
    exerciseVideo.onloadedmetadata = null;
    
    // Локальный файл или Google Диск (см. video_sources.js)
    exerciseVideo.src = resolveMediaUrl(relativePath, { startSec: card.start });
    
    // loadedmetadata — самое раннее надёжное событие для seek
    exerciseVideo.onloadedmetadata = function() {
        exerciseVideo.currentTime = card.start;
        exerciseVideo.play().catch(e => console.log('play blocked:', e));
    };
    
    // Остановка в конце фрагмента — НЕ мешает ручной перемотке
    exerciseVideo.ontimeupdate = function() {
        if (currentCard && exerciseVideo.currentTime >= currentCard.end) {
            exerciseVideo.pause();
        }
    };
    
    exerciseVideo.load();
    videoModal.classList.add('active');
}

document.getElementById('btn-rewind').addEventListener('click', () => {
    exerciseVideo.currentTime = Math.max(0, exerciseVideo.currentTime - 10);
});

document.getElementById('btn-forward').addEventListener('click', () => {
    exerciseVideo.currentTime = exerciseVideo.currentTime + 10;
});

document.getElementById('btn-rules').addEventListener('click', () => {
    currentCard = null;
    modalTitle.innerHTML = `📖 Как тренироваться (Метод 52 на 9)`;
    
    const exerciseImage = document.getElementById('exercise-image');
    if(exerciseImage) exerciseImage.style.display = 'none';
    
    exerciseVideo.pause();
    exerciseVideo.style.display = 'none';
    document.getElementById('btn-rewind').parentElement.style.display = 'none';
    
    const modalText = document.getElementById('modal-text');
    modalText.style.display = 'block';
    modalText.innerHTML = `
        <p><strong>Суть тренировки «52 на 9» — это специальная пирамида:</strong></p>
        <p>Каждое упражнение, которое выпадает на карте, выполняется ровно <strong>9 раз</strong>. Но главная фишка метода кроется в порядке выполнения открытых карт!</p>
        <br>
        <p>Когда вы тянете карты, вы выполняете их по следующей схеме накопления:</p>
        <ul style="line-height: 1.8; margin-left: 20px;">
            <li><strong>1-я карта:</strong> Делаете только 1-ю карту.</li>
            <li><strong>2-я карта:</strong> Делаете 2-ю карту, затем возвращаетесь к 1-й, и снова делаете 2-ю.<br><span style="color: #aaa;">(Формула: 2 ➡️ 1 ➡️ 2)</span></li>
            <li><strong>3-я карта:</strong> Делаете 3-ю карту, затем 1-ю, 2-ю, и снова 3-ю.<br><span style="color: #aaa;">(Формула: 3 ➡️ 1 ➡️ 2 ➡️ 3)</span></li>
            <li><strong>4-я карта:</strong> Делаете 4-ю карту, затем 1, 2, 3 и снова 4.<br><span style="color: #aaa;">(Формула: 4 ➡️ 1 ➡️ 2 ➡️ 3 ➡️ 4)</span></li>
            <li>И так далее для каждой новой карты!</li>
        </ul>
        <br>
        <p><strong>Сколько делать подходов:</strong></p>
        <ul style="line-height: 1.8; margin-left: 20px;">
            <li>Классически нужно делать <strong>5 подходов</strong>.</li>
            <li>Сначала вы делаете упражнение с правой стороны, затем левую сторону — <strong>это считается только за 1 подход</strong>.</li>
            <li><strong>Но самое главное:</strong> смотрите по своему состоянию! Если тяжело, смело делайте меньше подходов. Слушайте свое тело.</li>
        </ul>
        <br>
        <p>Ваша цель — пройти колоду из 52 карт. Это потрясающая тренировка на выносливость! Если забыли технику — жмите на саму карту для видео-разбора.</p>
    `;
    
    videoModal.classList.add('active');
});

document.getElementById('btn-safety').addEventListener('click', () => {
    currentCard = null; // нет ограничения по времени
    modalTitle.innerHTML = `🛡️ Техника безопасности`;
    const modalText = document.getElementById('modal-text');
    modalText.style.display = 'none';
    modalText.textContent = '';
    
    const exerciseImage = document.getElementById('exercise-image');
    if(exerciseImage) exerciseImage.style.display = 'none';
    
    exerciseVideo.ontimeupdate = null;
    exerciseVideo.onloadedmetadata = null;
    
    exerciseVideo.src = resolveMediaUrl('Медиа_52_на_9/ТЕХНИКА БЕЗОПАСНОСТИ.mp4');
    exerciseVideo.onloadedmetadata = function() {
        exerciseVideo.currentTime = 0;
        exerciseVideo.play().catch(e => console.log('play blocked:', e));
    };
    
    exerciseVideo.load();
    videoModal.classList.add('active');
});

closeModal.addEventListener('click', closeVideo);

// Закрытие по клику вне модалки
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideo();
    }
});

// ===== ЛОГИКА ВКЛАДОК =====
const tab52 = document.getElementById('tab-52');
const tabMoons = document.getElementById('tab-moons');
const tabMassage = document.getElementById('tab-massage');
const timerSection = document.getElementById('timer-section');
const cardsSection = document.getElementById('cards-section');
const moonsSection = document.getElementById('moons-section');
const massageSection = document.getElementById('massage-section');
const bottomBar = document.getElementById('bottom-bar');

tab52.addEventListener('click', () => {
    tab52.className = 'btn btn-primary';
    tabMoons.className = 'btn btn-secondary';
    tabMassage.className = 'btn btn-secondary';
    
    timerSection.style.display = 'block';
    cardsSection.style.display = 'block';
    bottomBar.style.display = 'block';
    moonsSection.style.display = 'none';
    massageSection.style.display = 'none';
});

tabMoons.addEventListener('click', () => {
    tabMoons.className = 'btn btn-primary';
    tab52.className = 'btn btn-secondary';
    tabMassage.className = 'btn btn-secondary';
    
    timerSection.style.display = 'none';
    cardsSection.style.display = 'none';
    bottomBar.style.display = 'none';
    moonsSection.style.display = 'block';
    massageSection.style.display = 'none';
});

tabMassage.addEventListener('click', () => {
    tabMassage.className = 'btn btn-primary';
    tab52.className = 'btn btn-secondary';
    tabMoons.className = 'btn btn-secondary';
    
    timerSection.style.display = 'none';
    cardsSection.style.display = 'none';
    bottomBar.style.display = 'none';
    moonsSection.style.display = 'none';
    massageSection.style.display = 'block';
});

// ===== ЛОГИКА МАССАЖА =====
const massageContainer = document.getElementById('massage-container');
// massageData загружается из massage_data.js

let massageProgress = JSON.parse(localStorage.getItem('massageProgress') || '{}');

function formatMinSec(seconds) {
    if (!seconds) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function renderMassageList() {
    massageContainer.innerHTML = '';
    
    massageData.forEach((lesson) => {
        const progress = massageProgress[lesson.name] || { watched: false, time: 0 };
        
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '10px';
        
        // Чекбокс просмотрено
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = progress.watched;
        checkbox.style.transform = 'scale(1.5)';
        checkbox.style.accentColor = 'var(--primary-color)';
        checkbox.addEventListener('change', (e) => {
            if (!massageProgress[lesson.name]) massageProgress[lesson.name] = { time: 0 };
            massageProgress[lesson.name].watched = e.target.checked;
            localStorage.setItem('massageProgress', JSON.stringify(massageProgress));
        });
        
        // Кнопка урока
        const btn = document.createElement('button');
        btn.className = 'btn btn-large btn-secondary';
        btn.style.flex = '1';
        btn.style.marginBottom = '0';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'space-between';
        
        let timeStr = progress.time > 0 ? ` <span style="font-size: 0.8rem; color: #aaa;">(${formatMinSec(progress.time)})</span>` : '';
        btn.innerHTML = `<span>💆‍♂️ ${lesson.name}${timeStr}</span> <span>▶️</span>`;
        
        btn.addEventListener('click', () => {
            currentCard = null;
            modalTitle.innerHTML = '💆‍♂️ ' + lesson.name;
            
            const modalText = document.getElementById('modal-text');
            modalText.style.display = 'none';
            modalText.innerHTML = '';
            
            const exerciseImage = document.getElementById('exercise-image');
            if(exerciseImage) exerciseImage.style.display = 'none';
            
            exerciseVideo.ontimeupdate = null;
            exerciseVideo.onloadedmetadata = null;
            
            exerciseVideo.style.display = 'block';
            document.getElementById('btn-rewind').parentElement.style.display = 'flex';
            
            const savedTime = (massageProgress[lesson.name] && massageProgress[lesson.name].time) || 0;
            exerciseVideo.src = resolveMediaUrl(lesson.file, savedTime > 0 ? { startSec: savedTime } : undefined);
            
            exerciseVideo.onloadedmetadata = function() {
                // Восстанавливаем время
                exerciseVideo.currentTime = savedTime;
                exerciseVideo.play().catch(e => console.log('play blocked:', e));
            };
            
            // Сохраняем прогресс каждые 5 секунд
            exerciseVideo.ontimeupdate = function() {
                if (exerciseVideo.currentTime > 0) {
                    if (!massageProgress[lesson.name]) massageProgress[lesson.name] = { watched: false, time: 0 };
                    
                    // Обновляем только если разница больше 3 сек, чтобы не спамить localStorage
                    if (Math.abs(massageProgress[lesson.name].time - exerciseVideo.currentTime) > 3) {
                        massageProgress[lesson.name].time = exerciseVideo.currentTime;
                        localStorage.setItem('massageProgress', JSON.stringify(massageProgress));
                    }
                }
            };
            
            exerciseVideo.load();
            videoModal.classList.add('active');
            
            // При закрытии модалки обновляем список, чтобы показать сохраненное время
            const closeHandler = () => {
                renderMassageList();
                videoModal.removeEventListener('click', overlayCloseHandler);
                closeModal.removeEventListener('click', closeHandler);
            };
            const overlayCloseHandler = (e) => {
                if (e.target === videoModal) closeHandler();
            };
            closeModal.addEventListener('click', closeHandler);
            videoModal.addEventListener('click', overlayCloseHandler);
        });
        
        wrapper.appendChild(checkbox);
        wrapper.appendChild(btn);
        massageContainer.appendChild(wrapper);
    });
}
renderMassageList();

// ===== ЛОГИКА 9 ЛУН =====
const moonsContainer = document.getElementById('moons-container');
// moonsData теперь загружается из moons_data.js

function calculateMoon() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const dateStr = `${dd}.${mm}.${yyyy}`;
    
    document.getElementById('calc-date').textContent = dateStr;
    
    const digits = (dd + mm + String(yyyy)).split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    let formula = digits.join(' + ') + ' = ' + sum;
    
    while (sum > 9) {
        const newDigits = String(sum).split('').map(Number);
        const newSum = newDigits.reduce((a, b) => a + b, 0);
        formula += ' = ' + newDigits.join(' + ') + ' = ' + newSum;
        sum = newSum;
    }
    
    document.getElementById('calc-result').innerHTML = `🌙 ${sum}-ая Луна`;
    document.getElementById('calc-formula').textContent = formula;
}
calculateMoon();

moonsData.forEach((moon) => {
    // Пропускаем интро, так как для него есть отдельная кнопка
    if (moon.name === '00Что такое 9 MOON') return;

    const btn = document.createElement('button');
    btn.className = 'btn btn-large btn-secondary';
    btn.style.marginBottom = '0';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'space-between';
    
    // Если нет видео, но есть текст - показываем иконку текста
    const icon = moon.video_file ? '▶️' : '📄';
    btn.innerHTML = `<span>🌙 ${moon.name}</span> <span>${icon}</span>`;
    
    btn.addEventListener('click', () => {
        currentCard = null;
        modalTitle.innerHTML = '🌙 ' + moon.name;
        
        const modalText = document.getElementById('modal-text');
        if (moon.text) {
            modalText.style.display = 'block';
            modalText.innerHTML = moon.text;
        } else {
            modalText.style.display = 'none';
            modalText.innerHTML = '';
        }
        
        exerciseVideo.ontimeupdate = null;
        exerciseVideo.onloadedmetadata = null;
        
        const exerciseImage = document.getElementById('exercise-image');
        
        if (moon.image_file) {
            exerciseImage.style.display = 'block';
            exerciseImage.src = resolveMediaUrl(moon.image_file);
        } else {
            exerciseImage.style.display = 'none';
            exerciseImage.src = '';
        }
        
        if (moon.video_file) {
            exerciseVideo.style.display = 'block';
            document.getElementById('btn-rewind').parentElement.style.display = 'flex';
            
            exerciseVideo.src = resolveMediaUrl(moon.video_file);
            
            exerciseVideo.onloadedmetadata = function() {
                exerciseVideo.currentTime = 0;
                exerciseVideo.play().catch(e => console.log('play blocked:', e));
            };
            exerciseVideo.load();
        } else {
            // Если нет видео (например, 12 Общие рекомендации)
            exerciseVideo.style.display = 'none';
            document.getElementById('btn-rewind').parentElement.style.display = 'none';
            exerciseVideo.pause();
            exerciseVideo.src = '';
        }
        
        videoModal.classList.add('active');
    });
    moonsContainer.appendChild(btn);
});

document.getElementById('btn-moons-intro').addEventListener('click', () => {
    currentCard = null;
    modalTitle.innerHTML = '📖 Что такое 9 MOON?';
    
    const exerciseImage = document.getElementById('exercise-image');
    exerciseImage.style.display = 'none';
    
    const modalText = document.getElementById('modal-text');
    const introMoon = moonsData.find(m => m.name === '00Что такое 9 MOON');
    if (introMoon && introMoon.text) {
        modalText.style.display = 'block';
        modalText.innerHTML = introMoon.text;
    } else {
        modalText.style.display = 'none';
        modalText.innerHTML = '';
    }
    
    exerciseVideo.ontimeupdate = null;
    exerciseVideo.onloadedmetadata = null;
    exerciseVideo.style.display = 'block';
    document.getElementById('btn-rewind').parentElement.style.display = 'flex';
    exerciseVideo.src = resolveMediaUrl('9 MOON/[SW.BAND] 00Что такое 9 MOON.mp4');
    exerciseVideo.onloadedmetadata = function() {
        exerciseVideo.currentTime = 0;
        exerciseVideo.play().catch(e => console.log('play blocked:', e));
    };
    exerciseVideo.load();
    videoModal.classList.add('active');
});

function closeVideo() {
    videoModal.classList.remove('active');
    exerciseVideo.pause();
    exerciseVideo.ontimeupdate = null;
    exerciseVideo.onloadedmetadata = null;
    exerciseVideo.src = '';
    currentCard = null;
    // Возвращаем видимость на всякий случай
    exerciseVideo.style.display = 'block';
    document.getElementById('btn-rewind').parentElement.style.display = 'flex';
    if (typeof syncProfileToServer === 'function') syncProfileToServer();
}

// Управление плеером с клавиатуры
document.addEventListener('keydown', (e) => {
    // Работает только если модальное окно с видео открыто
    if (videoModal.classList.contains('active') && exerciseVideo.style.display !== 'none') {
        switch (e.code) {
            case 'Space':
                e.preventDefault(); // Предотвращает прокрутку страницы
                if (exerciseVideo.paused) {
                    exerciseVideo.play().catch(e => console.log('play blocked:', e));
                } else {
                    exerciseVideo.pause();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                exerciseVideo.currentTime = Math.max(0, exerciseVideo.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                exerciseVideo.currentTime = exerciseVideo.currentTime + 10;
                break;
        }
    }
});

// ===== ЛОГИКА ПРОФИЛЕЙ И СИНХРОНИЗАЦИИ =====
let currentUser = localStorage.getItem('currentUser') || '';
let userHistory = [];

const btnProfile = document.getElementById('btn-profile');
const profileModal = document.getElementById('profile-modal');
const closeProfileModal = document.getElementById('close-profile-modal');
const profileNameInput = document.getElementById('profile-name-input');
const btnLogin = document.getElementById('btn-login');
const historyContainer = document.getElementById('history-container');
const btnClearHistory = document.getElementById('btn-clear-history');

function updateProfileButton() {
    if (currentUser) {
        btnProfile.textContent = `👤 ${currentUser}`;
    } else {
        btnProfile.textContent = `👤 Гость`;
    }
}

function profileLocalKey(user) {
    return 'profileData_' + user;
}

function saveProfileLocally() {
    if (!currentUser) return;
    try {
        localStorage.setItem(profileLocalKey(currentUser), JSON.stringify({
            history: userHistory,
            massageProgress: massageProgress
        }));
    } catch (e) {
        console.error('local profile save failed', e);
    }
}

function loadProfileLocally() {
    if (!currentUser) return null;
    try {
        const raw = localStorage.getItem(profileLocalKey(currentUser));
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

async function syncProfileToServer() {
    if (!currentUser) return;
    const data = {
        history: userHistory,
        massageProgress: massageProgress
    };
    saveProfileLocally();
    try {
        await fetch(window.location.origin + '/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser, data: data })
        });
    } catch (e) {
        console.error('Ошибка синхронизации', e);
    }
}

async function loadProfileFromServer() {
    if (!currentUser) return;

    // Сначала локальный кэш этого браузера (на этом же сайте)
    const local = loadProfileLocally();
    if (local) {
        if (Array.isArray(local.history)) userHistory = local.history;
        if (local.massageProgress && Object.keys(local.massageProgress).length > 0) {
            massageProgress = local.massageProgress;
            localStorage.setItem('massageProgress', JSON.stringify(massageProgress));
            renderMassageList();
        }
        renderHistory();
    }

    try {
        const res = await fetch(window.location.origin + `/api/profile?user=${encodeURIComponent(currentUser)}`);
        if (res.ok) {
            const data = await res.json();
            const serverHistory = data.history || [];
            // Берём более полную историю (сервер или локальный кэш)
            if (serverHistory.length >= userHistory.length) {
                userHistory = serverHistory;
            }
            
            // Восстанавливаем массаж из облака, если там есть данные
            if (data.massageProgress && Object.keys(data.massageProgress).length > 0) {
                massageProgress = data.massageProgress;
                localStorage.setItem('massageProgress', JSON.stringify(massageProgress));
                renderMassageList();
            }
            saveProfileLocally();
            renderHistory();
        }
    } catch (e) {
        console.error('Ошибка загрузки профиля', e);
        renderHistory();
    }
}

function renderHistory() {
    historyContainer.innerHTML = '';
    if (userHistory.length === 0) {
        historyContainer.innerHTML = '<div class="empty-state">История пуста.</div>';
        if (btnClearHistory) btnClearHistory.style.display = 'none';
        return;
    }
    if (btnClearHistory) btnClearHistory.style.display = 'block';
    
    const sorted = [...userHistory].reverse();
    
    sorted.forEach((entry, i) => {
        const actualIndex = userHistory.length - 1 - i;
        
        const div = document.createElement('div');
        div.style.background = '#2a2a2a';
        div.style.padding = '10px';
        div.style.borderRadius = '8px';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.marginBottom = '5px';
        
        const info = document.createElement('div');
        
        let cardsHtml = '';
        if (entry.cards && entry.cards.length > 0) {
            cardsHtml = '<div style="margin-top: 5px; font-size: 0.9rem; display: flex; gap: 5px; flex-wrap: wrap;">';
            entry.cards.forEach(c => {
                const color = (c.suit.includes('♥') || c.suit.includes('♦')) ? '#ff4444' : '#aaaaaa';
                cardsHtml += `<span style="color: ${color}; background: #111; padding: 2px 5px; border-radius: 4px;">${c.val}${c.suit}</span>`;
            });
            cardsHtml += '</div>';
        }

        info.innerHTML = `<div style="color: #fff; font-weight: bold; font-size: 0.95rem;">${entry.date} <span style="color:#888; font-weight:normal; font-size:0.8rem;">(${entry.mode} карт)</span></div>
                          ${cardsHtml}`;
        
        const btnPlay = document.createElement('button');
        btnPlay.className = 'btn btn-primary';
        btnPlay.style.padding = '8px 12px';
        btnPlay.style.margin = '0';
        btnPlay.textContent = '▶ Повторить';
        btnPlay.addEventListener('click', () => {
            profileModal.classList.remove('active');
            document.getElementById('tab-52').click();
            localStorage.setItem('lastWorkout', JSON.stringify(entry.cards));
            currentMode = entry.mode;
            if (currentMode === 6) {
                document.getElementById('btn-mode-6').click();
            } else {
                document.getElementById('btn-mode-9').click();
            }
            renderCards(entry.cards, false);
        });
        
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = '✖';
        btnDelete.style.background = 'transparent';
        btnDelete.style.border = 'none';
        btnDelete.style.color = '#ff4444';
        btnDelete.style.fontSize = '1.2rem';
        btnDelete.style.cursor = 'pointer';
        btnDelete.style.padding = '5px 10px';
        btnDelete.style.marginLeft = '5px';
        
        btnDelete.addEventListener('click', () => {
            if (confirm('Удалить эту тренировку из истории?')) {
                userHistory.splice(actualIndex, 1);
                syncProfileToServer();
                renderHistory();
            }
        });
        
        const actionDiv = document.createElement('div');
        actionDiv.style.display = 'flex';
        actionDiv.style.alignItems = 'center';
        actionDiv.appendChild(btnPlay);
        actionDiv.appendChild(btnDelete);
        
        div.appendChild(info);
        div.appendChild(actionDiv);
        historyContainer.appendChild(div);
    });
}

btnProfile.addEventListener('click', () => {
    profileNameInput.value = currentUser;
    renderHistory();
    profileModal.classList.add('active');
});

closeProfileModal.addEventListener('click', () => {
    profileModal.classList.remove('active');
});

btnLogin.addEventListener('click', () => {
    const name = profileNameInput.value.trim();
    if (name) {
        currentUser = name;
        localStorage.setItem('currentUser', currentUser);
        updateProfileButton();
        loadProfileFromServer();
    }
});

// Обновляем кнопку при загрузке
updateProfileButton();
if (currentUser) {
    loadProfileFromServer();
}

// ======================================


if (btnClearHistory) {
    btnClearHistory.addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите удалить ВСЮ историю тренировок?')) {
            userHistory = [];
            syncProfileToServer();
            renderHistory();
        }
    });
}

// ===== WAKE LOCK (НЕТУХНУЩИЙ ЭКРАН) =====
let wakeLock = null;

// Создаем невидимое видео для iOS
const noSleepVideo = document.createElement('video');
noSleepVideo.setAttribute('title', 'No Sleep');
noSleepVideo.setAttribute('playsinline', '');
noSleepVideo.setAttribute('muted', '');
noSleepVideo.setAttribute('loop', '');
// Крошечный пустой mp4
noSleepVideo.src = 'data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthMQEAAQQQ0AAgQEAAAAAABnAAAB0W1vb3YAAABsbXZoZAAAAADR40nXR40nXAABq6QAAAEQAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAABUdHJhawAAAFx0a2hkAAAAD9HjSddHjSdcAAAAAQAAAAAAAQAAAAAAAQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAEAAAABAAAAAAhNRElBAAAAHG1kaGQAAAAA0eNJ10eNJ1wAAB1MAAACAAAAAAARaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAFybWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcYnJlZgAAABR1cmwgAAAAAQAAAAAAAAAAAAAA/HN0YmwAAABRc3RzZAAAAAAAAAEAAABBYXZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAABAAAAAQBIAAAASAAAAAAAAAAAEAAAABAAAAAAAAAAAAYAAAAAEAAAAAAAAAAAAAAAAQAAAAAAABhzdHRzAAAAAAAAAAEAAAABAAACAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzejAAAAAAAAAAAAAAAQAAABgAAAAUc3RjbwAAAAAAAAABAAAAHAAAAFZ1ZHRhAAAAAE1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlaXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTkuMjcuMTAw';

async function requestWakeLock() {
    // 1. Попытка использовать современный API (Android / новые iOS)
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.error('Wake Lock API error:', err);
    }
    
    // 2. Фолбэк для старых iOS и Сафари (воспроизведение пустого видео)
    try {
        await noSleepVideo.play();
    } catch (err) {
        console.error('Video Wake Lock error:', err);
    }
}

document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        await requestWakeLock();
    } else if (document.visibilityState === 'visible') {
        // Если возвращаемся, снова пробуем запустить видео
        noSleepVideo.play().catch(e => console.error(e));
    }
});

// Браузеры требуют взаимодействия с пользователем перед включением Wake Lock (и видео)
document.addEventListener('click', () => {
    requestWakeLock();
}, { once: true });
// На iOS иногда нужно касание (touchstart)
document.addEventListener('touchstart', () => {
    requestWakeLock();
}, { once: true });
