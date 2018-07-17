/**
 * item.actions.js
 */
let Victor = require('victor');

import { Action } from './action.class';
//import { objectCollision } from '.../factories/helpers';

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
