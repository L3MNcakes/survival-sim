/**
 * human_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction
} from '../classes/actions/agent.actions';
import {
    getRandomDestination,
    getRandomColor,
    objectCollision,
    getNearestItem,
} from './helpers';

export const getHumanAction = (human, currentItems) => {
    let randomAction = Random.picker(['seekItem', 'randomMove', 'wait'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'seekItem':
            return new AgentMoveAction({
                agent: human,
                origPosition: human.position.clone(),
                destination: getNearestItem(human, currentItems),
                speed: CONFIG.agent.human.speed,
            });
        case 'randomMove':
            return new AgentMoveAction({
                agent: human,
                origPosition: human.position.clone(),
                destination: getRandomDestination(),
                speed: CONFIG.agent.human.speed,
            });
        case "wait":
            return new AgentWaitAction({
                agent: human,
                time: CONFIG.agent.human.waitTime,
            });
    }
};
