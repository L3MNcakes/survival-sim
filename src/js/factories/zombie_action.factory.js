/**
 * zombie_action.factory.js
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

export const getZombieAction = (zombie, currentHumans) => {
    let randomAction = Random.picker(['move', 'wait'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'move':
            return new AgentMoveAction({
                agent: zombie,
                origPosition: zombie.position.clone(),
                destination: getRandomDestination(),
                speed: CONFIG.agent.zombie.speed,
            });
        case 'wait':
            return new AgentWaitAction({
                agent: zombie,
                time: CONFIG.agent.zombie.waitTime,
            });
    }
};
