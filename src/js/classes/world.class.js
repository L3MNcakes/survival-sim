/**
 * world.class.js
 */
import { CONFIG } from '../config/config';
import { generateRandomAgents } from '../factories/agent.factory';
import { generateRandomItems } from '../factories/item.factory';

export class World {
    constructor() {
        this.pixiApp = this.createNewPixiApp();

        this.agents = generateRandomAgents(
            CONFIG.numberOfAgents,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.agentColor,
            CONFIG.agentRadius
        );

        this.items = generateRandomItems(
            CONFIG.numberOfItems,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.itemColor,
            CONFIG.itemRadius
        );

        this.updateInterval = null;
    }

    get pixiStage() {
        return this.pixiApp.stage;
    }

    start() {
        this.updateInterval = setInterval(this.update.bind(this), CONFIG.updateIntervalLength);
    }

    stop() {
        clearInterval(this.tickInterval);
    }

    createNewPixiApp() {
        return new PIXI.Application({
            width: CONFIG.world.width,
            height: CONFIG.world.height,
            backgroundColor: CONFIG.world.backgroundColor,
            antialius: CONFIG.world.antialius,
            transparent: CONFIG.world.transparent,
            resolution: CONFIG.world.resolution,
            roundPixels: CONFIG.world.roundPixels,
            forceCanvas: true
        });
    }

    update() {
        this.agents.map( (agent) => {
            agent.update();
            this.pixiApp.stage.addChild(agent.pixiGraphic);
        });

        this.items.map( (item) => {
            item.update();
            this.pixiApp.stage.addChild(item.pixiGraphic);
        });
    }

    render() {
        document.body.appendChild(this.pixiApp.view);
    }
}
