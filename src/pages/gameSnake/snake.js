const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let direction = "right";
const gridSize = 20;
const apple = { x: 15, y: 15 };

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();

    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game over!");
        location.reload();
    }

    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        snake.push({});
        generateApple();
        const snakeLengthDisplay = document.getElementById("snakeLength");
        snakeLengthDisplay.textContent = "Snake Length: " + snake.length;
    }

    drawSnake();
    drawApple();
}

function moveSnake() {
    let newHead = { x: snake[0].x, y: snake[0].y };
    if (direction === "up") {
        newHead.y = (newHead.y - 1 + canvas.height / gridSize) % (canvas.height / gridSize);
    }
    if (direction === "down") {
        newHead.y = (newHead.y + 1) % (canvas.height / gridSize);
    }
    if (direction === "left") {
        newHead.x = (newHead.x - 1 + canvas.width / gridSize) % (canvas.width / gridSize);
    }
    if (direction === "right") {
        newHead.x = (newHead.x + 1) % (canvas.width / gridSize);
    }

    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            clearInterval(gameInterval);
            alert("Game over!");
            location.reload();
        }
    }

    snake.unshift(newHead);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        return true;
    }
    return false;
}

function drawSnake() {
    const headRadius = gridSize / 2;
    const bodyRadius = gridSize / 3; // Adjust the body size as needed
    snake.forEach((segment, index) => {
        const isHead = index === 0;

        ctx.fillStyle = isHead ? "green" : "darkgreen";
        ctx.strokeStyle = "black";

        // Calculate coordinates for the center of each segment
        const centerX = segment.x * gridSize + headRadius;
        const centerY = segment.y * gridSize + headRadius;

        ctx.beginPath();
        ctx.arc(centerX, centerY, isHead ? headRadius : bodyRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
}


function generateApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / gridSize));
    apple.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

function drawApple() {
    ctx.fillStyle = "red";
    const appleRadius = gridSize / 2;
    ctx.beginPath();
    ctx.arc((apple.x * gridSize) + appleRadius, (apple.y * gridSize) + appleRadius, appleRadius, 0, Math.PI * 2);
    ctx.fill();
}


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

const gameInterval = setInterval(gameLoop, 100);
generateApple();
