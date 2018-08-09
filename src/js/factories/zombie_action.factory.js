/**
 * zombie_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import {
    ZombieChaseHumansAction,
    ZombieIdleAction,
    ZombieWanderAction,
} from '../classes/actions/zombie.actions';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction,
    AgentChaseAction,
} from '../classes/actions/agent.actions';
import {
    getRandomDestination,
    getRandomColor,
    objectCollision,
    getNearestItem,
    getNearestAgent,
} from './helpers';

export const getZombieAction = (zombie, currentHumans) => {
    let randomAction = Random.picker([/**'chase', 'chase', 'chase',*/ 'chaseHumans', 'wait'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'chaseHumans':
            return new ZombieChaseHumansAction({
                zombie,
                humans: currentHumans,
                speed: CONFIG.bodies.agent.zombie.speed,
            });
        case 'chase':
            return new AgentChaseAction({
                agent: zombie,
                origPosition: zombie.position.clone(),
                destination: getNearestItem(zombie, currentHumans),
                speed: CONFIG.bodies.agent.zombie.speed,
            });
        case 'wander':
            return new ZombieWanderAction({
                zombie,
                origPosition: zombie.position.clone(),
                destination: getRandomDestination(),
                speed: CONFIG.bodies.agent.zombie.speed,
            });
        case 'wait':
            return new ZombieIdleAction({
                zombie,
                time: CONFIG.bodies.agent.zombie.waitTime,
            });
    }
};
