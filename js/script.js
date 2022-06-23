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

const foods = [
    new Food(750, 500, 30, 30, 100),
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hive.live(workers);
    workers.map(worker => worker.live(foods, hive, workers, walls, ctx))

    foods.map(food => food.drawSelf(ctx))
    hive.drawSelf(ctx)
    walls.map(wall => wall.drawSelf(ctx))
    workers.map(bee => bee.drawSelf(ctx))
}