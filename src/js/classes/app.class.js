/**
 * app.class.js
 */
import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Agent } from './agent.class';
let Victor = require('victor');

export class App {
    constructor() {
        this.pixiApp = new PIXI.Application({
            width: CONFIG.width,
            height: CONFIG.height,
            backgroundColor: CONFIG.backgroundColor,
            roundPixels: CONFIG.roundPixels,
        });

        this.agents = [];
    }

    renderAgent(agent) {
        agent.update();
        this.pixiApp.stage.addChild(agent.pixiGraphic);
    }

    generateAgents() {
        for(let i = 0; i < CONFIG.numberOfAgents; i++) {
            let randomX = Random.integer(0, CONFIG.width)(Random.engines.nativeMath),
                randomY = Random.integer(0, CONFIG.height)(Random.engines.nativeMath),
                position = new Victor(randomX, randomY),
                color = 0xffffff;


            this.agents.push(new Agent(position, color, CONFIG.radius));
        }
    }

    render() {
        for(let i = 0; i < this.agents.length; i++) {
            this.renderAgent(this.agents[i]);
        }
    }

    tick() {
        for(let i = 0; i < CONFIG.numberOfAgents; i++) {
            this.agents[i].tick();
        }

        this.render();
    }
}
