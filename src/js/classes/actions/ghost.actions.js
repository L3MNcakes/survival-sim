/**
 * ghost.actions.js
 */
let Victor = require('victor');

import { CONFIG } from '../../config/config';
import { Action } from './action.class';

export class GhostHumanGroupAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          ghost - A ghost!!!!
     *
     *
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.ghost.hasAction = true;
        this._isDone = false;
    }

    execute() {


        this._isDone = true;
    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        this.data.ghost.hasAction = false;
    }
}
