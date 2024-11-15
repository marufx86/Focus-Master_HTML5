let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameSpeed = 1000;
let isPlaying = false;
let colorInterval;

const colors = [
    '#FF6B6B', '#4FACFE', '#00F2FE', '#FFD93D', 
    '#6C63FF', '#2ECC71', '#F8C291', '#A8E6CF'
];

const targetCircle = document.getElementById('targetCircle');
const playerCircle = document.getElementById('playerCircle');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const gameButton = document.getElementById('gameButton');

highScoreElement.textContent = highScore;

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateTargetColor() {
    if (!isPlaying) return;
    targetCircle.style.backgroundColor = getRandomColor();
    gameSpeed = Math.max(300, 1000 - (score * 15)); // Slightly faster progression
    clearInterval(colorInterval);
    colorInterval = setInterval(updateTargetColor, gameSpeed);
}

function updatePlayerColor() {
    if (!isPlaying) return;
    playerCircle.style.backgroundColor = getRandomColor();
}

function checkMatch() {
    if (!isPlaying) return;
    
    if (targetCircle.style.backgroundColor === playerCircle.style.backgroundColor) {
        score++;
        scoreElement.textContent = score;
        playerCircle.classList.add('pulse');
        setTimeout(() => playerCircle.classList.remove('pulse'), 500);
        
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('highScore', highScore);
        }
    } else {
        endGame();
    }
}

function startGame() {
    isPlaying = true;
    score = 0;
    scoreElement.textContent = score;
    gameOverElement.style.display = 'none';
    gameSpeed = 1000;
    
    // Update button appearance
    gameButton.textContent = 'Reset Training';
    gameButton.classList.add('restart');
    
    updateTargetColor();
    updatePlayerColor();
}

function endGame() {
    isPlaying = false;
    clearInterval(colorInterval);
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
    
    // Reset button appearance
    gameButton.textContent = 'Start Training';
    gameButton.classList.remove('restart');
}

playerCircle.addEventListener('click', () => {
    if (isPlaying) {
        checkMatch();
        updatePlayerColor();
    }
});

// Initial setup
targetCircle.style.backgroundColor = getRandomColor();
playerCircle.style.backgroundColor = getRandomColor();
