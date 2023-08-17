//Game constants and Variables
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
const board = document.getElementById('board')
let myScore = document.getElementById('score')
let myHighScore = document.getElementById('highscore')
let lastPaintTime = 0
let speed = 5;
let score = 0;
let snakeArr=[
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 }

if (localStorage.getItem('highscore') === null) {
    myHighScore.innerHTML = "Highscore: 0";
}
else {
    myHighScore.innerHTML = `Highscore: ${localStorage.getItem('highscore')}`
}

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if (((ctime - lastPaintTime) / 1000) < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine()

}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //Part 1: Updating the snake array and Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        if (JSON.parse(localStorage.getItem('highscore') === null)) {
            localStorage.setItem('highscore', score.toString());
        }
        if (score > JSON.parse(localStorage.getItem('highscore'))) {
            localStorage.setItem('highscore', score.toString());
            myHighScore.innerHTML = `Highscore: ${localStorage.getItem('highscore')}`
        }
        alert("Game Over. Press any key to play again!");
        myHighScore.innerHTML = `Highscore: ${localStorage.getItem('highscore')}`
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
        myScore.innerHTML = "<div>Score: 0</div>"

    }

    //If you have eaten the food, increment the the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        // console.log(score)
        myScore.innerHTML = `Score: ${score}`


        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //Part 2: Display the snake and Food

    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement)
    })

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}


//Main logic starts here

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    // Start the game
    moveSound.play();
    // musicSound.play();
    switch (e.key) {
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        default:
            break;
    }
})




















// let arr = [{x:2, y:3},{x:"Sai",y:"eee"}]

// arr.map((e)=>{
//    console.log(e.x)
// })
