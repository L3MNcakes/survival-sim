/**
 * agent.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Bodies } from './bodies.class';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction
} from './actions/agent.actions';
import {
    getRandomColor,
    objectCollision,
    getRandomDestination,
    getNearestItem,
} from '../factories/helpers';

export class Agent extends Bodies {
    constructor(position, color, radius, /**stats**/) {
        super(position, color, radius, /**stats**/);

        /**
        this.isAvoiding = false;
        this.isCaught = false;
        this.isDecayed = false;
        this.isSlowed = false;
        this.isKilled = false;
        this.isEaten = false;
        this.isEating = false;
        this.hasEaten = false;
        this.hasKilled = false;
        this.hasItemPick = false;
        this.hasWeapon = false;
        **/

        this.toggles = {
            hasAction: false,
            isSought: false,
            isDead: false,
            respawn: false,
            isDecayed: false,
            statDecay: false,
            surviveTick: false,
            shouldCleanup: false,
            isAvoiding: false,
            isCaught: false,
            isSlowed: false,
            isKilled: false,
            isEating: false,
            isEaten: false,
            hasEaten: false,
            hasKilled: false,
            hasItemPick: false,
            hasWeapon: false,
        };

        this.info = {
            type: 'Agent',
            hungerLvl: null,
            deathSpot: null,
            decayRate: null,
            surviveTime: null,
            taker: null,
            decayRate: CONFIG.bodies.agent.decayRate,
            killedList: [],
            eatenList: [],
            itemList: [],
        };

        /**
        this.hungerLvl = null;
        this.deathSpot = null;

        this.killedList = [];
        this.eatenList = [];
        this.itemList = [];
        //this.takenList = [];

        this.type = 'Agent';

        this.decayRate = CONFIG.bodies.agent.decayRate;
        **/

        this.moveStats = {
            lowestSpeed: this.lowSpeed || CONFIG.bodies.agent.moveStats.speedLow,
            highestSpeed: this.highestSpeed || CONFIG.bodies.agent.moveStats.speedHigh,
            baseSpeed: this.baseSpeed || CONFIG.bodies.agent.moveStats.speedBase,
            currentSpeed: this.currentSpeed || CONFIG.bodies.agent.moveStats.speedCurrent,
        };

        this.fightStats = {
            attack: this.attack || CONFIG.bodies.agent.fightStats.attack,
            defense: this.defense || CONFIG.bodies.agent.fightStats.defense,
            dodge: this.dodge || CONFIG.bodies.agent.fightStats.dodge,
        };

        this.nutritionStats = {
            bonus: this.bonus || CONFIG.bodies.agent.nutritionStats.bonus,
            penalty: this.penalty || CONFIG.bodies.agent.nutritionStats.penalty,
        };

        //this.setMoveStats(stats.moveStats);
        //this.setNutritionStats(stats.nutritionStats);
        //this.setFightStats(stats.fightStats);
    }

    setMoveStats(moveStats) {
        if(this.moveStats.currentSpeed == null) {
            this.moveStats.currentSpeed = this.moveStats.baseSpeed;
        }
    }

    /**
    setNutritionStats(nutritionStats) {
        this.nutritionStats = {
            bonus: nutritionStats.bonus || CONFIG.bodies.agent.nutritionStats.bonus,
            penalty: nutritionStats.penalty || CONFIG.bodies.agent.nutritionStats.penalty,
        }
    }

    setFightStats(fightStats) {
        this.fightStats = {
            attack: fightStats.attack || CONFIG.bodies.agent.fightStats.attack,
            defense: fightStats.defense || CONFIG.bodies.agent.fightStats.defense,
            dodge: fightStats.dodge || CONFIG.bodies.agent.fightStats.dodge,
        }
    }
    **/

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
            this.info.deathSpot = this.position.clone();
            this.toggles.isKilled = true;
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
            this.toggles.shouldCleanup = true;
            console.log(`${this.info.type} - I should be dead - DecayStat: ${this.toggles.isDecayed} - CleanStat: ${this.toggles.shouldCleanup}.`);
        }
    }
}
