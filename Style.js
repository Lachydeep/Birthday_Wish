// ---------- BALLOONS ----------
const decorLayer = document.getElementById('decorLayer');
const balloonColors = ['#ff2e9e', '#ffd166', '#3df2ff', '#8b5cf6', '#ff6f9c', '#ffffff'];

function spawnBalloon() {
    const b = document.createElement('div');
    b.className = 'balloon';
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    b.style.background = `radial-gradient(circle at 35% 30%, #ffffff, ${color})`;
    b.style.boxShadow = `0 0 18px ${color}66`;
    b.style.left = Math.random() * 96 + '%';
    const duration = 9 + Math.random() * 7;
    b.style.animationDuration = duration + 's';
    b.style.animationDelay = (Math.random() * 4) + 's';
    const scale = 0.7 + Math.random() * 0.7;
    b.style.setProperty('--bscale', scale);
    const shine = document.createElement('div');
    shine.className = 'shine';
    b.appendChild(shine);
    decorLayer.appendChild(b);
    setTimeout(() => b.remove(), (duration + 4) * 1000);
}

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    const colors = ['#ff2e9e', '#ffd166', '#3df2ff', '#8b5cf6'];
    h.style.color = colors[Math.floor(Math.random() * colors.length)];
    h.textContent = ['❤️', '💛', '💕', '💖', '💗'][Math.floor(Math.random() * 5)];
    h.style.left = Math.random() * 96 + '%';
    const duration = 7 + Math.random() * 6;
    h.style.animationDuration = duration + 's';
    h.style.fontSize = (14 + Math.random() * 16) + 'px';
    decorLayer.appendChild(h);
    setTimeout(() => h.remove(), duration * 1000 + 200);
}

let balloonTimer = setInterval(spawnBalloon, 1300);
let heartTimer = setInterval(spawnHeart, 1000);
for (let i = 0; i < 6; i++) { setTimeout(spawnBalloon, i * 300); }
for (let i = 0; i < 8; i++) { setTimeout(spawnHeart, i * 250); }

// Pause decorative spawners while the tab is hidden to save battery/CPU
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(balloonTimer);
        clearInterval(heartTimer);
    } else {
        balloonTimer = setInterval(spawnBalloon, 1300);
        heartTimer = setInterval(spawnHeart, 1000);
    }
});

// ---------- FIREWORKS (real particle bursts) ----------
const fireworkColors = ['#ff2e9e', '#ffd166', '#3df2ff', '#8b5cf6', '#ff6f9c', '#ffffff'];

function launchFirework(x, y, particleCount = 42) {
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 4 + Math.random() * 4;
        const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = color;
        p.style.boxShadow = `0 0 10px 2px ${color}`;
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        document.body.appendChild(p);

        const angle = (Math.PI * 2) * (i / particleCount) + (Math.random() * 0.4 - 0.2);
        const distance = 60 + Math.random() * 140;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance + 40; // gravity drift
        const duration = 900 + Math.random() * 500;

        p.style.transition = `transform ${duration}ms cubic-bezier(.2,.7,.3,1), opacity ${duration}ms ease-out`;
        requestAnimationFrame(() => {
            p.style.transform = `translate(${dx}px, ${dy}px)`;
            p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), duration + 100);
    }
}

function fireworkShow() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const bursts = 5;
    for (let i = 0; i < bursts; i++) {
        setTimeout(() => {
            const x = w * 0.15 + Math.random() * w * 0.7;
            const y = h * 0.15 + Math.random() * h * 0.35;
            launchFirework(x, y);
        }, i * 260);
    }
}

document.getElementById('wishBtn').addEventListener('click', () => {
    fireworkShow();
    for (let i = 0; i < 10; i++) { setTimeout(spawnBalloon, i * 80); }
});

// ---------- CANDLES ----------
const candles = document.querySelectorAll('.candle');
const messageCard = document.getElementById('messageCard');
let blownCount = 0;

candles.forEach(c => {
    c.addEventListener('click', () => {
        if (c.classList.contains('out')) return;
        c.classList.add('out');
        blownCount++;
        if (blownCount === candles.length) {
            setTimeout(() => {
                fireworkShow();
                for (let i = 0; i < 14; i++) { setTimeout(spawnBalloon, i * 70); }
                messageCard.classList.add('show');
                messageCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        }
    });
});

// ---------- NAME PERSONALIZATION ----------
const nameInput = document.getElementById('nameInput');
nameInput.size = Math.max(nameInput.value.length, 3); // fix: match initial width to default value
nameInput.addEventListener('input', () => {
    nameInput.size = Math.max(nameInput.value.length, 3);
});

// ---------- 3D TILT ON CAKE ----------
const stageOuter = document.querySelector('.stage-outer');
const cakeStage = document.getElementById('cakeStage');
stageOuter.addEventListener('mousemove', (e) => {
    const rect = stageOuter.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cakeStage.style.transform = `rotateY(${px * 18}deg) rotateX(${-py * 14}deg)`;
});
stageOuter.addEventListener('mouseleave', () => {
    cakeStage.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

// ---------- CURSOR SPARKLE TRAIL ----------
let lastSparkle = 0;
const sparkleColors = ['#3df2ff', '#ff2e9e', '#ffd166', '#8b5cf6'];
window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < 45) return;
    lastSparkle = now;
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (e.clientX - 3) + 'px';
    s.style.top = (e.clientY - 3) + 'px';
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    s.style.background = color;
    s.style.color = color;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
});