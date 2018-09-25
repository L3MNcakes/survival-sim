/**
 * item.class.js
 */
let Victor = require('victor');

import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Bodies } from './bodies.class';

export class Item extends Bodies {
    constructor(position, color, radius, stats) {
        super(position, color, radius, stats);

        /**
        this.decayRate = CONFIG.bodies.item.decayRate;
        this.isTaken = false;
        **/

        this.toggles = {
            hasAction: false,
            isSought: false,
            isDecayed: false,
            statDecay: false,
            surviveTick: false,
            shouldCleanup: false,
            isTaken: false,
        };

        this.tests = {
            seekerAgent: '',
        };

        this.info = {
            decayRate: null,
            surviveTime: null,
            taker: null,
            decayRate: CONFIG.bodies.item.decayRate,
        };
    }
}
