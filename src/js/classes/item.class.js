/**
 * item.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Bodies } from './bodies.class';
import {
    ItemCheckAction,
} from './actions/item.actions';
import {
    getRandomColor,
    objectCollision,
    getRandomDestination,
} from '../factories/helpers';

export class Item extends Bodies {
    constructor(position, color, radius) {
        super(position, color, radius);
    }
}
