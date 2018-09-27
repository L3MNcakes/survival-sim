/**
 * config.js
 */

 import {
     getRandomColor,
 } from '../factories/helpers';

export const CONFIG = {
    world: {
        width: window.innerWidth / 1.1,
        height: window.innerHeight / 1.1,
        //backgroundColor: 0xcecece,
        roundPixels: true,
        antialius: true,
        transparent: true,
        resolution: 1,
        forceCanvas: true,
    },
    bodies: {
        initNum: null,
        radius: null,
        color: null,
        decayRate: null,
        moveStats: {
            speedLow: null,
            speedHigh: null,
            speedBase: null,
        },
        nutritionStats: {
            bonus: null,
            penalty: null,
        },
        fightStats: {
            attack: null,
            defense: null,
            dodge: null,
        },
        waitTime: null,
        agent: {
            initNum: 1,
            radius: 10,
            color: 0x000000,//0xffffff,
            decayRate: 5000,
            //lineColor: 0x000000,
            waitTime: 1500,
            moveStats: {
                speedLow: 1,
                speedHigh: 20,
                speedBase: 14,
                speedCurrent: null,
            },
            nutritionStats: {
                bonus: 6,
                penalty: 6,
            },
            fightStats: {
                attack: 6,
                defense: 6,
                dodge: 6,
            },
            dead: {
                color: 0xc1c1c1,
                deadTime: 15000,
                nutritionStats: {
                    bonus: 2,
                    penalty: 1,
                },
            },
            human: {
                initNum: 20,
                lowAllowed: 3,
                radius: 8,
                color: 0xffe900,
                avoidRadius: 75,
                decayRate: 4000,
                dyingTime: 10000,
                dyingColor: 0xc1c1c1,
                //lineColor: 0x000000,
                waitTime: 1500,
                moveStats: {
                    speedLow: 1,
                    speedHigh: 12,
                    speedBase: 8,
                },
                nutritionStats: {
                    bonus: 2,
                    penalty: 2,
                },
                fightStats: {
                    attack: 2,
                    defense: 3,
                    dodge: 2,
                },
            },
            zombie: {
                initNum: 1,
                lowAllowed: 1,
                radius: 8,
                color: 0x2e9100,
                seekRadius: 75,
                decayRate: 5000,
                waitTime: 3000,
                moveStats: {
                    speedLow: 1,
                    speedHigh: 8,
                    speedBase: 4,
                },
                nutritionStats: {
                    bonus: 1,
                    penalty: 4,
                },
                fightStats: {
                    attack: 3,
                    defense: 1,
                    dodge: 1,
                },
            },
        },
        item: {
            initNum: 6,
            radius: 4,
            color: 0x7800b4, //getRandomColor(),
            decayRate: 10000,
            checkInterval: 1000,
            livFood: null,
            dedFood: null,
            armour: null,
            weapon: {
                initNum: 2,
                radius: 4,
                color: 0x4277f4,
                decayRate: 120000,
            },
            food: {
                initNum: 10,
                radius: 4,
                color: 0x66FC4B,
                decayRate: 10000,
            },

        },
    },
    maxUnits: null,
    maxSpeed: 8,
    minSpeed: null,
    updateIntervalLength: 50 // in miliseconds
}
