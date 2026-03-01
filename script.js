// ===== CONFIG =====
const BIRTHDAY = new Date('2026-03-28T00:00:00');

// ===== MICROCOPY =====
const microcopies = [
    "The world is not ready.",
    "Almost your day 👀",
    "She has no clue 😏",
    "Getting closer…",
    "Can you feel it? ✨",
    "Not long now 💕",
    "This one's for you.",
    "Best day incoming 🎉",
];

// ===== DOM =====
const numDays = document.getElementById('numDays');
const numHours = document.getElementById('numHours');
const numMins = document.getElementById('numMins');
const numSecs = document.getElementById('numSecs');
const cardSecs = document.getElementById('cardSecs');
const microcopyEl = document.getElementById('microcopy');
const countdownEl = document.getElementById('countdown');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const letterOverlay = document.getElementById('letterOverlay');
const letterClose = document.getElementById('letterClose');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const videoLocked = document.getElementById('videoLocked');
const videoUnlocked = document.getElementById('videoUnlocked');
const lockBar = document.getElementById('lockBar');
const surpriseHeart = document.getElementById('surpriseHeart');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
const floatingContainer = document.getElementById('floatingParticles');

let envelopeOpen = false;
let prevSecs = '';

// ===== CONFETTI ENGINE =====
let confettiParticles = [];
let confettiAnimating = false;

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createConfetti(x, y, count) {
    count = count || 60;
    const colors = ['#E11D48', '#FB7185', '#FECDD3', '#FFE4E6', '#FF6B8A', '#FFD700', '#FF4D6D', '#fff'];
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        const speed = 3 + Math.random() * 7;
        confettiParticles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3,
            size: 4 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 12,
            gravity: 0.12 + Math.random() * 0.08,
            life: 1,
            decay: 0.008 + Math.random() * 0.008,
        });
    }
    if (!confettiAnimating) animateConfetti();
}

