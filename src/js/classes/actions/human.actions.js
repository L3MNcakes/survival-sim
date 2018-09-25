/**
 * human.actions.js
 */
let Victor = require('victor');

import { Action } from './action.class';
import {
    getNearestAgentPosition,
    getNearestAgentInfo,
    getRandomDestination,
} from '../../factories/helpers';
import { spawnZombie } from '../../factories/agent.factory';

export class HumanChaseOthersAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - The human that's performing the action
     *          others - A list of other things to chase after
     *          speed - The speed the human chases at
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.human.toggles.hasAction = true;
    }

    execute() {
        let target = getNearestAgentPosition(this.data.human, this.data.others),
            targetInfo = getNearestAgentInfo(this.data.human, this.data.others),
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

    nextAction() {

    }

    afterExecute() {
        this.data.human.toggles.hasAction = false;
    }

}

export class HumanSeekItemAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - The human that's performing the action
     *          items - A list of items to chase after
     *          affectStat - The stat that is affected if action is successful
     *          affectList - The 'list' for the agent to be added to (EX: killList)
     *          avRadius - Radius human uses to avoid other agents (used to find items not near zombie)
     *          avList - List of agents to avoid
     *          speed - The speed the human chases at
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.affectStat = false;
        this.data.human.toggles.hasAction = true;
    }

    execute() {
        let target = getNearestAgentPosition(this.data.human, this.data.items),
            targetInfo = getNearestAgentInfo(this.data.human, this.data.items),
            trueTarget = targetInfo,
            _avoidTarget = this.data.avList,
            _avoidRadius = this.data.avRadius,
            deltaVec = target.clone().subtract(this.data.human.position.clone()).normalize(),
            speedVec = new Victor(this.data.human.moveStats.currentSpeed, this.data.human.moveStats.currentSpeed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.human.position.clone().add(moveVec);

        if (!targetInfo.toggles.isTaken && !targetInfo.toggles.isSought && target.distance(getNearestAgentPosition(this.data.human, _avoidTarget)) > _avoidRadius) {
            targetInfo.tests.seekerAgent = this.data.human;
            trueTarget = targetInfo;
            trueTarget.tests.seekerAgent = this.data.human;
            trueTarget.toggles.isSought = true;

            /**
            if (this.data.human.position.distance(target.clone()) < this.data.human.radius) {
                this.data.human.position = target.clone();
                targetInfo.toggles.isTaken = true;
                this._isDone = true;
                this.data.affectStat = true;
                //this.data.agent.hasKilled.push(targetInfo);
            } else {
                targetInfo.toggles.isSought = true;
                this.data.human.position = newPos.clone();
            }
            **/
        } else if (targetInfo.toggles.isSought && !targetInfo.toggles.isTaken) {
            if (targetInfo.tests.seekerAgent == this.data.human) {
                trueTarget = targetInfo;
                target = trueTarget.position;

                if (this.data.human.position.distance(target.clone()) < this.data.human.radius) {
                    this.data.human.position = target.clone();
                    //trueTarget.toggles.isTaken = true;
                    this.data.affectStat = true;
                    this.data.affectList.push(trueTarget);
                    //console.log(`I (${this.data.human.info.type}) just did something - AffectStat - ${this.data.affectStat} -- Affect List ${this.data.affectList}`)
                    this._isDone = true;
                } else {
                    trueTarget.toggles.isSought = true;
                    this.data.human.position = newPos.clone();
                }

            } else if (trueTarget.tests.seekerAgent == this.data.human && !targetInfo.toggles.isTaken) {
                target = trueTarget.position;

                if (this.data.human.position.distance(target.clone()) < this.data.human.radius) {
                    this.data.human.position = target.clone();
                    //trueTarget.toggles.isTaken = true;
                    this.data.affectStat = true;
                    this.data.affectList.push(trueTarget);
                    //console.log(`I (${this.data.human.info.type}) just did something - AffectStat - ${this.data.affectStat} -- Affect List ${this.data.affectList}`)
                    this._isDone = true;
                } else {
                    trueTarget.toggles.isSought = true;
                    this.data.human.position = newPos.clone();
                }
            } else {
                this._isDone = true;
            }
        } else {
            this._isDone = true;
        }


    }

    isDone() {
        return this._isDone;
    }

    nextAction() {
        //return new AgentCheckInteractAction(this.data);
    }

    afterExecute() {
        this.data.human.toggles.hasAction = false;
    }
}

