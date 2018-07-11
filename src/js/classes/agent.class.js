/**
 * agent.class.js
 */
import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
let Victor = require('victor');

export class Agent {
    constructor(position, color, radius) {
        this.position = position;
        this.originalPosition = null;
        this.destination = null;
        this.color = color;
        this.radius = radius;
        this.pixiGraphic = new PIXI.Graphics();
    }

    update() {
        this.pixiGraphic.destroy();
        this.pixiGraphic = new PIXI.Graphics();
        this.pixiGraphic.beginFill(this.color);
        this.pixiGraphic.drawCircle(0, 0, this.radius);
        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;
    }

    tick() {
        if (!this.destination) {
            this.originalPosition = this.position.clone();
            this.destination = this.getDestination();
        }

        if (this.position.x === this.destination.x && this.position.y === this.destination.y) {
            this.destination = null;
            return;
        }

        let deltaVec = this.destination.clone().subtract(this.originalPosition).normalize(),
            moveVec = deltaVec.clone().multiply(new Victor(CONFIG.maxSpeed, CONFIG.maxSpeed)),
            newPosition = this.position.clone().add(moveVec);

        if (this.position.distance(this.destination) < CONFIG.agentRadius / 2) {
            newPosition = this.destination.clone();
        }
        this.position = newPosition.clone();
    }

    getDestination() {
        let randomX = Random.integer(0, CONFIG.width)(Random.engines.nativeMath),
            randomY = Random.integer(0, CONFIG.height)(Random.engines.nativeMath),
            destination = new Victor(randomX, randomY);

        return destination;
    }
}
