import Food from "./models/Food.js"
import Hive from "./models/Hive.js"
import Wall from "./models/Wall.js"

const canvas = document.getElementById("field")
const ctx = canvas.getContext('2d')
let timer

const startButton = document.getElementById("start_button")
startButton.addEventListener("click", init)

const pauseButton = document.getElementById("pause_button")
pauseButton.addEventListener("click", pause)

let foods = [
    new Food(750, 500, 30, 30, 1500),
    new Food(450, 200, 30, 30, 1000),
    new Food(150, 500, 30, 30, 500),
]
const hive = new Hive(150, 100, 20, 20)
const walls = [
    new Wall(canvas.width / 2, 20, canvas.width, 40),
    new Wall(canvas.width / 2, canvas.height - 20, canvas.width, 40),
    new Wall(20, canvas.height / 2, 40, canvas.height),
    new Wall(canvas.width - 20, canvas.height / 2, 40, canvas.height),
    new Wall(canvas.width / 3, canvas.height / 2 - 100, 40, canvas.height-100),
    new Wall(canvas.width / 3 * 2, canvas.height / 2 + 100, 40, canvas.height-100),
]

const workers = []

function init() {
    timer = setInterval(update, 50)
}

function pause() {
    clearInterval(timer)
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgb(184, 142, 70)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    hive.live(workers);
    workers.map(worker => worker.live(foods, hive, workers, walls))
    foods.map(food => food.live())

    foods = foods.filter(food => food.amount > 0)

    foods.map(food => food.drawSelf(ctx))
    hive.drawSelf(ctx, workers.length)
    walls.map(wall => wall.drawSelf(ctx))
    workers.map(worker => worker.drawSelf(ctx))
}