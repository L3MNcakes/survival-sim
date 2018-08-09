/**
 * item.actions.js
 */
let Victor = require('victor');

import { CONFIG } from '../../config/config';
import { Action } from './action.class';
import { generateRandomItems } from '../../factories/item.factory';
import {
    getNearestAgent,
    getRandomDestination,
    objectCollision,
} from '../../factories/helpers';

export class ItemWaitAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          item - The item that is waiting
     *          agent - The agent that is colliding
     *          time - How often they check (in MS)
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.item.hasAction = true;
        this._isDone = false;
        this._hasTimeout = false;
    }

    execute() {
        if (!this._hasTimeout) {
            setTimeout(() => {
                this._isDone = true;
            }, this.data.time);

            this._hasTimeout = true;
        }
    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        this.data.item.hasAction = false;
    }
}

export class ItemInteractAction extends Action {
    /*
     * Constructor
     * @param {Object} data -
     *          {
     *              item - item waiting to interact
     *              agents - checking these agents for interaction
     *              humans - checking these humans for interaction
     *              origPosition - the item's position
     *          }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.item.hasAction = true;
        this._isTaken = false;
    }

    execute() {
        const agentIntersectCheck = () => {
            let agentDistances = this.data.agents.map((agent) => {
                return agent.position.clone().distance(this.data.item.position);
            }),
                closestDistance = Math.min(...agentDistances);

            if(closestDistance !== 0) {
                this.data.item.position = this.data.origPosition;
            } else {
                this.data.item.shouldCleanup = true;
                this.data.item.pixiGraphic.clear();
                this._isTaken = true;
            }
        };

        const humanIntersectCheck = () => {
            let humanDistances = this.data.humans.map((human) => {
                return human.position.clone().distance(this.data.item.position);
            }),
                closestDistance = Math.min(...humanDistances);

            if(closestDistance !== 0) {
                this.data.item.position = this.data.origPosition;
            } else {
                this.data.item.shouldCleanup = true;
                this.data.item.pixiGraphic.clear();
                this._isTaken = true;
            }
        }

        agentIntersectCheck();
        humanIntersectCheck();
    }


    isDone() {
        return this._isTaken;
    }

    afterExecute() {
        this.data.item.hasAction = false;
    }
}
