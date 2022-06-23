import SimulationObject from "./SimulationObject.js";

export default class Pheromone extends SimulationObject {
    #amount
    #isItroadToHome

    constructor (x_pos, y_pos, x_size, y_size, type) {
        super(x_pos, y_pos, x_size, y_size)
        this.#amount = 100
        this.#isItroadToHome = type
    }

    get isItroadToHome() {
        return this.#isItroadToHome
    }

    set amount(amount) {
        this.#amount = amount
    }

    get amount() {
        return this.#amount
    }

    drawSelf(ctx) {
        if (!this.#isItroadToHome) ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
        else ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
        ctx.fillRect(this._x_pos - this._x_size / 2, this._y_pos - this._y_size / 2, this._x_size, this._y_size);
    }

    live() {
        this.amount -= 1
    }
}