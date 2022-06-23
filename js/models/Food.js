import SimulationObject from "./SimulationObject.js";

export default class Food extends SimulationObject {
    #start_amount
    #amount
    #max_size_x
    #max_size_y
    #min_size_x = 5
    #min_size_y = 5

    constructor(x_pos, y_pos, x_size, y_size, amount) {
        super(x_pos, y_pos, x_size, y_size)
        this.#amount = amount
        this.#max_size_x = x_size
        this.#max_size_y = y_size
        this.#start_amount = amount
    }

    set amount(amount) {
        this.#amount = amount
    }

    get amount() {
        return this.#amount
    }

    live() {
        const amount_procent = this.#amount / this.#start_amount
        this.x_size = Math.max(this.#max_size_x * amount_procent, this.#min_size_x)
        this.y_size = Math.max(this.#max_size_y * amount_procent, this.#min_size_y)
    }
}