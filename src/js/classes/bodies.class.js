/**
 * bodies.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';

export class Bodies {
    constructor(position, color, radius, /**stats**/) {
        this.position = position;
        this.color = color;
        this.radius = radius;
        this.pixiGraphic = new PIXI.Graphics();

        this.toggles = {
            hasAction: false,
            isSought: false,
            isDecayed: false,
            statDecay: false,
            surviveTick: false,
            shouldCleanup: false,
        };

        this.info = {
            decayRate: null,
            surviveTime: null,
            taker: null,
        };

        /**
        this.hasAction = false;
        this.shouldCleanup = false;
        this.isSought = false;
        this.taker = null;
        this.decayRate = null;
        this.statDecay = false;

        this.surviveTick = false;
        this.surviveTime = null;
        **/
    }

    update() {
        this.pixiGraphic.clear();
        this.pixiGraphic.beginFill(this.color);
        this.pixiGraphic.drawCircle(0, 0, this.radius);
        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;

        // used to keep track of how long things last (seconds)
        if (!this.toggles.surviveTick) {
            this.toggles.surviveTick = true;
            setTimeout(() => {
                let currentTick = this.info.surviveTime;

                if (this.info.surviveTime == currentTick) {
                    this.info.surviveTime += 1;
                    this.toggles.surviveTick = false;
                } else {
                    this.toggles.surviveTick = false;
                }

            }, 1000);
        }
    }

    cleanup() {
        //this.pixiGraphic.clear();
    }
}
