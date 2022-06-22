import SimulationObject from "./SimulationObject.js";

export default class Food extends SimulationObject {
    #amount

    constructor(x_pos, y_pos, x_size, y_size, amount) {
        super(x_pos, y_pos, x_size, y_size)
        this.#amount = amount
    }

    set amount(amount) {
        this.#amount = amount
    }

    get amount() {
        return this.#amount
    }
}