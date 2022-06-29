import SimulationObject from "./SimulationObject.js";

export default class Slowground extends SimulationObject {
    #slowMultiplier

    constructor (x_pos, y_pos, x_size, y_size, slowMultiplier) {
        super(x_pos, y_pos, x_size, y_size)
        this.#slowMultiplier = slowMultiplier
    }

    set slowMultiplier(slowMultiplier) {
        this.#slowMultiplier = slowMultiplier
    }

    get slowMultiplier() {
        return this.#slowMultiplier
    }

    drawSelf(ctx) {
        ctx.fillStyle = 'rgb(131, 178, 204)'
        ctx.fillRect(
            this.x_pos - this.x_size / 2,
            this.y_pos - this.y_size / 2,
            this.x_size,
            this.y_size
        )
    }
}