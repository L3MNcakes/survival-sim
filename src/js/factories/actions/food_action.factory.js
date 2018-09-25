/*
 * food_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../../config/config';
import {
    FoodWaitAction,
    FoodInteractAction,
} from '../../classes/actions/food.actions';
import {
    getRandomDestination,
    getRandomColor,
    objectCollision,
    getNearestItem,
    takeItem,
} from '../helpers';

export const getFoodAction = (food, currentHumans, currentAgents) => {
    let randomAction = Random.picker(['taken'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'wait':
            return new FoodWaitAction({
                food,
                time: CONFIG.bodies.item.checkInterval,
            });
        case 'taken':
            return new FoodInteractAction({
                food,
                agents: currentAgents,
                humans: currentHumans,
                origPosition: food.position.clone(),
            });
    }
};
