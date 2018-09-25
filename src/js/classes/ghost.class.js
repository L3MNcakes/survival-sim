/**
 * ghost.class.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { Bodies } from './bodies.class';
import { Agent } from './agent.class';
import { Human } from './human.class';
import { Zombie } from './zombie.class';
import { Item } from './item.class';

export class Ghost {
    constructor() {

        this.toggles = {
            hasAction: false,
        };

        this.info = {
            agentCount: null,
            humanCount: null,
            zombieCount: null,
            itemCount: null,
            foodCount: null,
            weaponCount: null,
        };
        //this.hasAction = false;
    }

    update() {
        //console.log('Ghost updates! AHHHHHH!!!! Sppoooookey!!');
    }

    /**keep track of .taken status of every body (everybody, huh)**/
}
