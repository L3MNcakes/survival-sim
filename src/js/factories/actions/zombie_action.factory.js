/**
 * zombie_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../../config/config';
import {
    ZombieChaseHumansAction,
    ZombieIdleAction,
    ZombieWanderAction,
} from '../../classes/actions/zombie.actions';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction,
    AgentChaseAction,
} from '../../classes/actions/agent.actions';
import {
    getRandomDestination,
    getRandomColor,
    objectCollision,
    getNearestItem,
    getNearestAgent,
} from '../helpers';

export const getZombieAction = (zombie, currentHumans) => {
    let randomAction = Random.picker([/**'chase', 'chase', 'chase',*/ 'chaseHumans', 'wait'])(Random.engines.nativeMath);

    //if (zombie.)

    switch(randomAction) {
        case 'chaseHumans':
            return new ZombieChaseHumansAction({
                zombie,
                humans: currentHumans,
                seekRadius: CONFIG.bodies.agent.zombie.seekRadius,
                speed: zombie.moveStats.currentSpeed,
                time: CONFIG.bodies.agent.zombie.waitTime, //Used for following wait action
            });
        /**
        case 'chase':
            return new AgentChaseAction({
                agent: zombie,
                origPosition: zombie.position.clone(),
                destination: getNearestItem(zombie, currentHumans),
                speed: zombie.moveStats.currentSpeed,
            });
        **/
        case 'wander':
            return new ZombieWanderAction({
                zombie,
                origPosition: zombie.position.clone(),
                destination: getRandomDestination(),
                speed: zombie.moveStats.currentSpeed,
            });
        case 'wait':
            return new ZombieIdleAction({
                zombie,
                time: CONFIG.bodies.agent.zombie.waitTime,
            });
    }
};
