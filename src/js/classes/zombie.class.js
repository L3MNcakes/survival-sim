/**
 * zombie.class.js
 */
import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Agent } from './agent.class';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction
} from './actions/agent.actions';
import {
    getRandomColor,
    objectCollision,
    getRandomDestination,
} from '../factories/helpers';

export class Zombie extends Agent {
    constructor(position, color, radius, stats) {
        super(position, color, radius, stats);

        /**
        this.hasAction = false;
        this.isSlowed = false;
        this.isKilled = false;
        this.hasDecayed = false;
        this.hasKilled = false;
        this.hasEaten = false;
        this.isEaten = false;
        this.isNew = true;
        **/

        /**
        this.type = 'Zombie';

        this.decayRate = CONFIG.bodies.agent.zombie.decayRate;
        **/

        this.info = {
            type: 'Zombie',
            hungerLvl: null,
            caughtSpot: null,
            decayRate: null,
            spawnTime: null,
            taker: null,
            decayRate: CONFIG.bodies.agent.zombie.decayRate,
            killedList: [],
            eatenList: [],
            itemList: [],
        };

        this.moveStats = {
            lowestSpeed: this.lowSpeed || CONFIG.bodies.agent.zombie.moveStats.speedLow,
            highestSpeed: this.highestSpeed || CONFIG.bodies.agent.zombie.moveStats.speedHigh,
            baseSpeed: this.baseSpeed || CONFIG.bodies.agent.zombie.moveStats.speedBase,
            currentSpeed: this.currentSpeed || CONFIG.bodies.agent.zombie.moveStats.speedCurrent,
        };

        this.fightStats = {
            attack: this.attack || CONFIG.bodies.agent.zombie.fightStats.attack,
            defense: this.defense || CONFIG.bodies.agent.zombie.fightStats.defense,
            dodge: this.dodge || CONFIG.bodies.agent.zombie.fightStats.dodge,
        };

        this.nutritionStats = {
            bonus: this.bonus || CONFIG.bodies.agent.zombie.nutritionStats.bonus,
            penalty: this.penalty || CONFIG.bodies.agent.zombie.nutritionStats.penalty,
        };
    }

    /**
    setMoveStats(moveStats) {
        this.moveStats = {
            lowestSpeed: moveStats.lowSpeed || CONFIG.bodies.agent.zombie.moveStats.speedLow,
            highestSpeed: moveStats.highestSpeed || CONFIG.bodies.agent.zombie.moveStats.speedHigh,
            baseSpeed: moveStats.baseSpeed || CONFIG.bodies.agent.zombie.moveStats.speedBase,
            currentSpeed: moveStats.currentSpeed || CONFIG.bodies.agent.zombie.moveStats.speedCurrent,
        }
    }
    */

    update() {
        this.pixiGraphic.clear();
        this.pixiGraphic.beginFill(this.color);
        this.pixiGraphic.drawCircle(0, 0, this.radius);
        this.pixiGraphic.x = this.position.x;
        this.pixiGraphic.y = this.position.y;

        // Agent specific update shit goes here vvvvvv
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
        if (!this.toggles.statDecay) {
            this.toggles.statDecay = true;
            setTimeout(() => {
                if(this.moveStats.lowestSpeed < this.moveStats.currentSpeed) {
                    //console.log(`${this.type} -- My current speed -- ${this.moveStats.currentSpeed}`)
                    this.moveStats.currentSpeed -= 1;
                    this.toggles.statDecay = false;
                    //console.log(`${this.type} -- My stats decayed -- ${this.moveStats.currentSpeed}`)
                } else {
                    this.toggles.isDecayed = true;
                    this.info.taker = 'decay';
                    //this.toggles.statDecay = false;
                }
            }, this.info.decayRate);
        }

        if(this.toggles.isCaught) {
            this.info.caughtSpot = this.position.clone();
            //this.toggles.isKilled = true;
        }

        if(this.toggles.isSlowed) {
            if(this.moveStats.lowestSpeed < this.moveStats.currentSpeed) {
                this.moveStats.currentSpeed -= 1;
            }
            return this.toggles.isSlowed = false;
        }

        if(this.toggles.hasKilled) {
            if(this.moveStats.highestSpeed > this.moveStats.currentSpeed) {
                this.moveStats.currentSpeed += 1;
            }
            return this.toggles.hasKilled = false;
        }

        if(this.toggles.hasEaten) {
            if(this.moveStats.highestSpeed > this.moveStats.currentSpeed) {
                this.moveStats.currentSpeed += 1;
            }
            return this.toggles.hasEaten = false;
        }

        if(this.toggles.hasItemPick) {
            if(this.moveStats.lowestSpeed < this.moveStats.currentSpeed) {
                this.moveStats.currentSpeed -= 1;
            }
            return this.toggles.hasItemPick = false;
        }

        if(this.toggles.isDecayed) {
            this.toggles.isCaught = true;
            //this.toggles.shouldCleanup = true;
            //console.log(`${this.info.type} - I should be dead - DecayStat: ${this.toggles.isDecayed} - ShoCleanStat: ${this.toggles.shouldCleanup}.`);
        }
    }
}
