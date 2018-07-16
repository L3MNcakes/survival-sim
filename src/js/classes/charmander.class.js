/**
 * charmander.class.js
 */
import * as PIXI from 'pixi.js';
import { Agent } from './agent.class';

export class Charmander extends Agent {
    constructor(position, color, radius) {
        super(position, color, radius);

        this.pixiGraphic = PIXI.Sprite.fromImage('images/charmander.png');

    }

    update() {
        this.move();

        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;
    }
}
