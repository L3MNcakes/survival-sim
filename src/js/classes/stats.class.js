/*
 * stats.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { World } from './world.class';
import { Bodies } from './bodies.class';
import { Ghost } from './ghost.class';
import { Agent } from './agent.class';
import { Human } from './human.class';
import { Zombie } from './zombie.class';
import { Item } from './item.class';
import { Food } from './food.class';

export class Stats {
    constructor(allStats) {
        this.setAgentStats(allStats.agentStats);
        this.setHumanStats(allStats.humanStats);
        this.setZombieStats(allStats.zombieStats);
        this.setItemStats(allStats.itemStats);
        this.setFoodStats(allStats.foodStats);
    }

    setAgentStats(agentStats) {
        this.agentStats = {
            speed: agentStats.speed || CONFIG.bodies.agent.speed,
            bonus: agentStats.bonus || null,
            penalty: agentStats.penalty || null,
        }
    }

    setHumanStats(humanStats) {
        this.humanStats = {
            speed: humanStats.speed || CONFIG.bodies.agent.human.speed,
            bonus: humanStats.bonus || null,
            penalty: humanStats.penalty || null,
        }
    }

    setZombieStats(zombieStats) {
        this.zombieStats = {
            speed: zombieStats.speed || CONFIG.bodies.agent.zombie.speed,
            bonus: zombieStats.bonus || null,
            penalty: zombieStats.penalty || null,
        }
    }

    setItemStats(itemStats) {
        this.itemStats = {
            speed: itemStats.speed || null,
            bonus: itemStats.bonus || null,
            penalty: itemStats.penalty || null,
        }
    }

    setFoodStats(foodStats) {
        this.foodStats = {
            speed: foodStats.speed || null,
            bonus: foodStats.bonus || null,
            penalty: foodStats.penalty || null,
        }
    }
}
