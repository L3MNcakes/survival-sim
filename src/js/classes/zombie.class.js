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
import {
    getRandomColor,
    objectCollision,
    getRandomDestination,
} from '../factories/helpers';

export class Zombie extends Agent {
    constructor(position, color, radius) {
        super(position, color, radius);
    }
}
