/**
 * dead.class.js
 */

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Agent } from './agent.class';

export class Dead extends Agent {
    constructor(position, color, radius) {
        super(position, color, radius);

        this.toggles = {
            hasAction: false,
            willReanimate: false,
            shouldCleanup: false,
            spawnTick: false,
        };

        this.info = {
            type: null,
            taker: null,
            deathSpot: null,
            decayRate: null,
            spawnTime: null,
            despawnTime: null,
        };

        this.moveStats = null;
        this.fightStats = null;

        this.nutritionStats = {
            bonus: this.bonus || CONFIG.bodies.agent.dead.nutritionStats.bonus,
            penalty: this.penalty || CONFIG.bodies.agent.dead.nutritionStats.penalty,
        };
    }

    update() {
        this.pixiGraphic.clear();
        this.pixiGraphic.beginFill(this.color);
        this.pixiGraphic.drawCircle(0, 0, this.radius);
        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;

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

        this.updateStats();
    }

    updateStats() {
        /**
        if(this.toggles.isDecayed) {
            if (this.info.type == 'zombie') {

            } else {

            }

            this.toggles.shouldCleanup = true;
        }
        */
    }
}
