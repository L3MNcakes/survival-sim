/**
 * agent_action.factory.js
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

export const getAgentAction = (agent, currentItems) => {
    let randomAction = Random.picker(['move', 'seek', 'color', 'wait'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'seek':
            return new AgentMoveAction({
                agent: agent,
                origPosition: agent.position.clone(),
                destination: getNearestItem(agent, currentItems),
                speed: CONFIG.maxSpeed
            });
        case 'color':
            return new AgentColorChangeAction({
                agent: agent,
                color: getRandomColor(),
            });
        case 'move':
            return new AgentMoveAction({
                agent: agent,
                origPosition: agent.position.clone(),
                destination: getRandomDestination(),
                speed: CONFIG.maxSpeed,
            });
        case 'wait':
            return new AgentWaitAction({
                agent: agent,
                time: CONFIG.agent.waitTime,
            });
    }
}
