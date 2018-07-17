/**
 * hybrid.actions.js
 */
let Victor = require('victor');

import { Action } from './action.class';
import { objectCollision } from '.../factories/helpers';

export class CheckCollisionAction extends Action {
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.hybrid.hasAction = true;
    }

    execute() {

    }

    isDone() {
        return this._isDone
    }

    afterExecute() {
        this.data.hybrid.hasAction = false;
    }
}
