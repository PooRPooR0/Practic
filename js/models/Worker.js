import MovableObject from "./MovableObject.js"
import Hive from "./Hive.js"
import Food from "./Food.js"
import Wall from "./Wall.js"

export default class Worker extends MovableObject {
    #isMovedToHive

    constructor(x_pos, y_pos, x_size, y_size, speed) {
        super(x_pos, y_pos, x_size, y_size, speed)
        this.#isMovedToHive = false
    }

    set isMovedToHive(isMovedToHive) {
        this.#isMovedToHive = isMovedToHive
    }

    get isMovedToHive() {
        return this.#isMovedToHive
    }

    drawSelf(ctx) {
        ctx.fillStyle = 'rgb(0, 255, 0)'
        ctx.fillRect(
            this._x_pos - this._x_size / 2,
            this._y_pos - this._y_size / 2,
            this._x_size,
            this._y_size
        )
    }

    collide(objects) {
        for(let obj of objects) {
            const distance = this.countDistance(obj.x_pos, obj.y_pos)
            const x_dist = Math.abs(distance.x_dist)
            const y_dist = Math.abs(distance.y_dist)

            if(x_dist > obj.x_size / 2 || y_dist > obj.y_size / 2) continue
            
            if (obj instanceof Hive && this.isMovedToHive) {
                this.moveDirection = this.moveDirection + 180
                this.moveToDirection(this.moveDirection)
                this.isMovedToHive = false
            }

            if (obj instanceof Food && !this.isMovedToHive) {
                this.moveDirection = this.moveDirection + 180
                this.moveToDirection(this.moveDirection)
                this.isMovedToHive = true
            }

            if (obj instanceof Wall) {
                this.moveDirection = this.moveDirection + 180
                this.moveToDirection(this.moveDirection)
            }

            break
        }
    }

    live(foods, hive, workers, walls, ctx) {
        this.moveToDirection(this.moveDirection)
        
        this.moveDirection = this.moveDirection + Math.random() * 0.2 - 0.1

        this.collide([...foods, ...walls, hive])
        
    }
}