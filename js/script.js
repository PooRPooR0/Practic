import Food from "./models/Food.js"
import Hive from "./models/Hive.js"
import Wall from "./models/Wall.js"

const canvas = document.getElementById("field")
const ctx = canvas.getContext('2d')

const foods = [new Food(150, 500, 30, 30, 100)]
const hive = new Hive(150, 100, 20, 20)
const walls = [
    new Wall(canvas.width / 2, 20, canvas.width, 40),
    new Wall(canvas.width / 2, canvas.height - 20, canvas.width, 40),
    new Wall(20, canvas.height / 2, 40, canvas.height),
    new Wall(canvas.width - 20, canvas.height / 2, 40, canvas.height),
    new Wall(canvas.width / 3, canvas.height / 2 - 60, 40, 400),
    new Wall( 2 * canvas.width / 3, canvas.height / 2 + 60, 40, 400),
]

const workers = []
let pheromones = []

let timer = setInterval(update, 50)

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hive.live(workers);
    workers.map(worker => worker.live(foods, hive, walls, pheromones, ctx))

    pheromones.map(pheromone => pheromone.live(pheromones))
    pheromones = pheromones.filter(pheromone => pheromone.amount > 0)

    pheromones.map(phero => phero.drawSelf(ctx))
    foods.map(food => food.drawSelf(ctx))
    hive.drawSelf(ctx)
    walls.map(wall => wall.drawSelf(ctx)) 
    workers.map(bee => bee.drawSelf(ctx))
}