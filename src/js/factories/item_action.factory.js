/**
 * item_action.factory.js
 */
 import * as Random from 'random-js';
 import { CONFIG } from '../config/config';
 import {
     ItemWaitAction,
 } from '../classes/actions/item.actions';
 import {
     getRandomDestination,
     getRandomColor,
     objectCollision,
     getNearestItem,
 } from './helpers';

export const getItemAction = (item, currentHumans) => {
    let randomAction = Random.picker(['wait'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'wait':
            return new ItemWaitAction({
                item: item,
                position: getRandomDestination(),
                time: CONFIG.item.checkInterval,
            });
    }
};
