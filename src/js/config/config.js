/**
 * config.js
 */
export const CONFIG = {
    world: {
        width: 500,
        height: 500,
        backgroundColor: 0x800000,
        roundPixels: true,
        antialius: true,
        transparent: false,
        resolution: 1,
        /**
        renderer: {
            view: {
                style: {
                    position: 'absolute',
                    display: 'block'
                },
            },
            backgroundColor: 0x000000,
            autoResize: true,
            resize: (window.innerWidth, window.innerHeight)
        },
        **/
    },
    worldSize: null,
    maxUnits: null,
    maxSpeed: 10,
    minSpeed: null,
    numberOfAgents: 100,
    numberOfItems: 5,
    agentRadius: 10,
    itemRadius: 5,
    agentColor: 0xffffff,
    itemColor: 0x00ff00,
    updateIntervalLength: 50 // in miliseconds
}
