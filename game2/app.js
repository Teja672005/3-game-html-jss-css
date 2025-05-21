const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0, dy = 0;
let score = 0;

function draw() {
  board.innerHTML = "";

  // Draw food
  const foodEl = document.createElement("div");
  foodEl.style.gridColumnStart = food.x;
  foodEl.style.gridRowStart = food.y;
  foodEl.classList.add("food");
  board.appendChild(foodEl);

  // Draw snake
  snake.forEach(segment => {
    const el = document.createElement("div");
    el.style.gridColumnStart = segment.x;
    el.style.gridRowStart = segment.y;
    el.classList.add("snake");
    board.appendChild(el);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game over if out of bounds or hitting itself
  if (
    head.x < 1 || head.y < 1 ||
    head.x > boardSize || head.y > boardSize ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    alert("Game Over! Score: " + score);
    snake = [{ x: 10, y: 10 }];
    dx = dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    return;
  }

  snake.unshift(head);

  // If eating food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * boardSize) + 1,
    y: Math.floor(Math.random() * boardSize) + 1,
  };
}

function update() {
  moveSnake();
  draw();
}

setInterval(update, 150);

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp": if (dy === 0) [dx, dy] = [0, -1]; break;
    case "ArrowDown": if (dy === 0) [dx, dy] = [0, 1]; break;
    case "ArrowLeft": if (dx === 0) [dx, dy