/*
 * weapon.actions.js
 */
let Victor = require('victor');

import { CONFIG } from '../../config/config';
import { Action } from './action.class';
import {
    getNearestAgentPosition,
    getNearestAgentInfo,
} from '../../factories/helpers';

export class WeaponInteractAction extends Action {
    /*
     * Constructor
     * @param {Object} data -
     *          {
     *              weapon - weapon waiting to interact
     *              agents - checking these agents for interaction
     *              humans - checking these humans for interaction
     *              origPosition - the weapon's position
     *          }
     */
    constructor(data) {
        super(data);
    }

    beforeExecute() {
        this.data.weapon.toggles.hasAction = true;
        this._isTaken = false;
    }

    execute() {
        const intersectCheck = () => {
            let agentDistances = this.data.agents.map((agent) => {
                    return agent.position.clone().distance(this.data.weapon.position);
                }),
                humanDistances = this.data.humans.map((human) => {
                    return human.position.clone().distance(this.data.weapon.position);
                }),
                closestAgentDistance = Math.min(...agentDistances),
                closestHumanDistance = Math.min(...humanDistances);

            if (closestAgentDistance !== 0 && closestHumanDistance !== 0) {
                this.data.weapon.position = this.data.origPosition;
                this.data.weapon.toggles.isTaken = false;
                this._isTaken = false;
            } else if (closestAgentDistance == 0) {
                this.data.weapon.toggles.isTaken = true;
                this.data.weapon.info.taker = getNearestAgentInfo(this.data.weapon, this.data.agents);
                this.data.weapon.info.taker.toggles.hasEaten = true;
                this.data.weapon.info.taker.eatenList.push(this.data.weapon); //equipList
                this._isTaken = true;
            } else {
                this.data.toggles.weapon.isTaken = true;
                this.data.weapon.info.taker = getNearestAgentInfo(this.data.weapon, this.data.humans);
                this.data.weapon.info.taker.toggles.hasEaten = true;
                this.data.weapon.info.taker.eatenList.push(this.data.weapon);
                this._isTaken = true;
            }
        };

        intersectCheck();
    }


    isDone() {
        return this._isTaken;
    }

    afterExecute() {
        this.data.weapon.toggles.shouldCleanup = true;
        //this.data.weapon.pixiGraphic.clear();
        this.data.weapon.toggles.hasAction = false;
    }
}
