/**
 * agent.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Bodies } from './bodies.class';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction
} from './actions/agent.actions';
import {
    getRandomColor,
    objectCollision,
    getRandomDestination,
    getNearestItem,
} from '../factories/helpers';

export class Agent extends Bodies {
    constructor(position, color, radius) {
        super(position, color, radius);
    }
}
