/**
 * item_action.factory.js
 */
 import * as Random from 'random-js';
 import { CONFIG } from '../config/config';
 import {
     ItemWaitAction,
     ItemInteractAction,
 } from '../classes/actions/item.actions';
 import {
     getRandomDestination,
     getRandomColor,
     objectCollision,
     getNearestItem,
     takeItem,
 } from './helpers';

export const getItemAction = (item, currentHumans, currentAgents) => {
    let randomAction = Random.picker(['taken'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'wait':
            return new ItemWaitAction({
                item,
                time: CONFIG.bodies.item.checkInterval,
            });
        case 'taken':
            return new ItemInteractAction({
                item,
                agents: currentAgents,
                humans: currentHumans,
                origPosition: item.position.clone(),
            });
    }
};
