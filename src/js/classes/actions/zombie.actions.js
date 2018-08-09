/**
 * zombie.actions.js
 */
let Victor = require('victor');

import { Action } from './action.class';
import { getActualNearestAgent } from '../../factories/helpers';

/**
 * This action will allow a zombie to chase after the nearest human it can find.
 */
export class ZombieChaseHumansAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          zombie - The zombie that's performing the action
                humans - A list of humans to chase after
     *          speed - The speed the zombie chases at
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.zombie.hasAction = true;
    }

    execute() {
        let target = getActualNearestAgent(this.data.zombie, this.data.humans),
            deltaVec = target.clone().subtract(this.data.zombie.position.clone()).normalize(),
            speedVec = new Victor(this.data.speed, this.data.speed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.zombie.position.clone().add(moveVec);

        if (this.data.zombie.position.distance(target.clone()) < this.data.zombie.radius) {
            this.data.zombie.position = target.clone()
            this._isDone = true;
        } else {
            this.data.zombie.position = newPos.clone();
        }
    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        this.data.zombie.hasAction = false;
    }
}

export class ZombieIdleAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          zombie - The zombie that is waiting
     *          time - How long to wait (in ms)
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.zombie.hasAction = true;
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
        this.data.zombie.hasAction = false;
    }
}

export class ZombieWanderAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          zombie - An zombie object to wander
     *          origPosition - A Victor object of the original position of the zombie
     *          destination - A Victor object of the destination to move to
     *          speed - A positive number representing the speed to move at
     *      }
     */
    constructor(data) {
        super(data);
    }

    /**
     * Tell the zombie it has started performing an action.
     */
    beforeExecute() {
        this.data.zombie.hasAction = true;
    }

    /**
     * Moves an zombie toward its destination
     */
    execute() {
        let deltaVec = this.data.destination.clone().subtract(this.data.origPosition).normalize(),
            speedVec = new Victor(this.data.speed, this.data.speed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.zombie.position.clone().add(moveVec);

        if (this.data.zombie.position.distance(this.data.destination) < this.data.zombie.radius) {
            this.data.zombie.position = this.data.destination.clone();
        } else {
            this.data.zombie.position = newPos.clone();
        }
    }

    /**
     * Done when the zombie's position matches the destination
     * @return {boolean}
     */
    isDone() {
        return this.data.zombie.position.x === this.data.destination.x
            && this.data.zombie.position.y === this.data.destination.y;
    }

    /**
     * Tell the zombie it is no longer performing an action
     */
    afterExecute() {
        this.data.zombie.hasAction = false;
    }
}