function animateConfetti() {
    confettiAnimating = true;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles = confettiParticles.filter(function (p) { return p.life > 0; });

    for (let i = 0; i < confettiParticles.length; i++) {
        var p = confettiParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiAnimating = false;
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// ===== COUNTDOWN =====
function updateCountdown() {
    var now = new Date();
    var diff = BIRTHDAY - now;

    if (diff <= 0) {
        showBirthday();
        unlockVideo();
        return;
    }

    var d = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    var h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    var m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    var s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    numDays.textContent = d;
    numHours.textContent = h;
    numMins.textContent = m;

    if (s !== prevSecs) {
        numSecs.textContent = s;
        cardSecs.classList.remove('pulse');
        // Force reflow
        void cardSecs.offsetWidth;
        cardSecs.classList.add('pulse');
        prevSecs = s;
    }

    // Update lock bar
    var totalTime = BIRTHDAY - new Date('2026-02-28T00:00:00');
    var elapsed = totalTime - diff;
    var pct = Math.min(100, (elapsed / totalTime) * 100);
    if (lockBar) lockBar.style.width = pct + '%';
}

function showBirthday() {
    var eyebrow = document.querySelector('.hero-eyebrow');
    var title = document.querySelector('.hero-title');
    var mc = document.getElementById('microcopy');

    eyebrow.textContent = '🎉 TODAY IS THE DAY 🎉';
    title.innerHTML = '';
    mc.textContent = '';

    countdownEl.innerHTML =
        '<div style="text-align:center;">' +
        '<div class="birthday-hero">Happy Birthday,<br>Vidhi! 🎂❤️🎉</div>' +
        '<p class="birthday-sub">The world celebrates YOU today.</p>' +
        '</div>';

    setTimeout(function () { createConfetti(window.innerWidth / 2, window.innerHeight / 3, 100); }, 300);
    setTimeout(function () { createConfetti(window.innerWidth * 0.3, window.innerHeight / 2, 60); }, 800);
    setTimeout(function () { createConfetti(window.innerWidth * 0.7, window.innerHeight / 2, 60); }, 1200);
}

function unlockVideo() {
    if (videoLocked) videoLocked.style.display = 'none';
    if (videoUnlocked) videoUnlocked.style.display = 'block';
}

// Start countdown immediately
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== ROTATING MICROCOPY =====
var microIndex = 0;
setInterval(function () {
    microIndex = (microIndex + 1) % microcopies.length;
    if (microcopyEl) {
        microcopyEl.style.opacity = '0';
        microcopyEl.style.transform = 'translateY(8px)';
        setTimeout(function () {
            microcopyEl.textContent = microcopies[microIndex];
            microcopyEl.style.opacity = '1';
            microcopyEl.style.transform = 'translateY(0)';
        }, 300);
    }
}, 4000);

// ===== ENVELOPE → WORD SEARCH → LETTER =====
var wsOverlay = document.getElementById('wordsearchOverlay');
var wsGrid = document.getElementById('wsGrid');
var wsSelected = document.getElementById('wsSelected');
var wsStatus = document.getElementById('wsStatus');
var wsCloseBtn = document.getElementById('wsClose');
var SECRET_WORD = 'THAICURRY';
var wsSelectedLetters = [];
var wsSelectedCells = [];
var wsSolved = false;
var wordCells = []; // track which cells hold the secret word

function generateWordSearch() {
    var GRID_SIZE = 9;
    var grid = [];
    var randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Create empty grid
    for (var r = 0; r < GRID_SIZE; r++) {
        grid[r] = [];
        for (var c = 0; c < GRID_SIZE; c++) {
            grid[r][c] = randomLetters[Math.floor(Math.random() * 26)];
        }
    }

    // Place THAICURRY in a random row at a random starting column
    var row = Math.floor(Math.random() * GRID_SIZE);
    var maxCol = GRID_SIZE - SECRET_WORD.length;
    var col = Math.floor(Math.random() * (maxCol + 1));
    wordCells = [];
    for (var i = 0; i < SECRET_WORD.length; i++) {
        grid[row][col + i] = SECRET_WORD[i];
        wordCells.push({ r: row, c: col + i });
    }

    // Render grid
    wsGrid.innerHTML = '';
    for (var r = 0; r < GRID_SIZE; r++) {
        for (var c = 0; c < GRID_SIZE; c++) {
            var cell = document.createElement('div');
            cell.className = 'ws-cell';
            cell.textContent = grid[r][c];
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.letter = grid[r][c];
            cell.addEventListener('click', onCellClick);
            wsGrid.appendChild(cell);
        }
    }

    wsSelectedLetters = [];
    wsSelectedCells = [];
    wsSelected.textContent = '';
    wsStatus.textContent = 'Tap the letters in order to spell the answer';
    wsStatus.className = 'ws-status';
}

function onCellClick(e) {
    if (wsSolved) return;
    var cell = e.target;
    var letter = cell.dataset.letter;

    // Check if this cell is already selected — allow deselecting last cell
    var cellIndex = wsSelectedCells.indexOf(cell);
    if (cellIndex !== -1) {
        if (cellIndex === wsSelectedCells.length - 1) {
            // Deselect last letter
            cell.classList.remove('selected');
            wsSelectedCells.pop();
            wsSelectedLetters.pop();
            wsSelected.textContent = wsSelectedLetters.join('');
            wsStatus.textContent = 'Tap the letters in order to spell the answer';
            wsStatus.className = 'ws-status';
        }
        return;
    }

    // Add to selection
    wsSelectedLetters.push(letter);
    wsSelectedCells.push(cell);
    cell.classList.add('selected');
    wsSelected.textContent = wsSelectedLetters.join('');

    var current = wsSelectedLetters.join('');

    // Check if it matches
    if (current === SECRET_WORD) {
        wsSolved = true;
        wsStatus.textContent = '🎉 You got it! Opening your letter...';
        wsStatus.className = 'ws-status success';

        // Mark all as found
        wsSelectedCells.forEach(function (c) {
            c.classList.remove('selected');
            c.classList.add('found');
        });

        // After a short delay, close word search and open letter
        setTimeout(function () {
            wsOverlay.classList.remove('active');
            document.body.style.overflow = '';
            openLetter();
        }, 1500);
    } else if (current.length >= SECRET_WORD.length || SECRET_WORD.indexOf(current) !== 0) {
        // Wrong — shake and reset
        wsStatus.textContent = 'Not quite… try again! 💭';
        wsStatus.className = 'ws-status';
        setTimeout(function () {
            wsSelectedCells.forEach(function (c) { c.classList.remove('selected'); });
            wsSelectedLetters = [];
            wsSelectedCells = [];
            wsSelected.textContent = '';
            wsStatus.textContent = 'Tap the letters in order to spell the answer';
        }, 800);
    }
}

function openWordSearch() {
    if (wsSolved) {
        // Already solved, go straight to letter
        openLetter();
        return;
    }
    generateWordSearch();
    wsOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWordSearch() {
    wsOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openLetter() {
    if (envelopeOpen) return;
    envelopeOpen = true;
    letterOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Confetti burst from center
    setTimeout(function () {
        createConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);
    }, 300);
}

function closeLetter() {
    if (!envelopeOpen) return;
    envelopeOpen = false;
    letterOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

envelopeWrapper.addEventListener('click', function (e) {
    e.stopPropagation();
    openWordSearch();
});

wsCloseBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeWordSearch();
});

wsOverlay.addEventListener('click', function (e) {
    if (e.target === wsOverlay) closeWordSearch();
});

letterClose.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLetter();
});

