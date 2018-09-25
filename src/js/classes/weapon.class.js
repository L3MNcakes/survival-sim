/*
 * weapon.class.js
 */

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Item } from './item.class';

export class Weapon extends Item {
    constructor(position, color, radius, stats) {
        super(position, color, radius, stats);

        this.info = {
            decayRate: null,
            surviveTime: null,
            taker: null,
            decayRate: CONFIG.bodies.item.weapon.decayRate,
        };
    }
}
