const player = document.getElementById('player');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');

let score = 0;
let gameOver = false;
let playerX = 125;
const playerSpeed = 20;
const obstacleSpeed = 5;
const obstacleInterval = 1000;
let obstacleTimer;

document.addEventListener('keydown', (e) => {
    if (gameOver) {
        if (e.key === 'r' || e.key === 'R') {
            restartGame();
        }
        return;
    }

    if (e.key === 'ArrowLeft' && playerX > 0) {
        playerX -= playerSpeed;
    } else if (e.key === 'ArrowRight' && playerX < 250) {
        playerX += playerSpeed;
    }
    player.style.left = `${playerX}px`;
});

function createObstacle() {
    if (gameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    const obstacleX = Math.floor(Math.random() * 250);
    obstacle.style.left = `${obstacleX}px`;
    gameContainer.appendChild(obstacle);

    let obstacleY = 0;
    const obstacleInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(obstacleInterval);
            return;
        }

        obstacleY += obstacleSpeed;
        obstacle.style.top = `${obstacleY}px`;

        if (obstacleY > 450) {
            if (obstacleX < playerX + 50 && obstacleX + 50 > playerX) {
                endGame();
            } else {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
            clearInterval(obstacleInterval);
            gameContainer.removeChild(obstacle);
        }
    }, 20);
}

function endGame() {
    gameOver = true;
    clearInterval(obstacleTimer);
    gameOverDisplay.style.display = 'block';
}

function restartGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOverDisplay.style.display = 'none';
    playerX = 125;
    player.style.left = `${playerX}px`;
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    startGame();
}

function startGame() {
    obstacleTimer = setInterval(createObstacle, obstacleInterval);
}
time.slepp(5);
startGame();