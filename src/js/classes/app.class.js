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
        let circle = new PIXI.Graphics();
        circle.beginFill(agent.color);
        circle.drawCircle(0, 0, agent.radius);
        circle.x = agent.position.x;
        circle.y = agent.position.y;
        this.pixiApp.stage.addChild(circle);
        console.log(agent);
        console.log(circle);
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
}
