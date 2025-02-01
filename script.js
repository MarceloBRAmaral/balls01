const ball = document.getElementById('ball');
const container = document.getElementById('container');
const bounceSound = document.getElementById('bounceSound');

let x, y, dx, dy;
let lastCollision = 0;
let isPaused = false;
let animationId;

function initBall() {
    const maxX = container.clientWidth - ball.clientWidth;
    const maxY = container.clientHeight - ball.clientHeight;
    x = Math.floor(Math.random() * maxX);
    y = Math.floor(Math.random() * maxY);
    dx = 5;
    dy = 5;
}

function moveBall() {
    if (isPaused) return;

    const maxX = container.clientWidth - ball.clientWidth;
    const maxY = container.clientHeight - ball.clientHeight;
    
    x += dx;
    y += dy;
    
    if (x >= maxX || x <= 0) {
        dx = -dx;
        if (Date.now() - lastCollision > 50) {
            bounceSound.currentTime = 0;
            bounceSound.play();
            lastCollision = Date.now();
        }
    }
    if (y >= maxY || y <= 0) {
        dy = -dy;
        if (Date.now() - lastCollision > 50) {
            bounceSound.currentTime = 0;
            bounceSound.play();
            lastCollision = Date.now();
        }
    }
    
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
    
    animationId = requestAnimationFrame(moveBall);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        initBall();
    }
    if (event.code === 'KeyP') {
        isPaused = !isPaused;
        if (!isPaused) {
            moveBall();
        }
    }
});

initBall();
moveBall();
