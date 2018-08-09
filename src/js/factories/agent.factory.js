/**
 * agent.factory.js
 */
import { Bodies } from '../classes/bodies.class';
import { Agent } from '../classes/agent.class';
import { Charmander } from '../classes/charmander.class';
import { Human } from '../classes/human.class';
import { Zombie } from '../classes/zombie.class';
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
            agents.push(new Agent( //new Charmander()
                randomPosition(posMaxX, posMaxY),
                color,
                radius
            ));
        }

        return agents;
    };

export const generateRandomHumans = (
        num,
        posMaxX,
        posMaxY,
        color,
        radius
    ) => {
        let humans = [];

        for (let i = 0; i < num; i++) {
            humans.push(new Human(
                randomPosition(posMaxX, posMaxY),
                color,
                radius
            ));
        }

        return humans;
    };

    export const generateRandomZombies = (
            num,
            posMaxX,
            posMaxY,
            color,
            radius
        ) => {
            let zombies = [];

            for (let i = 0; i < num; i++) {
                zombies.push(new Zombie(
                    randomPosition(posMaxX, posMaxY),
                    color,
                    radius
                ));
            }

            return zombies;
        };
