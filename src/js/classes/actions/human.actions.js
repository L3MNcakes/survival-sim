/**
 * human.actions.js
 */
let Victor = require('victor');

import { Action } from './action.class';
import { getActualNearestAgent } from '../../factories/helpers';

export class HumanChaseOthersAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - The human that's performing the action
                others - A list of other things to chase after
     *          speed - The speed the human chases at
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.human.hasAction = true;
    }

    execute() {
        let target = getActualNearestAgent(this.data.human, this.data.others),
            deltaVec = target.clone().subtract(this.data.human.position.clone()).normalize(),
            speedVec = new Victor(this.data.speed, this.data.speed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.human.position.clone().add(moveVec);

        if (this.data.human.position.distance(target.clone()) < this.data.human.radius) {
            this.data.human.position = target.clone()
            this._isDone = true;
        } else {
            this.data.human.position = newPos.clone();
        }
    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        this.data.human.hasAction = false;
    }
}

export class HumanIdleAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - The human that is idle
     *          time - How long to wait (in ms)
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.human.hasAction = true;
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
        this.data.human.hasAction = false;
    }
}

export class HumanMoveAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - Human object to move
     *          origPosition - A Victor object of the original position of the human
     *          destination - A Victor object of the destination to move to
     *          speed - A positive number representing the speed to move at
     *      }
     */
    constructor(data) {
        super(data);
    }

    /**
     * Tell the human it has started performing an action.
     */
    beforeExecute() {
        this.data.human.hasAction = true;
    }

    /**
     * Moves an human toward its destination
     */
    execute() {
        let deltaVec = this.data.destination.clone().subtract(this.data.origPosition).normalize(),
            speedVec = new Victor(this.data.speed, this.data.speed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.human.position.clone().add(moveVec);

        if (this.data.human.position.distance(this.data.destination) < this.data.human.radius) {
            this.data.human.position = this.data.destination.clone();
        } else {
            this.data.human.position = newPos.clone();
        }
    }

    /**
     * Done when the human's position matches the destination
     * @return {boolean}
     */
    isDone() {
        return this.data.human.position.x === this.data.destination.x
            && this.data.human.position.y === this.data.destination.y;
    }

    /**
     * Tell the human it is no longer performing an action
     */
    afterExecute() {
        this.data.human.hasAction = false;
    }
}

export class HumanAvoidOtherAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - human doing the actions
     *          avoid - group of other humans the human will avoid
     *          origPosition
     *
     *
     *
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.human.hasAction = true;
    }

    execute() {

    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        this.data.human.hasAction = false;
    }
}
