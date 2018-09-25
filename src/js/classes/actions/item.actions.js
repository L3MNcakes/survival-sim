/**
 * item.actions.js
 */
let Victor = require('victor');

import { CONFIG } from '../../config/config';
import { Action } from './action.class';
import { generateRandomItems } from '../../factories/item.factory';
import {
    getNearestAgentPosition,
    getRandomDestination,
    objectCollision,
    getNearestAgentInfo,
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
        this.data.item.toggles.hasAction = true;
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
        this.data.item.toggles.hasAction = false;
    }
}

export class ItemInteractAction extends Action {
    /*
     * Constructor
     * @param {Object} data -
     *          {
     *              item - item waiting to interact
     *              nextItem - Nearest item to get other agents re-directed (test)
     *              agents - checking these agents for interaction
     *              humans - checking these humans for interaction
     *              origPosition - the item's position
     *          }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.item.toggles.hasAction = true;
        this._isTaken = false;
    }

    execute() {
        const intersectCheck = () => {
            let agentDistances = this.data.agents.map((agent) => {
                    return agent.position.clone().distance(this.data.item.position);
                }),
                humanDistances = this.data.humans.map((human) => {
                    return human.position.clone().distance(this.data.item.position);
                }),
                closestAgentDistance = Math.min(...agentDistances),
                closestAgentInfo = getNearestAgentInfo(this.data.item, this.data.agents),
                closestHumanDistance = Math.min(...humanDistances),
                closestHumanInfo = getNearestAgentInfo(this.data.item, this.data.humans);

            if (closestAgentDistance !== 0 && closestHumanDistance !== 0) {
                this.data.item.position = this.data.origPosition;
                this.data.item.toggles.isTaken = false;
                this._isTaken = false;
            } else if (closestAgentDistance == 0) {
                this.data.item.toggles.isTaken = true;
                this.data.item.info.taker = getNearestAgentInfo(this.data.item, this.data.agents);
                //this.data.item.info.taker.toggles.hasItemPick = true;
                this.data.item.info.taker.info.itemList.push(this.data.item);
                this._isTaken = true;
            } else {
                this.data.item.toggles.isTaken = true;
                this.data.item.info.taker = getNearestAgentInfo(this.data.item, this.data.humans);
                //this.data.item.info.taker.toggles.hasItemPick = true;
                this.data.item.info.taker.info.itemList.push(this.data.item);
                this._isTaken = true;

            }
        };

        intersectCheck();
        /**
        const agentIntersectCheck = () => {
            let agentDistances = this.data.agents.map((agent) => {
                return agent.position.clone().distance(this.data.item.position);
            }),
                closestDistance = Math.min(...agentDistances);

            if(closestDistance !== 0) {
                this.data.item.position = this.data.origPosition;
            } else {
                this.data.item.taker = getNearestAgentInfo(this.data.item, this.data.agents);
                this.data.item.taker.hasEaten = true;
                this.data.item.taker.takenList.push(this.data.item);
                //this.data.item.shouldCleanup = true;
                //this.data.item.pixiGraphic.clear();
                this._isTaken = true;
                //console.log(this.data.item.taker);
            }
        };

        const humanIntersectCheck = () => {
            let humanDistances = this.data.humans.map((human) => {
                return human.position.clone().distance(this.data.item.position);
            }),
                closestDistance = Math.min(...humanDistances),
                taker = null;

            if(closestDistance !== 0) {
                this.data.item.position = this.data.origPosition;
            } else {
                this.data.item.taker = getNearestAgentInfo(this.data.item, this.data.humans);
                this.data.item.taker.hasEaten = true;
                this.data.item.taker.takenList.push(this.data.item);
                //this.data.item.shouldCleanup = true;
                //this.data.item.pixiGraphic.clear();
                this._isTaken = true;
            }
        }

        agentIntersectCheck();
        humanIntersectCheck();
        */
    }


    isDone() {
        return this._isTaken;
    }

    afterExecute() {
        this.data.item.toggles.shouldCleanup = true;
        //this.data.item.pixiGraphic.clear();
        this.data.item.toggles.hasAction = false;
    }
}
