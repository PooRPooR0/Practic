import SimulationObject from "./SimulationObject.js";

export default class Wall extends SimulationObject {
    constructor(x_pos, y_pos, x_size, y_size) {
        super(x_pos, y_pos, x_size, y_size)
    }

    drawSelf(ctx) {
        ctx.fillStyle = 'rgb(100, 100, 100)';
        ctx.fillRect(this._x_pos - this._x_size / 2, this._y_pos - this._y_size / 2, this._x_size, this._y_size);
    }
}