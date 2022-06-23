import MovableObject from "./MovableObject.js"
import Hive from "./Hive.js"
import Food from "./Food.js"
import Wall from "./Wall.js"
import Pheromone from "./Pheromone.js"

export default class Worker extends MovableObject {
    #distanceBetweenPheromones = 20
    #radiusOfVision = 50
    #angleOfVision = 120

    #pheromoneFlag
    #isMovedToHive
    #isSeengTarget
    #amountOfPheroLeft
    #amountOfPheroCenter
    #amountOfPheroRight

    constructor(x_pos, y_pos, speed) {
        super(x_pos, y_pos, 5, 5, speed)
        this.#isMovedToHive = false
        this.#pheromoneFlag = this.#distanceBetweenPheromones
        this.#isSeengTarget = false
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

            if(!this.collideWith(obj)) continue
            
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

    isSeeObject(object) {
        const distance = this.countDistance(object.x_pos, object.y_pos)
        if(distance.line_distance > this.#radiusOfVision) return false
        let angleToTarget = this.getDirectionToTarget(object) - this.moveDirection
        if (angleToTarget < -180) angleToTarget += 360
        if (angleToTarget > 180) angleToTarget -= 360
        if(Math.abs(angleToTarget) > this.#angleOfVision / 2) return false

        return true
    }

    seeng(objects) {
        for(let obj of objects) {
            if(!this.isSeeObject(obj)) continue

            if(obj instanceof Food || obj instanceof Hive) {
                this.moveDirection = this.getDirectionToTarget(obj)
                this.#isSeengTarget = true
            }

            if(obj instanceof Pheromone) {
                if (obj.isItroadToHome === this.#isMovedToHive) continue

                let angleToTarget = this.getDirectionToTarget(obj) - this.moveDirection
                if (angleToTarget < -180) angleToTarget += 360
                if (angleToTarget > 180) angleToTarget -= 360

                angleToTarget += this.#angleOfVision / 2
                console.log(angleToTarget)
                
                if( angleToTarget < this.#angleOfVision / 3) this.#amountOfPheroRight += 1
                else if (angleToTarget < 2 * this.#angleOfVision / 3) this.#amountOfPheroCenter += 1
                else this.#amountOfPheroLeft += 1
            }
        }
    }

    live(foods, hive, walls, pheromones, ctx) {
        this.moveToDirection(this.moveDirection)
        this.#pheromoneFlag -= this.speed
        this.#isSeengTarget = false

        this.collide([...foods, ...walls, hive])
        if (this.isMovedToHive) this.seeng([...pheromones, hive])
        else this.seeng([...pheromones, ...foods])

        if(!this.#isSeengTarget) {
            if (this.#amountOfPheroLeft > Math.max([this.#amountOfPheroCenter, this.#amountOfPheroRight])) {
                this.moveDirection = this.moveDirection + 10
            }
            else if (this.#amountOfPheroCenter < this.#amountOfPheroRight) {
                this.moveDirection = this.moveDirection - 10
            }
        }

        this.moveDirection = this.moveDirection + Math.random() * 5 - 2.5

        this.#amountOfPheroCenter = 0
        this.#amountOfPheroLeft = 0
        this.#amountOfPheroRight = 0

        if (this.#pheromoneFlag <= 0) {
            pheromones.push(new Pheromone(this.x_pos, this.y_pos, 5, 5, this.isMovedToHive))
            this.#pheromoneFlag = this.#distanceBetweenPheromones
        }
    }
}