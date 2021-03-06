import SimulationObject from "./SimulationObject.js"

export default class MovableObject extends SimulationObject {
    _speed
    _speedMultiplier
    _movementDirection

    _normalSpeedMultiplier = 1

    constructor(x_pos, y_pos, x_size, y_size, speed) {
        super(x_pos, y_pos, x_size, y_size)
        this._speed = speed
        this._movementDirection = Math.random() * 2 * Math.PI
        this._speedMultiplier = this._normalSpeedMultiplier
    }

    set speed(speed) {
        this._speed = speed
    }

    get speed() {
        return this._speed
    }

    set speedMultiplier(speedMultiplier) {
        this._speedMultiplier = speedMultiplier
    }

    get speedMultiplier() {
        return this._speedMultiplier
    }

    set movementDirection(movementDirection) {
        const normalizedAngle = this.normalizeAngle(movementDirection)
        this._movementDirection = normalizedAngle * Math.PI / 180.0
    }

    get movementDirection() {
        return this._movementDirection * 180 / Math.PI
    }

    get normalSpeedMultiplier() {
        return this._normalSpeedMultiplier
    }

    isCollideWith(object) {
        const distance = this.countDistance(object.x_pos, object.y_pos)
        const x_dist = Math.abs(distance.x_dist)
        const y_dist = Math.abs(distance.y_dist)

        return x_dist < object.x_size / 2 && y_dist < object.y_size / 2
    }

    isPointCollideWith(point, object) {
        if (point.x_pos < object.x_pos - object.x_size / 2) return false
        if (point.x_pos > object.x_pos + object.x_size / 2) return false
        if (point.y_pos < object.y_pos - object.y_size / 2) return false
        if (point.y_pos > object.y_pos + object.y_size / 2) return false

        return true
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

    findVector(direction, length) {
        const x_pos = length * Math.cos(direction * Math.PI / 180.0)
        const y_pos = length * Math.sin(direction * Math.PI / 180.0)

        return {x_pos, y_pos}
    }

    moveTowardsPosition(target_x_pos, target_y_pos) {
        const distance = this.countDistance(target_x_pos, target_y_pos)
        if (distance.line_distance === 0) return

        let move_dist = this.speed * this.speedMultiplier
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
        const vector = this.findVector(direction, this.speed)
        vector.x_pos += this.x_pos
        vector.y_pos = this.y_pos - vector.y_pos

        this.moveTowardsPosition(vector.x_pos, vector.y_pos)
    }

    getDirectionToTarget(target) {
        const distance = this.countDistance(target.x_pos, target.y_pos)
        return -Math.acos(distance.x_dist / distance.line_distance) * Math.sign(distance.y_dist) * 180 / Math.PI
    }
}