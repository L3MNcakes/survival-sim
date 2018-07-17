/**
 * world.class.js
 */
import * as PIXI from 'pixi.js';
import { CONFIG } from '../config/config';
import { generateRandomItems } from '../factories/item.factory';
import { ActionQueue } from './actions/action_queue.class';
import {
    generateRandomAgents,
    generateRandomHumans,
    generateRandomZombies
} from '../factories/agent.factory';
import { getAgentAction } from '../factories/agent_action.factory';
import { getHumanAction } from '../factories/human_action.factory';
import { getZombieAction } from '../factories/zombie_action.factory';
import { getItemAction } from '../factories/item_action.factory';

export class World {
    constructor() {
        this.actionQueue = new ActionQueue();
        this.pixiApp = this.createNewPixiApp();
        //this.pixiApp.screen.width;
        //this.pixiApp.screen.height;

        this.agents = generateRandomAgents(
            CONFIG.agent.initNum,
            window.screen.width,
            window.screen.height,
            /**
            CONFIG.world.width,
            CONFIG.world.height,
            */
            CONFIG.agent.color,
            CONFIG.agent.radius
        );

        this.humans = generateRandomHumans(
            CONFIG.agent.human.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.agent.human.color,
            CONFIG.agent.human.radius,
        );


        this.zombies = generateRandomZombies(
            CONFIG.agent.zombie.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.agent.zombie.color,
            CONFIG.agent.zombie.radius,
        )

        this.items = generateRandomItems(
            CONFIG.item.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.item.color,
            CONFIG.item.radius,
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
            forceCanvas: CONFIG.world.forceCanvas,
        });
    }

    update() {
        this.agents.map( (agent) => {
            if (!agent.hasAction) {
                let action = getAgentAction(agent, this.items);
                this.actionQueue.addAction(action);
            }

            agent.update();
            this.pixiApp.stage.addChild(agent.pixiGraphic);
        });

        this.humans.map( (human) => {
            if (!human.hasAction) {
                let action = getHumanAction(human, this.items);
                this.actionQueue.addAction(action);
            }

            human.update();
            this.pixiApp.stage.addChild(human.pixiGraphic);
        });

        this.zombies.map( (zombie) => {
            if (!zombie.hasAction) {
                let action = getZombieAction(zombie, this.humans);
                this.actionQueue.addAction(action);
            }

            zombie.update();
            this.pixiApp.stage.addChild(zombie.pixiGraphic);
        });

        this.items.map( (item) => {
            if(!item.hasAction) {
                let action = getItemAction(item, this.humans);

                this.actionQueue.addAction(action);
            }

            item.update();
            this.pixiApp.stage.addChild(item.pixiGraphic);
        });

        this.actionQueue.execute();
    }

    render() {
        window.addEventListener("resize", (event) => {
            this.pixiApp.renderer.resize(
                window.innerWidth / 1.1,
                window.innerHeight / 1.1
            );
        });
        //scaleToWindow(this.pixiApp.view, 0x000000);
        document.body.appendChild(this.pixiApp.view);
    }
}
