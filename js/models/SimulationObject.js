export default class SimulationObject {
    _id
    _x_pos
    _y_pos
    _x_size
    _y_size

    constructor(x_pos, y_pos, x_size, y_size) {
        this._id = Math.random()*1000000;
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

    countDistance(target_x_pos, target_y_pos) {
        const x_dist = target_x_pos - this.x_pos
        const y_dist = target_y_pos - this.y_pos
        const line_distance = Math.sqrt(x_dist*x_dist + y_dist*y_dist)
        return {x_dist, y_dist, line_distance}
    }

    collideWith(object) {
        const distance = this.countDistance(object.x_pos, object.y_pos)
        const x_dist = Math.abs(distance.x_dist)
        const y_dist = Math.abs(distance.y_dist)

        return x_dist < object.x_size / 2 && y_dist < object.y_size / 2
    }
}