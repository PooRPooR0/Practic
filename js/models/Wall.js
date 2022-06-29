import SimulationObject from "./SimulationObject.js";

export default class Wall extends SimulationObject {
    constructor(x_pos, y_pos, x_size, y_size) {
        super(x_pos, y_pos, x_size, y_size)
    }

    drawSelf(ctx) {
        ctx.fillStyle = 'rgb(128, 85, 40)';
        ctx.fillRect(
            this.x_pos - this.x_size / 2,
            this.y_pos - this.y_size / 2,
            this.x_size,
            this.y_size
        );
    }
}