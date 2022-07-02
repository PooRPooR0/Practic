import SimulationObject from "./SimulationObject.js";
import Worker from "./Worker.js";

export default class Hive extends SimulationObject {
    #food

    #workerCost = 10

    constructor(x_pos, y_pos, x_size, y_size) {
        super(x_pos, y_pos, x_size, y_size)
        this.#food = 5000
    }

    set food(food) {
        this.#food = food
    }

    get food() {
        return this.#food
    }

    drawSelf(ctx, workersCount) {
        ctx.fillStyle = 'rgb(0, 0, 255)'
        ctx.fillRect(
            this.x_pos - this.x_size / 2,
            this.y_pos - this.y_size / 2,
            this.x_size,
            this.y_size)

        ctx.font = '20px serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.fillText(workersCount, this.x_pos, this.y_pos - this.y_size)
    }

    createWorker(workers) {
        workers.push(new Worker(this.x_pos, this.y_pos, 2, 2, Math.random() * 2 + 1))
    }

    live(workers) {
        if (this.food >= this.#workerCost) {
            this.createWorker(workers)
            this.food = this.food - this.#workerCost
        }
    }
}