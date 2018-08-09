/**
 * bodies.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';

export class Bodies {
    constructor(position, color, radius) {
        this.hasAction = false;
        this.shouldCleanup = false;
        this.position = position;
        this.color = color;
        this.radius = radius;
        this.pixiGraphic = new PIXI.Graphics();
    }

    update() {
        this.pixiGraphic.clear();
        this.pixiGraphic.beginFill(this.color);
        this.pixiGraphic.drawCircle(0, 0, this.radius);
        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;
    }

    cleanup() {
        //this.pixiGraphic.clear();
    }
}
