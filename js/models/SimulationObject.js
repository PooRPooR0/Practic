export default class SimulationObject {
    _id
    _x_pos
    _y_pos
    _x_size
    _y_size

    constructor(x_pos, y_pos, x_size, y_size) {
        this._id = Math.ceil(Math.random()*100000000);
        this._x_pos = x_pos
        this._y_pos = y_pos
        this._x_size = x_size
        this._y_size = y_size
    }

    get id() {
        return this._id
    }

    set x_pos(x_pos) {
        this._x_pos = x_pos
    }

    get x_pos() {
        return this._x_pos
    }

    set y_pos(y_pos) {
        this._y_pos = y_pos
    }

    get y_pos() {
        return this._y_pos
    }

    set x_size(x_size) {
        this._x_size = x_size
    }

    get x_size() {
        return this._x_size
    }

    set y_size(y_size) {
        this._y_size = y_size
    }

    get y_size() {
        return this._y_size
    }

    drawSelf(ctx) {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(this._x_pos - this._x_size / 2, this._y_pos - this._y_size / 2, this._x_size, this._y_size);
    }
}