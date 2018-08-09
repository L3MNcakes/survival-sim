/**
 * agent_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { HumanChaseOthersAction } from '../classes/actions/human.actions';
import { ZombieChaseHumansAction } from '../classes/actions/zombie.actions';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction,
    AgentChaseAction,
    AgentChaseOthersAction,
} from '../classes/actions/agent.actions';
import {
    getRandomDestination,
    getRandomColor,
    objectCollision,
    getNearestItem,
} from './helpers';

export const getAgentAction = (agent, currentItems, currentHumans, currentZombies) => {
    let randomAction = Random.picker(['randomMove', 'seekItem', 'color', 'wait', 'chaseHuman', 'chaseZombie'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'seekItem':
            return new AgentChaseOthersAction({
                agent: agent,
                others: currentItems,
                speed: CONFIG.bodies.agent.speed,
            });
        case 'chaseHuman':
            return new AgentChaseOthersAction({
                agent,
                others: currentHumans,
                speed: CONFIG.bodies.agent.speed,
            });
        case 'chaseZombie':
            return new AgentChaseOthersAction({
                agent,
                others: currentZombies,
                speed: CONFIG.bodies.agent.speed,
            });
        case 'color':
            return new AgentColorChangeAction({
                agent: agent,
                color: getRandomColor(),
            });
        case 'randomMove':
            return new AgentMoveAction({
                agent: agent,
                origPosition: agent.position.clone(),
                destination: getRandomDestination(),
                speed: CONFIG.bodies.agent.speed,
            });
        case 'wait':
            return new AgentWaitAction({
                agent: agent,
                time: CONFIG.bodies.agent.waitTime,
            });
    }
}
