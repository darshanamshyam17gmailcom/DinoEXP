const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
let score = 0;
let isJumping = false;

// Jump function
function jump() {
  if (isJumping) return;
  isJumping = true;
  let position = 0;
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      // Falling down
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Jumping up
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

// Check for collision
function checkCollision() {
  const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

  if (cactusLeft > 500 && cactusLeft < 550 && dinoBottom <= 40) {
    alert("Game Over! Your score: " + score);
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
  }
}

// Update score
function updateScore() {
  score++;
  scoreDisplay.textContent = "Score: " + score;
}

// Event listener for jumping
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// Game loop
setInterval(() => {
  checkCollision();
  updateScore();
}, 100);