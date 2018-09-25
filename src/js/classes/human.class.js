/**
 * human.class.js
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

export class Human extends Agent {
    constructor(position, color, radius, /**stats**/) {
        super(position, color, radius, /**stats**/);

        /**
        this.type = 'Human';

        this.decayRate = CONFIG.bodies.agent.human.decayRate;
        **/

        this.info = {
            type: 'Human',
            hungerLvl: null,
            deathSpot: null,
            decayRate: null,
            surviveTime: null,
            taker: null,
            decayRate: CONFIG.bodies.agent.human.decayRate,
            killedList: [],
            eatenList: [],
            itemList: [],
        };

        this.moveStats = {
            lowestSpeed: this.lowSpeed || CONFIG.bodies.agent.human.moveStats.speedLow,
            highestSpeed: this.highestSpeed || CONFIG.bodies.agent.human.moveStats.speedHigh,
            baseSpeed: this.baseSpeed || CONFIG.bodies.agent.human.moveStats.speedBase,
            currentSpeed: this.currentSpeed || CONFIG.bodies.agent.human.moveStats.speedCurrent,
        };

        this.fightStats = {
            attack: this.attack || CONFIG.bodies.agent.human.fightStats.attack,
            defense: this.defense || CONFIG.bodies.agent.human.fightStats.defense,
            dodge: this.dodge || CONFIG.bodies.agent.human.fightStats.dodge,
        };

        this.nutritionStats = {
            bonus: this.bonus || CONFIG.bodies.agent.human.nutritionStats.bonus,
            penalty: this.penalty || CONFIG.bodies.agent.human.nutritionStats.penalty,
        };
    }

    /**
    setMoveStats(moveStats) {
        this.moveStats = {
            lowestSpeed: moveStats.lowSpeed || CONFIG.bodies.agent.human.moveStats.speedLow,
            highestSpeed: moveStats.highestSpeed || CONFIG.bodies.agent.human.moveStats.speedHigh,
            baseSpeed: moveStats.baseSpeed || CONFIG.bodies.agent.human.moveStats.speedBase,
            currentSpeed: moveStats.currentSpeed || CONFIG.bodies.agent.human.moveStats.speedCurrent,
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
                    this.info.taker = 'hunger';
                    //this.toggles.statDecay = false;
                }
            }, this.info.decayRate);
        }

        if(this.toggles.isCaught) {
            this.toggles.isDying = true;
            //this.info.deathSpot = this.position.clone();
            //this.toggles.isKilled = true;
        }

        if(this.toggles.isDying) {
            this.info.deathSpot = this.position.clone();
        }

        if(this.toggles.isDead) {
            this.toggles.shouldCleanup = true;
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

        if(this.toggles.hasWeapon) {
            this.fightStats.attack += 1;
            return this.toggles.hasWeapon = false;
        }

        if(this.toggles.isDecayed) {
            this.toggles.isCaught = true;
            //this.toggles.shouldCleanup = true;
            //console.log(`${this.info.type} - I should be dead - DecayStat: ${this.toggles.isDecayed} - CleanStat: ${this.toggles.shouldCleanup}.`);
        }
    }
}
