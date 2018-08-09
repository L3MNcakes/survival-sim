/**
 * world.class.js
 */
import * as PIXI from 'pixi.js';
import { CONFIG } from '../config/config';
import { ActionQueue } from './actions/action_queue.class';
import { getAgentAction } from '../factories/agent_action.factory';
import { getHumanAction } from '../factories/human_action.factory';
import { getZombieAction } from '../factories/zombie_action.factory';
import { getItemAction } from '../factories/item_action.factory';
import { generateGhost } from '../factories/ghost.factory';
import {
    generateRandomItems,
    generateOneItem,
 } from '../factories/item.factory';
import {
    generateRandomAgents,
    generateRandomHumans,
    generateRandomZombies
} from '../factories/agent.factory';

export class World {
    constructor() {
        this.actionQueue = new ActionQueue();
        this.pixiApp = this.createNewPixiApp();
        //this.pixiApp.screen.width;
        //this.pixiApp.screen.height;

        this.ghost = generateGhost();

        this.items = generateRandomItems(
            CONFIG.bodies.item.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.item.color,
            CONFIG.bodies.item.radius,
        );

        this.agents = generateRandomAgents(
            CONFIG.bodies.agent.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.agent.color,
            CONFIG.bodies.agent.radius
        );

        this.humans = generateRandomHumans(
            CONFIG.bodies.agent.human.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.agent.human.color,
            CONFIG.bodies.agent.human.radius,
        );


        this.zombies = generateRandomZombies(
            CONFIG.bodies.agent.zombie.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.agent.zombie.color,
            CONFIG.bodies.agent.zombie.radius,
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
        clearInterval(this.updateInterval);
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
        this.ghost = (ghost) => {
            if(!ghost.hasAction) {
                let action = getGhostAction(ghost, this.agents, this.humans, this.zombies);
                this.actionQueue.addAction(action);
            }

            ghost.update();
        };

        this.items.map( (item) => {
            if(!item.hasAction) {
                let action = getItemAction(item, this.humans, this.agents);
                this.actionQueue.addAction(action);
            }

            item.update();
            this.pixiApp.stage.addChild(item.pixiGraphic);
        });

        this.agents.map( (agent) => {
            if (!agent.hasAction) {
                let action = getAgentAction(agent, this.items, this.humans, this.zombies);
                this.actionQueue.addAction(action);
            }

            agent.update();
            this.pixiApp.stage.addChild(agent.pixiGraphic);
        });

        this.humans.map( (human) => {
            if (!human.hasAction) {
                let action = getHumanAction(human, this.humans, this.zombies, this.items);
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

        this.actionQueue.execute();
        this.cleanup();
        //console.log(this.items);
    }

    cleanup() {
        this.items = this.items.map( (item) => {
            if (item.shouldCleanup) {
                return false;
            } else {
                return item;
            }
        }).filter(Boolean);

        if (this.items.length < CONFIG.bodies.item.initNum) {
            this.items.push(generateOneItem(
                CONFIG.world.width,
                CONFIG.world.height,
                CONFIG.bodies.item.color,
                CONFIG.bodies.item.radius,
            ));
        };

        this.agents = this.agents.map( (agent) => {
            if (agent.shouldCleanup) {
                return false;
            } else {
                return agent;
            }
        }).filter(Boolean);

        this.humans = this.humans.map( (human) => {
            if (human.shouldCleanup) {
                return false;
            } else {
                return human;
            }
        }).filter(Boolean);

        this.zombies = this.zombies.map( (zombie) => {
            if (zombie.shouldCleanup) {
                return false;
            } else {
                return zombie;
            }
        }).filter(Boolean);
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
