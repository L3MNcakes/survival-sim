/**
 * config.js
 */
export const CONFIG = {
    world: {
        width: window.innerWidth / 1.1,
        height: window.innerHeight / 1.1,
        backgroundColor: 0x000000,
        roundPixels: true,
        antialius: true,
        transparent: true,
        resolution: 1,
        forceCanvas: true,
    },
    agent: {
        initNum: null,
        radius: 10,
        color: 0xffffff,
        waitTime: 2000,
        human: {
            initNum: 8,
            radius: 8,
            color: 0xf2df8c,
            speed: 8,
            waitTime: 2000,
        },
        zombie: {
            initNum: 3,
            radius: 8,
            color: 0x689155,
            speed: 4,
            waitTime: 3000,
        },
    },
    item: {
        initNum: 4,
        radius: 4,
        color: 0x8cc9ff,
        waitTime: 1000,
    },
    maxUnits: null,
    maxSpeed: 8,
    minSpeed: null,
    updateIntervalLength: 50 // in miliseconds
}
