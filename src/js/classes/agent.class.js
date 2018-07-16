/**
 * agent.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction
} from './actions/agent.actions';

export class Agent {
    constructor(position, color, radius) {
        this.hasAction = false;
        this.position = position;
        this.originalPosition = null;
        this.destination = null;
        this.color = color;
        this.radius = radius;
        this.pixiGraphic = new PIXI.Graphics();
    }

    getAction() {
        let randomAction = Random.picker(["move", "color", "wait"])(Random.engines.nativeMath);

        switch(randomAction) {
            case "color":
                return new AgentColorChangeAction({
                    agent: this,
                    color: this.getRandomColor()
                });
            case "move":
                return new AgentMoveAction({
                    agent: this,
                    origPosition: this.position.clone(),
                    destination: this.getDestination(),
                    speed: CONFIG.maxSpeed,
                });
            case "wait":
                return new AgentWaitAction({
                    agent: this,
                    time: 3000
                });
        }
    }

    getRandomColor() {
        return parseInt(Random.hex()(Random.engines.nativeMath, 6), 16);
    }

    update() {
        this.pixiGraphic.clear();
        this.pixiGraphic.beginFill(this.color);
        this.pixiGraphic.drawCircle(0, 0, this.radius);
        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;
    }

    getDestination() {
        let randomX = Random.integer(0, CONFIG.world.width)(Random.engines.nativeMath),
            randomY = Random.integer(0, CONFIG.world.height)(Random.engines.nativeMath),
            destination = new Victor(randomX, randomY);

        return destination;
    }
}
