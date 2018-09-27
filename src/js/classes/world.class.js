/**
 * world.class.js
 */
import * as PIXI from 'pixi.js';
import { CONFIG } from '../config/config';
import { ActionQueue } from './actions/action_queue.class';
import { getAgentAction } from '../factories/actions/agent_action.factory';
import { getHumanAction } from '../factories/actions/human_action.factory';
import { getZombieAction } from '../factories/actions/zombie_action.factory';
import { getItemAction } from '../factories/actions/item_action.factory';
import { getFoodAction } from '../factories/actions/food_action.factory';
import { getWeaponAction } from '../factories/actions/weapon_action.factory';
import { getGhostAction } from '../factories/actions/ghost_action.factory';
import { generateGhost } from '../factories/ghost.factory';
import {
    generateRandomItems,
    generateRandomFoods,
    generateRandomWeapons,
    generateOneItem,
    generateOneFood,
    generateOneWeapon,
} from '../factories/item.factory';
import {
    generateRandomAgents,
    generateRandomHumans,
    generateRandomZombies,
    generateOneHuman,
    generateOneZombie,
    spawnZombie,
    spawnDead,
} from '../factories/agent.factory';

export class World {
    constructor() {
        this.actionQueue = new ActionQueue();
        this.pixiApp = this.createNewPixiApp();
        //this.pixiApp.screen.width;
        //this.pixiApp.screen.height;

        this.ghosts = generateGhost();

        this.items = generateRandomItems(
            CONFIG.bodies.item.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.item.color,
            CONFIG.bodies.item.radius,
        );

        this.foods = generateRandomFoods(
            CONFIG.bodies.item.food.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.item.food.color,
            CONFIG.bodies.item.food.radius,
        );

        this.weapons = generateRandomWeapons(
            CONFIG.bodies.item.weapon.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.item.weapon.color,
            CONFIG.bodies.item.weapon.radius,
        );

        this.agents = generateRandomAgents(
            CONFIG.bodies.agent.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.agent.color,
            CONFIG.bodies.agent.radius,

            {
                moveStats: {
                    lowSpeed: CONFIG.bodies.agent.moveStats.speedLow,
                    highestSpeed: CONFIG.bodies.agent.moveStats.speedHigh,
                    baseSpeed: CONFIG.bodies.agent.moveStats.speedBase,
                    currentSpeed: CONFIG.bodies.agent.moveStats.speedCurrent,
                },
                nutritionStats: {
                    bonus:  CONFIG.bodies.agent.nutritionStats.bonues,
                    penalty: CONFIG.bodies.agent.nutritionStats.penalty,
                },
                fightStats: {
                    attack: CONFIG.bodies.agent.fightStats.attack,
                    defense: CONFIG.bodies.agent.fightStats.defense,
                    dodge: CONFIG.bodies.agent.fightStats.dodge,
                }
            }
        );

        this.humans = generateRandomHumans(
            CONFIG.bodies.agent.human.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.agent.human.color,
            CONFIG.bodies.agent.human.radius,

            {
                moveStats: {
                    lowSpeed: CONFIG.bodies.agent.human.moveStats.speedLow,
                    highestSpeed: CONFIG.bodies.agent.human.moveStats.speedHigh,
                    baseSpeed: CONFIG.bodies.agent.human.moveStats.speedBase,
                    currentSpeed: CONFIG.bodies.agent.human.moveStats.speedCurrent,
                },
                nutritionStats: {
                    bonus:  CONFIG.bodies.agent.human.nutritionStats.bonues,
                    penalty: CONFIG.bodies.agent.human.nutritionStats.penalty,
                },
                fightStats: {
                    attack: CONFIG.bodies.agent.human.fightStats.attack,
                    defense: CONFIG.bodies.agent.human.fightStats.defense,
                    dodge: CONFIG.bodies.agent.human.fightStats.dodge,
                }
            }
        );


        this.zombies = generateRandomZombies(
            CONFIG.bodies.agent.zombie.initNum,
            CONFIG.world.width,
            CONFIG.world.height,
            CONFIG.bodies.agent.zombie.color,
            CONFIG.bodies.agent.zombie.radius,

            {
                moveStats: {
                    lowSpeed: CONFIG.bodies.agent.zombie.moveStats.speedLow,
                    highestSpeed: CONFIG.bodies.agent.zombie.moveStats.speedHigh,
                    baseSpeed: CONFIG.bodies.agent.zombie.moveStats.speedBase,
                    currentSpeed: CONFIG.bodies.agent.zombie.moveStats.speedCurrent,
                },
                nutritionStats: {
                    bonus:  CONFIG.bodies.agent.zombie.nutritionStats.bonues,
                    penalty: CONFIG.bodies.agent.zombie.nutritionStats.penalty,
                },
                fightStats: {
                    attack: CONFIG.bodies.agent.zombie.fightStats.attack,
                    defense: CONFIG.bodies.agent.zombie.fightStats.defense,
                    dodge: CONFIG.bodies.agent.zombie.fightStats.dodge,
                }
            }
        );

        this.deads = [];

        this.getGrouped = () => {
            let groupedBodies = {
                deads: this.deads,
                humans: this.humans,
                zombies: this.zombies,
                agents: this.agents,
                ghosts: this.ghosts,
                items: this.items,
                foods: this.foods,
                weapons: this.weapons,
            };
            return console.log(groupedBodies);
        }

        /**
        this.displayGenStats = () => {
            let _statUpdate = false;

            if (!_statUpdate) {
                _statUpdate = true;
                setTimeout(() => {
                    console.log(`5 sec update:`);
                    this.getGrouped();
                    _statUpdate = false;
                }, 5000);
            }
        }
        **/

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
        this.getGrouped();
        //this.displayGenStats();

        this.ghosts.map( (ghost) => {
            if(!ghost.toggles.hasAction) {
                let action = getGhostAction(ghost, this.agents, this.humans, this.zombies);
                this.actionQueue.addAction(action);
            }

            ghost.update();
        });

        this.deads.map( (dead) => {
            /**
            if(!dead.toggles.hasAction) {
                let action = getDeadAction(dead,);
                this.actionQueue.addAction(action);
            }
            */

            dead.update();
            this.pixiApp.stage.addChild(dead.pixiGraphic);
        });

        this.items.map( (item) => {
            if(!item.toggles.hasAction) {
                let action = getItemAction(item, this.humans, this.agents);
                this.actionQueue.addAction(action);
            }

            item.update();
            this.pixiApp.stage.addChild(item.pixiGraphic);
        });

        this.foods.map( (food) => {
            if(!food.toggles.hasAction) {
                let action = getFoodAction(food, this.humans, this.agents);
                this.actionQueue.addAction(action);
            }

            food.update();
            this.pixiApp.stage.addChild(food.pixiGraphic);
        });

        this.weapons.map( (weapon) => {
            if(!weapon.toggles.hasAction) {
                let action = getWeaponAction(weapon, this.humans, this.agents)
            }

            weapon.update();
            this.pixiApp.stage.addChild(weapon.pixiGraphic);
        });

        this.agents.map( (agent) => {
            //agent.setMoveStats();

            if (!agent.toggles.hasAction) {
                let action = getAgentAction(agent, this.items, this.foods, this.humans, this.zombies);
                this.actionQueue.addAction(action);
            }

            agent.update();
            this.pixiApp.stage.addChild(agent.pixiGraphic);
        });

        this.humans.map( (human) => {
            //human.setMoveStats();

            if (!human.toggles.hasAction) {
                let action = getHumanAction(human, this.humans, this.zombies, this.items, this.foods, this.weapons);
                this.actionQueue.addAction(action);
            }

            human.update();
            this.pixiApp.stage.addChild(human.pixiGraphic);
        });

        this.zombies.map( (zombie) => {
            //zombie.setMoveStats();
            /**
            if (zombie.isNew) {
                zombie.hasAction = false;
                zombie.isNew = false;
            }
            **/

            if (!zombie.toggles.hasAction) {
                let action = getZombieAction(zombie, this.humans);
                this.actionQueue.addAction(action);
            }

            zombie.update();
            this.pixiApp.stage.addChild(zombie.pixiGraphic);
        });

        this.actionQueue.execute();
        this.cleanup();
        //this.spawnAll();
        //console.log(this.items);
    }

