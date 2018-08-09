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
        backgroundColor: 0xcecece,
        roundPixels: true,
        antialius: true,
        transparent: false,
        resolution: 1,
        forceCanvas: true,
    },
    bodies: {
        initNum: null,
        radius: null,
        color: null,
        speed: null,
        waitTime: null,
        agent: {
            initNum: 6,
            radius: 10,
            color: 0xffffff,
            //lineColor: 0x000000,
            speed: 14,
            waitTime: 1500,
            human: {
                initNum: 12,
                radius: 8,
                color: 0xffe900,
                //lineColor: 0x000000,
                speed: 8,
                waitTime: 1000,
            },
            zombie: {
                initNum: 8,
                radius: 8,
                color: 0x2e9100,
                speed: 4,
                waitTime: 2000,
            },
        },
        item: {
            initNum: 6,
            radius: 4,
            color: 0x7800b4, //getRandomColor(),
            checkInterval: 1000,
        },
    },
    maxUnits: null,
    maxSpeed: 8,
    minSpeed: null,
    updateIntervalLength: 50 // in miliseconds
}