letterOverlay.addEventListener('click', function (e) {
    if (e.target === letterOverlay) closeLetter();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        if (envelopeOpen) closeLetter();
        else if (wsOverlay.classList.contains('active')) closeWordSearch();
    }
});

// ===== FLOATING HEARTS & SUNFLOWERS =====
var floatEmojis = ['❤️', '💕', '💗', '🩷', '🌻', '🌻', '✨', '🌹', '🌸', '🌻', '♥️', '💛'];

function createFloatingParticle() {
    var el = document.createElement('span');
    el.className = 'float-particle';
    el.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
    var size = 14 + Math.random() * 20;
    el.style.fontSize = size + 'px';
    el.style.left = (Math.random() * 100) + '%';
    el.style.bottom = '-40px';
    el.style.animationDuration = (14 + Math.random() * 16) + 's';
    el.style.animationDelay = (Math.random() * 2) + 's';
    floatingContainer.appendChild(el);

    setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 32000);
}

// Initial burst
for (var i = 0; i < 8; i++) {
    setTimeout(createFloatingParticle, i * 600);
}

// Ongoing generation
setInterval(createFloatingParticle, 2500);

// ===== SURPRISE ELEMENT (toggle) =====
var surpriseActive = false;
var surpriseTip = null;

surpriseHeart.addEventListener('click', function () {
    if (!surpriseActive) {
        // Activate dark mode
        surpriseActive = true;
        document.body.classList.add('surprise-mode');

        var rect = surpriseHeart.getBoundingClientRect();
        createConfetti(rect.left + rect.width / 2, rect.top, 50);

        surpriseTip = document.createElement('div');
        surpriseTip.textContent = "(you're my favorite human 🤫)";
        surpriseTip.style.cssText =
            'position:fixed;bottom:80px;right:24px;' +
            'background:#E11D48;color:white;' +
            'padding:10px 18px;border-radius:12px;' +
            "font-family:'Playfair Display',serif;" +
            'font-style:italic;font-size:0.95rem;' +
            'z-index:9999;box-shadow:0 8px 30px rgba(225,29,72,0.3);' +
            'animation:riseIn 0.4s ease-out;transition:opacity 0.4s ease;';
        document.body.appendChild(surpriseTip);
    } else {
        // Deactivate dark mode
        surpriseActive = false;
        document.body.classList.remove('surprise-mode');

        if (surpriseTip) {
            surpriseTip.style.opacity = '0';
            var tipRef = surpriseTip;
            setTimeout(function () { tipRef.remove(); }, 400);
            surpriseTip = null;
        }
    }
});