    cleanup() {
        this.items = this.items.map( (item) => {
            if (item.toggles.shouldCleanup) {
                item.pixiGraphic.clear();
                return false;
            } else {
                return item;
            }
        }).filter(Boolean);

        this.foods = this.foods.map( (food) =>  {
            if (food.toggles.shouldCleanup) {
                food.pixiGraphic.clear();
                return false;
            } else {
                return food;
            }
        }).filter(Boolean);

        this.weapons = this.weapons.map( (weapon) => {
            if (weapon.toggles.shouldCleanup) {
                weapon.pixiGraphic.clear();
                return false;
            } else {
                return weapon;
            }
        }).filter(Boolean);

        this.agents = this.agents.map( (agent) => {
            if (agent.toggles.shouldCleanup) {
                agent.pixiGraphic.clear();
                return false;
            } else {
                return agent;
            }
        }).filter(Boolean);

        this.humans = this.humans.map( (human) => {
            if (human.toggles.shouldCleanup) {
                human.pixiGraphic.clear();
                return false;
            } else {
                return human;
            }
        }).filter(Boolean);

        this.zombies = this.zombies.map( (zombie) => {
            if (zombie.toggles.shouldCleanup) {
                zombie.pixiGraphic.clear();
                return false;
            } else {
                return zombie;
            }
        }).filter(Boolean);

        this.deads = this.deads.map( (dead) => {
            if (dead.toggles.shouldCleanup) {
                dead.pixiGraphic.clear();
                return false;
            } else {
                return dead;
            }
        }).filter(Boolean);

        this.spawnAll();
    }