export class HumanDyingAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - The human that is idle
     *          dyingColor - color human turns while dying
     *          zombies - zombie list the human is added to after dying
     *          time - How long to wait (in ms)
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.human.toggles.hasAction = true;
        this.data.human.toggles.isDead = false;
        this._isDone = false;
        this._hasTimeout = false;
    }

    execute() {

        this.data.human.color = this.data.dyingColor;

        if (!this._hasTimeout) {
            setTimeout(() => {
                if (this.data.human.info.taker == 'zombie') {
                    this.data.human.pixiGraphic.clear();
                    this.data.human.toggles.respawn = true;
                } else if (this.data.human.info.taker == 'hunger') {
                    this.data.human.pixiGraphic.clear();
                    this.data.human.toggles.respawn = false;
                    this.data.human.toggles.isDead = true;
                } else {
                    console.log(`I don't know what killed me... ${this.data.human} - ${this.data.human.info.taker}`)
                    this.data.human.toggles.isDead = true;
                }

                this._isDone = true;
            }, this.data.time);

            this._hasTimeout = true;
        }




    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        //this.data.human.toggles.hasAction = false;
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
        this.data.human.toggles.hasAction = true;
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
        this.data.human.toggles.hasAction = false;
    }
}

export class HumanMoveAction extends Action {
    /**}
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
        this.data.human.toggles.hasAction = true;
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
        this.data.human.toggles.hasAction = false;
    }
}

export class HumanAvoidOtherAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          human - human doing the actions
     *          avoidOthers - group of others the human will avoid
     *          avoidRadius - area around the human they will avoid others in
     *          allowedArea - restriction of where the human can run
     *          speed - speed the human avoids (possibly add running)
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.human.hasAction = true;

        if (!this.data.human.toggles.isAvoiding) {
            this.data.human.toggles.isSought = false;
        }
    }

    execute() {
        // Moves off canvas (expected), need to set movement border
        let target = getNearestAgentPosition(this.data.human, this.data.avoidOthers),
            targetInfo = getNearestAgentInfo(this.data.human, this.data.avoidOthers),
            travelBorder = this.data.allowedArea,
            deltaVec = target.clone().add(this.data.human.position.clone()).normalize(), /**Add instead of subtract -- only really run bottom-right**/
            speedVec = new Victor(this.data.speed, this.data.speed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.human.position.clone().add(moveVec);

        if (!this.data.human.toggles.isSought && this.data.human.position.distance(target.clone()) > this.data.avoidRadius) {
            this._isDone = true;
        } else {
            if (this.data.human.position.distance(target.clone()) < this.data.avoidRadius) {
                //this.data.human.isSought = true;
                this.data.human.toggles.isAvoiding = true;
                //console.log(`I am avoiding -- AvoidStatus ${this.data.human.isAvoiding} - SoughtStatus ${this.data.human.isSought}`);
                this.data.human.position = newPos.clone();
            } else {
                this.data.human.toggles.isAvoiding = false;
                this.data.human.toggles.isSought = false;
                //console.log(`I am no longer avoiding -- AvoidStatus ${this.data.human.isAvoiding} - SoughtStatus ${this.data.human.isSought}`)
                //this.data.human.position = getRandomDestination();
                this._isDone = true;
                /**
                if (this.data.human.position == newPos.clone()) {
                    this._isDone = true;
                }
                **/
            }
        }
    }

    isDone() {
        return this._isDone;
    }

    nextAction() {

    }

    afterExecute() {
        this.data.human.toggles.hasAction = false;
    }
}

export class HumanActionChainExample1 extends Action {
    /**
     * Constructor
     * @param {Object} data - {
     *      human - the human performing the action
     * }
     */
    constructor(data) {
        super(data);
        this.data.human.toggles.hasAction = true;
        this._isDone = false;
        this._hasTimeout = false;
    }

    execute() {
        if (!this._hasTimeout) {
            console.log("Waiting 5 seconds for first action...");

            setTimeout(() => {
                this._isDone = true;
            }, 5000);

            this._hasTimeout = true;
        }
    }

    isDone() {
        return this._isDone;
    }

    nextAction() {
        return new HumanActionChainExample2(this.data);
    }
}

export class HumanActionChainExample2 extends Action {
    /**
     * Constructor
     * @param {Object} data - {
     *      human - the human performing the action
     * }
     */
    constructor(data) {
        super(data);
        this._isDone = false;
        this._hasTimeout = false;
    }

    execute() {
        if (!this._hasTimeout) {
            console.log("Waiting 5 seconds for second action...");

            setTimeout(() => {
                this._isDone = true;
            }, 5000);

            this._hasTimeout = true;
        }
    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        this.data.human.toggles.hasAction = false;
    }
}
