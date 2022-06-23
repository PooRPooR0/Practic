import SimulationObject from "./SimulationObject.js";
import Worker from "./Worker.js";

export default class Hive extends SimulationObject {
    #food
    #timer

    constructor(x_pos, y_pos, x_size, y_size) {
        super(x_pos, y_pos, x_size, y_size)
        this.#food = 10000
    }

    set timer(timer) {
        this.#timer = timer
    }

    get timer() {
        return this.#timer
    }

    set food(food) {
        this.#food = food
    }

    get food() {
        return this.#food
    }

    drawSelf(ctx) {
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.fillRect(this._x_pos - this._x_size / 2, this._y_pos - this._y_size / 2, this._x_size, this._y_size);
    }

    createWorker(workers, foods, walls, interval) {
        const worker = new Worker(this.x_pos, this.y_pos, 2, 2, Math.random() * 2 + 1, 38)
        worker.timer = setInterval(() => worker.live(foods, this, workers, walls), interval / worker.speed)

        workers.push(worker)
    }

    live(workers, foods, walls, interval) {
        if (this.food >= 10) {
            this.createWorker(workers, foods, walls)
            this.food = this.food - 10
        }
    }
}