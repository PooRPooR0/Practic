import Food from "./models/Food.js"
import Hive from "./models/Hive.js"
import Wall from "./models/Wall.js"

const interval = 50

const canvas = document.getElementById("field")
const ctx = canvas.getContext('2d')

let drawTimer
let spawnTimer

const startButton = document.getElementById("start_button")
startButton.addEventListener("click", init)

const pauseButton = document.getElementById("pause_button")
pauseButton.addEventListener("click", pause)

const foods = [
    new Food(750, 500, 30, 30, 100),
]

const workers = []

const hive = new Hive(150, 100, 20, 20)

const walls = [
    new Wall(canvas.width / 2, 20, canvas.width, 40),
    new Wall(canvas.width / 2, canvas.height - 20, canvas.width, 40),
    new Wall(20, canvas.height / 2, 40, canvas.height),
    new Wall(canvas.width - 20, canvas.height / 2, 40, canvas.height),
    //new Wall(canvas.width / 3, canvas.height / 2 - 100, 40, canvas.height-100),
    //new Wall(canvas.width / 3 * 2, canvas.height / 2 + 100, 40, canvas.height-100),
]

function init() {
    drawTimer = setInterval(update, interval)
    hive.timer = setInterval(() => hive.live(workers, foods, walls, interval), interval)
}

function pause() {
    clearInterval(drawTimer)
    clearInterval(hive.timer)
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    foods.map(food => food.drawSelf(ctx))
    hive.drawSelf(ctx)
    walls.map(wall => wall.drawSelf(ctx))
    workers.map(bee => bee.drawSelf(ctx))
}