/**
 * human_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import {
    HumanChaseOthersAction,
    HumanIdleAction,
    HumanMoveAction,
    HumanAvoidOtherAction,
    HumanActionChainExample1
} from '../classes/actions/human.actions';
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
    getFurthestPosition,
} from './helpers';

export const getHumanAction = (human, currentHumans, currentZombies, currentItems) => {
    let randomAction = Random.picker(['seekItem', 'randomMove', 'groupMove', 'chainedAction'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'seekItem':
            return new HumanChaseOthersAction({
                human,
                others: currentItems,
                speed: CONFIG.bodies.agent.human.speed,
            });
        case 'avoidZombie':
            return new HumanAvoidOtherAction({
                human,
                avoid: currentZombies,
                origPosition: human.position.clone(),
                destination: getFurthestPosition(human, currentZombies),
            });
        case 'randomMove':
            return new HumanMoveAction({
                human,
                origPosition: human.position.clone(),
                destination: getRandomDestination(),
                speed: CONFIG.bodies.agent.human.speed,
            });
        case 'groupMove':
            return new HumanMoveAction({
                human,
                origPosition: human.position.clone(),
                destination: /**getNearestItem(human, currentHumans),*/ currentHumans[6].position,
                speed: CONFIG.bodies.agent.human.speed,
            });
        case "wait":
            return new HumanIdleAction({
                human,
                time: CONFIG.bodies.agent.human.waitTime,
            });
        case "chainedAction":
            return new HumanActionChainExample1({
                human,
            });
    }
};
