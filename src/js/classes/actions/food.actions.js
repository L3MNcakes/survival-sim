/*
 * food.actions.js
 */
let Victor = require('victor');

import { CONFIG } from '../../config/config';
import { Action } from './action.class';
import {
    getNearestAgentPosition,
    getNearestAgentInfo,
} from '../../factories/helpers';

 export class FoodWaitAction extends Action {
     /**
      * Constructor
      * @param {Object} data -
      *      {
      *          food - The food that is waiting
      *          agent - The agent that is colliding
      *          time - How often they check (in MS)
      *      }
      */
     constructor(data) {
         super(data);
     }

     beforeExecute() {
         this.data.food.toggles.hasAction = true;
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
         this.data.food.hasAction = false;
     }
 }

 export class FoodInteractAction extends Action {
     /*
      * Constructor
      * @param {Object} data -
      *          {
      *              food - food waiting to interact
      *              agents - checking these agents for interaction
      *              humans - checking these humans for interaction
      *              origPosition - the food's position
      *          }
      */
     constructor(data) {
         super(data);
     }

     beforeExecute() {
         this.data.food.toggles.hasAction = true;
         this._isTaken = false;
     }

     execute() {
         const intersectCheck = () => {
             let agentDistances = this.data.agents.map((agent) => {
                     return agent.position.clone().distance(this.data.food.position);
                 }),
                 humanDistances = this.data.humans.map((human) => {
                     return human.position.clone().distance(this.data.food.position);
                 }),
                 closestAgentDistance = Math.min(...agentDistances),
                 closestHumanDistance = Math.min(...humanDistances);

             if (closestAgentDistance !== 0 && closestHumanDistance !== 0) {
                 this.data.food.position = this.data.origPosition;
                 this.data.food.toggles.isTaken = false;
                 this._isTaken = false;

                 /**
                 if (this.surviveTick) {
                     setTimeout(() => {
                         this._isTaken = true;
                     }, 2000);
                 }
                 **/
             } else if (closestAgentDistance == 0 && this.data.isTaken) {
                 //this.data.food.isTaken = true;
                 this.data.food.info.taker = getNearestAgentInfo(this.data.food, this.data.agents);
                 this.data.food.info.taker.toggles.hasEaten = true;
                 this.data.food.info.taker.eatenList.push(this.data.food);
                 this._isTaken = true;
             } else if (this.data.food.toggles.isTaken) {
                 this._isTaken = true;
             } else {
                 this.data.food.toggles.isTaken = true;
                 this.data.food.info.taker = getNearestAgentInfo(this.data.food, this.data.humans);
                 this.data.food.info.taker.toggles.hasEaten = true;
                 this.data.food.info.taker.info.eatenList.push(this.data.food);
                 this._isTaken = true;
             }
         };

         intersectCheck();

         /**
         const agentIntersectCheck = () => {
             let agentDistances = this.data.agents.map((agent) => {
                 return agent.position.clone().distance(this.data.food.position);
             }),
                 closestDistance = Math.min(...agentDistances);

             if(closestDistance !== 0) {
                 this.data.food.position = this.data.origPosition;
             } else {
                 this.data.food.shouldCleanup = true;
                 this.data.food.pixiGraphic.clear();
                 this._isTaken = true;
             }
         };

         const humanIntersectCheck = () => {
             let humanDistances = this.data.humans.map((human) => {
                 return human.position.clone().distance(this.data.food.position);
             }),
                 closestDistance = Math.min(...humanDistances);

             if(closestDistance !== 0) {
                 this.data.food.position = this.data.origPosition;
             } else {
                 this.data.food.shouldCleanup = true;
                 this.data.food.pixiGraphic.clear();
                 this._isTaken = true;
             }
         }

         agentIntersectCheck();
         humanIntersectCheck();
         **/
     }


     isDone() {
         return this._isTaken;
     }

     afterExecute() {
         this.data.food.toggles.shouldCleanup = true;
         //this.data.food.pixiGraphic.clear();
         this.data.food.toggles.hasAction = false;
     }
 }
