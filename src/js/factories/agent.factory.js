/**
 * agent.factory.js
 */
import { Agent } from '../classes/agent.class';
import { Charmander } from '../classes/charmander.class';
import { randomPosition } from './helpers';

export const generateRandomAgents = (
        num,
        posMaxX,
        posMaxY,
        color,
        radius
    ) => {
        let agents = [];

        for (let i = 0; i < num; i++) {
            agents.push(new Agent(
                randomPosition(posMaxX, posMaxY),
                color,
                radius
            ));
        }

        return agents;
    };
