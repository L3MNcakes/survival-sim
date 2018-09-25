/**
 * agent.actions.js
 */
let Victor = require('victor');

import { CONFIG } from '../../config/config';
import { Action } from './action.class';
import {
    getNearestAgentInfo,
    getRandomDestination,
    objectCollision,
    getNearestAgentPosition,
} from '../../factories/helpers';

export class AgentMoveAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          agent - An Agent object to move
     *          origPosition - A Victor object of the original position of the agent
     *          destination - A Victor object of the destination to move to
     *          speed - A positive number representing the speed to move at
     *      }
     */
    constructor(data) {
        super(data);
    }

    /**
     * Tell the agent it has started performing an action.
     */
    beforeExecute() {
        this.data.agent.toggles.hasAction = true;
    }

    /**
     * Moves an agent toward its destination
     */
    execute() {
        let deltaVec = this.data.destination.clone().subtract(this.data.origPosition).normalize(),
            speedVec = new Victor(this.data.speed, this.data.speed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.agent.position.clone().add(moveVec);

        if (this.data.agent.position.distance(this.data.destination) < this.data.agent.radius) {
            this.data.agent.position = this.data.destination.clone();
        } else {
            this.data.agent.position = newPos.clone();
        }
    }

    /**
     * Done when the agent's position matches the destination
     * @return {boolean}
     */
    isDone() {
        return this.data.agent.position.x === this.data.destination.x
            && this.data.agent.position.y === this.data.destination.y;
    }

    /**
     * Tell the agent it is no longer performing an action
     */
    afterExecute() {
        this.data.agent.toggles.hasAction = false;
    }
}

export class AgentWaitAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          agent - The agent that is waiting
     *          time - How long to wait (in ms)
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.agent.toggles.hasAction = true;
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
        this.data.agent.toggles.hasAction = false;
    }
}

export class AgentColorChangeAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          agent - An agent to change colors
     *          color - Color to change to
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.agent.toggles.hasAction = true;
        this.executeOnce = false;
    }

    /**
     * Changes the agent's color
     */
    execute() {
        this.data.agent.color = this.data.color;
        this.executeOnce = true;
    }

    /**
     * Done when it's been executed once
     * @returns {boolean}
     */
    isDone() {
        return this.executeOnce;
    }

    afterExecute() {
        this.data.agent.toggles.hasAction = false;
    }
}

//Chasing Other Agents
export class AgentChaseOthersAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          agent - The agent that's performing the action
                others - A list of other things to chase after
                affectStat - The stat that is affected if action is successful
     *          speed - The speed the agent chases at
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.agent.toggles.hasEaten = false;
        this.data.agent.toggles.hasAction = true;
    }

    execute() {
        let target = getNearestAgentPosition(this.data.agent, this.data.others),
            targetInfo = getNearestAgentInfo(this.data.agent, this.data.others),
            deltaVec = target.clone().subtract(this.data.agent.position.clone()).normalize(),
            speedVec = new Victor(this.data.agent.moveStats.currentSpeed, this.data.agent.moveStats.currentSpeed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.agent.position.clone().add(moveVec);

        if (this.data.agent.position.distance(target.clone()) < this.data.agent.radius) {
            this.data.agent.position = target.clone()
            this._isDone = true;
            this.data.agent.info.killedList.push(targetInfo);
        } else {
            this.data.agent.position = newPos.clone();
        }
    }

    isDone() {
        return this._isDone;
    }

    nextAction() {
        //return new AgentCheckInteractAction(this.data);
    }

    afterExecute() {
        this.data.agent.toggles.hasKilled = true;
        this.data.agent.toggles.hasAction = false;
    }
}

//"Chasing" Item
export class AgentSeekItemAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          agent - The agent that's performing the action
     *          items - A list of items to chase after
     *          affectStat - The stat that is affected if action is successful
     *          speed - The speed the agent chases at
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.affectStat = false;
        this.data.agent.toggles.hasAction = true;
    }

    execute() {
        let target = getNearestAgentPosition(this.data.agent, this.data.items),
            targetInfo = getNearestAgentInfo(this.data.agent, this.data.items),
            deltaVec = target.clone().subtract(this.data.agent.position.clone()).normalize(),
            speedVec = new Victor(this.data.agent.moveStats.currentSpeed, this.data.agent.moveStats.currentSpeed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.agent.position.clone().add(moveVec);

        if (!targetInfo.toggles.isTaken || !targetInfo.toggles.isSought) { /**isSought not working? -- still go after same item till gone**/
            if (this.data.agent.position.distance(target.clone()) < this.data.agent.radius) {
                this.data.agent.position = target.clone()
                this._isDone = true;
                this.data.affectStat = true;
                //this.data.agent.hasKilled.push(targetInfo);
            } else {
                targetInfo.toggles.isSought = true;
                this.data.agent.position = newPos.clone();
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
        this.data.agent.toggles.hasAction = false;
    }
}

//Not used -- (nextAction)
export class AgentCheckInteractAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          agent - The agent that's performing the action
     *          others - A list of other things to chase after
     *      }
     */
    constructor(data) {
        super(data);

        this._isDone = false;
    }

    beforeExecute() {
        this.data.agent.toggles.hasAction = true;
    }

    execute() {
        let target = getNearestAgentPosition(this.data.agent, this.data.others);

        if (this.data.agent.position == getNearestAgentPosition(this.data.agent, this.data.others)) {
            //this.data.agent.has__Eaten = true;
        }

        this._isDone = true;
        /**
        let target = getNearestAgentPosition(this.data.agent, this.data.others),
            deltaVec = target.clone().subtract(this.data.agent.position.clone()).normalize(),
            speedVec = new Victor(this.data.moveStats.currentSpeed, this.data.moveStats.currentSpeed),
            moveVec = deltaVec.clone().multiply(speedVec),
            newPos = this.data.agent.position.clone().add(moveVec);

        if (this.data.agent.position.distance(target.clone()) < this.data.agent.radius) {
            this.data.agent.position = target.clone()
            this._isDone = true;
        } else {
            this.data.agent.position = newPos.clone();
        }
        */
    }

    isDone() {
        return this._isDone;
    }

    nextAction() {

    }

    afterExecute() {
        this.data.agent.toggles.hasAction = false;
    }
}

export class AgentSeekItemAction_old extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *
     *
     *      }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.agent.toggles.hasAction = true;
    }

    execute() {
        let updateDest = () => {
            let deltaVec = this.data.destination.clone().subtract(this.data.origPosition).normalize(),
                speedVec = new Victor(this.data.speed, this.data.speed),
                moveVec = deltaVec.clone().multiply(speedVec),
                newPos = this.data.agent.position.clone().add(moveVec);

            if (this.data.agent.position.distance(this.data.destination) < this.data.agent.radius) {
                this.data.agent.position = this.data.destination.clone();
            } else {
                this.data.agent.position = newPos.clone();
            }
            //console.log(this.data.destination);
        }

        updateDest();
    }

    isDone() {
        //return this._isDone;
        return this.data.agent.position.x === this.data.destination.x
            && this.data.agent.position.y === this.data.destination.y;
    }

    afterExecute() {
        this.data.agent.toggles.hasAction = false;
    }
}

export class AgentAvoidAction extends Action {
    /**
     * Constructor
     * @param {Object} data -
     *      {
     *          agent - agent doing the actions
     *          avoid - group of other agents the agent will avoid
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
        this.data.agent.toggles.hasAction = true;
    }

    execute() {

    }

    isDone() {
        return this._isDone;
    }

    afterExecute() {
        this.data.agent.toggles.hasAction = false;
    }
}
