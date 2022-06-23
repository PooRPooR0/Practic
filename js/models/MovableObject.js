import SimulationObject from "./SimulationObject.js"

export default class MovableObject extends SimulationObject {
    _speed
    _moveDirection

    constructor(x_pos, y_pos, x_size, y_size, speed) {
        super(x_pos, y_pos, x_size, y_size)
        this._speed = speed
        this._moveDirection = Math.random() * 2 * Math.PI
    }

    set moveDirection(moveDirection) {
        const normalizedAngle = this.normalizeAngle(moveDirection)
        this._moveDirection = normalizedAngle * Math.PI / 180.0
    }

    get moveDirection() {
        return this._moveDirection * 180 / Math.PI
    }

    set speed(speed) {
        this._speed = speed
    }

    get speed() {
        return this._speed
    }

    isCollideWith(object) {
        const distance = this.countDistance(object.x_pos, object.y_pos)
        const x_dist = Math.abs(distance.x_dist)
        const y_dist = Math.abs(distance.y_dist)

        return x_dist < object.x_size / 2 && y_dist < object.y_size / 2
    }

    countDistance(target_x_pos, target_y_pos) {
        const x_dist = target_x_pos - this.x_pos
        const y_dist = target_y_pos - this.y_pos
        const line_distance = Math.sqrt(x_dist*x_dist + y_dist*y_dist)
        return {x_dist, y_dist, line_distance}
    }

    normalizeAngle(angle) {
        let normalizedAngle = angle
        while(normalizedAngle >= 360) normalizedAngle = normalizedAngle - 360
        while(normalizedAngle < 0) normalizedAngle = normalizedAngle + 360
        return normalizedAngle
    }

    moveTowardsPosition(target_x_pos, target_y_pos) {
        const distance = this.countDistance(target_x_pos, target_y_pos)
        if (distance.line_distance === 0) return

        let move_dist = this.speed
        if (distance.line_distance < move_dist) move_dist = distance.line_distance

        if (distance.x_dist !== 0) {
            const angle_tng = distance.y_dist / distance.x_dist    
            let x_move = move_dist / Math.sqrt(angle_tng*angle_tng + 1)
            
            if (distance.x_dist < 0) x_move = -x_move
            const y_move = x_move * angle_tng
            this.x_pos = this.x_pos + x_move
            this.y_pos = this.y_pos + y_move
        } else {
            const y_move = target_y_pos > this.y_pos ? move_dist : -move_dist
            this.y_pos = this.y_pos + y_move
        }  
    }

    moveToDirection(direction) {
        const target_x = this.x_pos + this.speed * Math.cos(direction * Math.PI / 180.0)
        const target_y = this.y_pos - this.speed * Math.sin(direction * Math.PI / 180.0)
        this.moveTowardsPosition(target_x, target_y)
    }

    getDirectionToTarget(target) {
        const distance = this.countDistance(target.x_pos, target.y_pos)
        return -Math.acos(distance.x_dist / distance.line_distance) * Math.sign(distance.y_dist) * 180 / Math.PI
    }
}