/**
 * agent_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../../config/config';
import { HumanChaseOthersAction } from '../../classes/actions/human.actions';
import { ZombieChaseHumansAction } from '../../classes/actions/zombie.actions';
import {
    AgentMoveAction,
    AgentColorChangeAction,
    AgentWaitAction,
    AgentChaseAction,
    AgentChaseOthersAction,
    AgentSeekItemAction,
} from '../../classes/actions/agent.actions';
import {
    getRandomDestination,
    getRandomColor,
    objectCollision,
    getNearestItem,
} from '../helpers';

export const getAgentAction = (agent, currentItems, currentFood, currentHumans, currentZombies) => {
    let randomAction = Random.picker(['randomMove', 'seekItem', 'seekFood', 'color', 'wait', 'chaseHuman', 'chaseZombie'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'seekItem':
            return new AgentSeekItemAction({
                agent: agent,
                items: currentItems,
                affectStat: agent.toggles.hasItemPick,
                speed: agent.moveStats.currentSpeed,
            });
        case 'seekFood':
            return new AgentSeekItemAction({
                agent: agent,
                items: currentFood,
                affectStat: agent.toggles.hasEaten,
                speed: agent.moveStats.currentSpeed,
            });
        case 'chaseHuman':
            return new AgentChaseOthersAction({
                agent,
                others: currentHumans,
                speed: agent.moveStats.currentSpeed,
            });
        case 'chaseZombie':
            return new AgentChaseOthersAction({
                agent,
                others: currentZombies,
                speed: agent.moveStats.currentSpeed,
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
                speed: agent.moveStats.currentSpeed,
            });
        case 'wait':
            return new AgentWaitAction({
                agent: agent,
                time: CONFIG.bodies.agent.waitTime,
            });
    }
}
