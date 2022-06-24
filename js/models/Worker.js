import MovableObject from "./MovableObject.js"
import Hive from "./Hive.js"
import Food from "./Food.js"
import Wall from "./Wall.js"

export default class Worker extends MovableObject {
    #distortionAngle = 20
    #screemRadius = 40
    #heardReactionAngle = 120

    #footsToFood
    #footsToHive
    #isMovedToHive
    #heardScreams = []

    constructor(x_pos, y_pos, x_size, y_size, speed) {
        super(x_pos, y_pos, x_size, y_size, speed)
        this.#footsToFood = 0
        this.#footsToHive = 0
        this.#isMovedToHive = false
        this.#heardScreams = []
    }

    set distortionAngle(distortionAngle) {
        this.#distortionAngle = Math.abs(distortionAngle)
    }

    get distortionAngle() {
        return this.#distortionAngle
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
        ctx.fillStyle = this.#isMovedToHive ? 'rgb(112, 94, 67)' : 'rgb(61, 60, 56)'
        ctx.fillRect(
            this.x_pos - this.x_size / 2,
            this.y_pos - this.y_size / 2,
            this.x_size,
            this.y_size
        )
    }

    collide(objects) {
        for(let obj of objects) {
            if(!this.isCollideWith(obj)) continue

            if (obj instanceof Hive) {
                this.footsToHive = 0
                if (this.isMovedToHive) {
                    this.moveDirection = this.moveDirection + 180
                    this.moveToDirection(this.moveDirection)
                    this.isMovedToHive = false
                    obj.food = obj.food + 1
                }
            }

            if (obj instanceof Food) {
                this.footsToFood = 0
                if (!this.isMovedToHive) {
                    this.moveDirection = this.moveDirection + 180
                    this.moveToDirection(this.moveDirection)
                    this.isMovedToHive = true
                    obj.amount = obj.amount - 1
                }
            }

            if (obj instanceof Wall) {    
                const topPoint = {x_pos: this.x_pos, y_pos: this.y_pos - 2 * this.y_size}
                const bottomPoint = {x_pos: this.x_pos, y_pos: this.y_pos + 2 * this.y_size}
                const leftPoint = {x_pos: this.x_pos - 2 * this.x_size, y_pos: this.y_pos}
                const rightPoint = {x_pos: this.x_pos + 2 * this.x_size, y_pos: this.y_pos}

                const vector = this.findVector(this.moveDirection, 1)

                if(this.isPointCollideWith(topPoint, obj)) {
                    vector.y_pos = -vector.y_pos
                }
                if(this.isPointCollideWith(bottomPoint, obj)) {
                    vector.y_pos = -vector.y_pos
                }
                if(this.isPointCollideWith(leftPoint, obj)) {
                    vector.x_pos = -vector.x_pos
                }
                if(this.isPointCollideWith(rightPoint, obj)) {
                    vector.x_pos = -vector.x_pos
                }

                const newTarget = {
                    x_pos: this.x_pos + vector.x_pos,
                    y_pos: this.y_pos - vector.y_pos,
                }

                this.moveDirection = this.getDirectionToTarget(newTarget)
                this.moveDirection = this.moveDirection + Math.random() * this.#distortionAngle - this.#distortionAngle / 2
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

        for (let scream of this.heardScreams) {
            let angleToScreem = this.getDirectionToTarget(scream.worker) - this.moveDirection
            if (angleToScreem < -180) angleToScreem += 360
            if (angleToScreem > 180) angleToScreem -= 360 
            if (Math.abs(angleToScreem) > this.#heardReactionAngle / 2) continue

            if(scream.isHeMovedToHive) {
                if (scream.dist >= this.footsToFood) continue
                this.footsToFood = scream.dist
                    
                if (this.isMovedToHive) continue
                this.moveDirection = this.getDirectionToTarget(scream.worker)
            }else {
                if (scream.dist >= this.footsToHive) continue
                this.footsToHive = scream.dist
                
                if (!this.isMovedToHive) continue
                this.moveDirection = this.getDirectionToTarget(scream.worker)
            }
        }

        this.heardScreams = []
    }

    live(foods, hive, workers, walls) {
        this.moveDirection = this.moveDirection + Math.random() * this.#distortionAngle - this.#distortionAngle / 2
        this.moveToDirection(this.moveDirection)

        this.footsToFood = this.footsToFood + this.speed
        this.footsToHive = this.footsToHive + this.speed

        this.collide([...foods, ...walls, hive])
        this.screaming(workers)
        this.heard()
    }
}