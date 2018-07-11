/**
 * app.class.js
 */
import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Agent } from './agent.class';
import { Item } from './item.class';
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
        this.items = [];
    }

    renderAgent(agent) {
        agent.update();
        this.pixiApp.stage.addChild(agent.pixiGraphic);
    }

    renderItem(item) {
        item.update();
        this.pixiApp.stage.addChild(item.pixiGraphic);
    }

    generateAgents() {
        for(let i = 0; i < CONFIG.numberOfAgents; i++) {
            let randomX = Random.integer(0, CONFIG.width)(Random.engines.nativeMath),
                randomY = Random.integer(0, CONFIG.height)(Random.engines.nativeMath),
                position = new Victor(randomX, randomY),
                color = 0xffffff;


            this.agents.push(new Agent(position, color, CONFIG.agentRadius));
        }
    }

    generateItems() {
        for(let i = 0; i < CONFIG.numberOfItems; i++) {
            let randomX = Random.integer(0, CONFIG.width)(Random.engines.nativeMath),
                randomY = Random.integer(0, CONFIG.height)(Random.engines.nativeMath),
                position = new Victor(randomX, randomY),
                color = 0x00ff00;

            this.items.push(new Item(position, color, CONFIG.itemRadius));
        }
    }

    render() {
        for(let i = 0; i < this.agents.length; i++) {
            this.renderAgent(this.agents[i]);
        }

        for(let i = 0; i < this.items.length; i++) {
            this.renderItem(this.items[i]);
        }
    }

    tick() {
        for(let i = 0; i < CONFIG.numberOfAgents; i++) {
            this.agents[i].tick();
        }

        this.render();
    }
}