    spawnAll() {
        if (this.items.length < CONFIG.bodies.item.initNum) {
            this.items.push(generateOneItem(
                CONFIG.world.width,
                CONFIG.world.height,
                CONFIG.bodies.item.color,
                CONFIG.bodies.item.radius,
            ));
        };

        if (this.foods.length < CONFIG.bodies.item.food.initNum) {
            this.foods.push(generateOneFood(
                CONFIG.world.width,
                CONFIG.world.height,
                CONFIG.bodies.item.food.color,
                CONFIG.bodies.item.food.radius,
            ));
        };

        if (this.weapons.length < CONFIG.bodies.item.weapon.initNum) {
            this.weapons.push(generateOneWeapon(
                CONFIG.world.width,
                CONFIG.world.height,
                CONFIG.bodies.item.weapon.color,
                CONFIG.bodies.item.weapon.radius,
            ));
        };

        if (this.humans.length < CONFIG.bodies.agent.human.lowAllowed) {
            this.humans.push(generateOneHuman(
                CONFIG.world.width,
                CONFIG.world.height,
                CONFIG.bodies.agent.human.color,
                CONFIG.bodies.agent.human.radius,
            ));
        };

        if (this.zombies.length < CONFIG.bodies.agent.zombie.lowAllowed) {
            this.zombies.push(generateOneZombie(
                CONFIG.world.width,
                CONFIG.world.height,
                CONFIG.bodies.agent.zombie.color,
                CONFIG.bodies.agent.zombie.radius,
            ));
        };


        this.humans.map( (human) => {
            if (human.toggles.isDead && !human.toggles.deadSpawned) {
                let _dedSpot = human.info.caughtSpot.clone(),
                    dead = spawnDead( //just spawns a dead body, not a zombie
                    _dedSpot.x,
                    _dedSpot.y,
                    CONFIG.bodies.agent.dead.color,
                    human.radius,
                );

                human.pixiGraphic.clear();
                dead.info.taker = human.info.taker;
                dead.info.type = human.info.type;
                dead.info.deathSpot = human.info.caughtSpot.clone();

                if (dead.info.taker === 'zombie') {
                    dead.toggles.willReanimate = true;

                } else {
                    dead.toggles.willReanimate = false;
                }

                this.deads.push(dead);
                human.toggles.deadSpawned = true;
                human.toggles.shouldCleanup = true;
            };

            /**
            if (human.toggles.respawn) {
                let zombie = spawnZombie(
                    human.info.deathSpot.x,
                    human.info.deathSpot.y,
                    CONFIG.bodies.agent.zombie.color,
                    CONFIG.bodies.agent.zombie.radius,
                );
                //zombie.hasAction = false;
                this.zombies.push(zombie);
                return human.toggles.isDead = true;
                //return human.toggles.shouldCleanup = true;
            };
            */
        });

        this.zombies.map( (zombie) => {
            if (zombie.toggles.isDead && !zombie.toggles.deadSpawned) {
                let dead = spawnDead(
                    zombie.info.caughtSpot.x,
                    human.info.caughtSpot.y,
                    CONFIG.bodies.agent.dead.color,
                    zombie.radius,
                );

                zombie.pixiGraphic.clear();
                dead.info.taker = zombie.info.taker;
                dead.info.type = zombie.info.type;
                dead.info.deathSpot = zombie.info.caughtSpot.clone();
                this.deads.push(dead);
                zombie.toggles.deadSpawned = true;
                zombie.toggles.shouldCleanup = true;
            }
        });

        this.deads.map( (dead) => {
            if (dead.info.spawnTime == 15 && dead.toggles.willReanimate) {
                let zombie = spawnZombie(
                    dead.info.deathSpot.x,
                    dead.info.deathSpot.y,
                    CONFIG.bodies.agent.zombie.color,
                    dead.radius,
                );

                this.zombies.push(zombie);
                dead.pixiGraphic.clear();
                dead.toggles.shouldCleanup = true;
            } else if (dead.info.spawnTime == 15 && !dead.toggles.willReanimate) {
                dead.toggles.shouldCleanup = true;
            }

            /**
            let _oneTime = false,
                _oneSpawn = false;

            if (!_oneTime) {
                _oneTime = true;
                setTimeout(() => {
                    if(dead.toggles.willReanimate = true && !_oneSpawn) {
                        _oneSpawn = true;
                        let zombie = spawnZombie(
                            dead.info.deathSpot.x,
                            dead.info.deathSpot.y,
                            CONFIG.bodies.agent.zombie.color,
                            dead.radius,
                        );

                        this.zombies.push(zombie);
                        //dead.pixiGraphic.clear();
                        dead.toggles.shouldCleanup = true;
                    } else {
                        dead.toggles.shouldCleanup = true;
                    }
                }, CONFIG.bodies.agent.dead.deadTime);
            }
            */


            /**
            if (dead.toggles.willReanimate = true) {
                setTimeout(() => {
                    let zombie = spawnZombie(
                        dead.info.deathSpot.x,
                        dead.info.deathSpot.y,
                        CONFIG.bodies.agent.zombie.color,
                        dead.radius,
                    );

                    dead.pixiGraphic.clear();

                    this.zombies.push(zombie);

                    return dead.toggles.shouldCleanup = true;

                }, CONFIG.bodies.agent.dead.deadTime);
            } else {
                setTimeout(() => {
                    return dead.toggles.shouldCleanup = true;
                }, CONFIG.bodies.agent.dead.deadTime);
            }
            */
        });
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
