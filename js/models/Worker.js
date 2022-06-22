import MovableObject from "./MovableObject.js"
import Hive from "./Hive.js"
import Food from "./Food.js"
import Wall from "./Wall.js"

export default class Worker extends MovableObject {
    #screemRadius
    #footsToFood
    #footsToHive
    #isMovedToHive
    #heardScreams = []
    #distAfterHeardScreem

    constructor(x_pos, y_pos, x_size, y_size, speed, screemRadius) {
        super(x_pos, y_pos, x_size, y_size, speed)
        this.#footsToFood = 0
        this.#footsToHive = 0
        this.#isMovedToHive = false
        this.#screemRadius = screemRadius
        this.#heardScreams = []
        this.#distAfterHeardScreem = 0
    }

    set screemRadius(screemRadius) {
        if (screemRadius >= 0) {
            this.#screemRadius = screemRadius
        }
    }

    get screemRadius() {
        return this.#screemRadius
    }

    set footsToFood(footsToFood) {
        this.#footsToFood = footsToFood
    }

    get footsToFood() {
        return this.#footsToFood
    }

    set footsToHive(footsToHive) {
        this.#footsToHive = footsToHive
    }

    get footsToHive() {
        return this.#footsToHive
    }

    set isMovedToHive(isMovedToHive) {
        this.#isMovedToHive = isMovedToHive
    }

    get isMovedToHive() {
        return this.#isMovedToHive
    }

    set heardScreams(heardScreams) {
        this.#heardScreams = heardScreams
    }

    get heardScreams() {
        return this.#heardScreams
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
            
            if (obj instanceof Hive) {
                this.footsToHive = 0
                if (this.isMovedToHive) {
                    this.moveDirection = this.moveDirection + 180
                    this.moveToDirection(this.moveDirection)
                    this.isMovedToHive = false
                }
            }

            if (obj instanceof Food) {
                this.footsToFood = 0
                if (!this.isMovedToHive) {
                    this.moveDirection = this.moveDirection + 180
                    this.moveToDirection(this.moveDirection)
                    this.isMovedToHive = true
                }
            }

            if (obj instanceof Wall) {
                this.moveDirection = this.moveDirection + 180
                this.moveToDirection(this.moveDirection)
            }

            break
        }
    }

    screaming(workers) {
        for (let otherWorker of workers) {
            if(this.id === otherWorker.id) continue
            const distance = this.countDistance(otherWorker.x_pos, otherWorker.y_pos)
            if (distance.line_distance > this.screemRadius) continue

            let footsToScream
            if (this.isMovedToHive) footsToScream = this.footsToFood + this.screemRadius
            else footsToScream = this.footsToHive + this.screemRadius

            otherWorker.heardScreams = [...otherWorker.heardScreams, {
                "dist": footsToScream,
                "isHeMovedToHive": this.isMovedToHive,
                "worker": this
            }]
        }
    }

    heard() {
        if (this.#distAfterHeardScreem > 0) {
            this.heardScreams = []
            return
        }

        for (let scream of this.heardScreams) {
            if(scream.isHeMovedToHive) {
                if (scream.dist >= this.footsToFood) continue
                this.footsToFood = scream.dist
                    
                if (this.isMovedToHive) continue
                this.setDirectionToTarget(scream.worker)
                this.#distAfterHeardScreem = this.#screemRadius
            }else {
                if (scream.dist >= this.footsToHive) continue
                this.footsToHive = scream.dist
                
                if (!this.isMovedToHive) continue
                this.setDirectionToTarget(scream.worker)
                this.#distAfterHeardScreem = this.#screemRadius
            }
        }

        this.heardScreams = []
    }

    live(foods, hive, workers, walls, ctx) {
        this.moveToDirection(this.moveDirection)

        this.footsToFood = this.footsToFood + this.speed
        this.footsToHive = this.footsToHive + this.speed
        this.moveDirection = this.moveDirection + Math.random() * 0.2 - 0.1
        if (this.#distAfterHeardScreem > 0) this.#distAfterHeardScreem -= this.speed

        this.collide([...foods, ...walls, hive])
        this.screaming(workers)
        this.heard()
    }
}