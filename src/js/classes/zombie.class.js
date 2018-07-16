/**
 * zombie.class.js
 */
import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Agent } from './agent.class';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction
} from './actions/agent.actions';

export class Zombie extends Agent {
    constructor(position, color, radius) {
        super(position, color, radius);
    }

    getAction() {
        let randomAction = Random.picker(["move", "wait"])(Random.engines.nativeMath);

        switch(randomAction) {
            case "move":
                return new AgentMoveAction({
                    agent: this,
                    origPosition: this.position.clone(),
                    destination: this.getDestination(),
                    speed: CONFIG.agent.zombie.speed,
                });
            case "wait":
                return new AgentWaitAction({
                    agent: this,
                    time: CONFIG.agent.zombie.waitTime,
                });
        }
    }
}
