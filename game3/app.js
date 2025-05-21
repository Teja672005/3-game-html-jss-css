const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

let score = 0;
let timeLeft = 30;

function moveCircle() {
  const x = Math.random() * 260;
  const y = Math.random() * 260;
  circle.style.left = ${x}px;
  circle.style.top = ${y}px;
}

circle.addEventListener('click', () => {
  if (timeLeft > 0) {
    score++;
    scoreDisplay.textContent = score;
    moveCircle();
  }
});

const timer = setInterval(() => {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    circle.style.display = 'none';
    alert(Game over! Your score is ${score});
  }
}, 1000);

moveCircle();