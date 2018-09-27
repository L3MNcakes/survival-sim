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
            spawnTick: false,
            shouldCleanup: false,
        };

        this.info = {
            decayRate: null,
            spawnTime: null,
            taker: null,
        };

        /**
        this.hasAction = false;
        this.shouldCleanup = false;
        this.isSought = false;
        this.taker = null;
        this.decayRate = null;
        this.statDecay = false;

        this.spawnTick = false;
        this.spawnTime = null;
        **/
    }

    update() {
        this.pixiGraphic.clear();
        this.pixiGraphic.beginFill(this.color);
        this.pixiGraphic.drawCircle(0, 0, this.radius);
        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;

        // used to keep track of how long things last (seconds)
        if (!this.toggles.spawnTick) {
            this.toggles.spawnTick = true;
            setTimeout(() => {
                let currentTick = this.info.spawnTime;

                if (this.info.spawnTime == currentTick) {
                    this.info.spawnTime += 1;
                    this.toggles.spawnTick = false;
                } else {
                    this.toggles.spawnTick = false;
                }

            }, 1000);
        }
    }

    cleanup() {
        //this.pixiGraphic.clear();
    }
}
