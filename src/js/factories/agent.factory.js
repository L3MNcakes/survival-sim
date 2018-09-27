/**
 * agent.factory.js
 */
import { Bodies } from '../classes/bodies.class';
import { Agent } from '../classes/agent.class';
import { Charmander } from '../classes/charmander.class';
import { Human } from '../classes/human.class';
import { Zombie } from '../classes/zombie.class';
import { Dead } from '../classes/dead.class';
import {
    randomPosition,
    fixedPosition,
} from './helpers';

export const generateRandomAgents = (
        num,
        posMaxX,
        posMaxY,
        color,
        radius,
        //stats,
    ) => {
        let agents = [],
            _assNum = 0;

        for (let i = 0; i < num; i++) {
            let agent = new Agent( //new Charmander()
                    randomPosition(posMaxX, posMaxY),
                    color,
                    radius,
                    //stats,
                );

            _assNum += 1;
            agent.setMoveStats();
            //agent.info.type += _assNum;
            agents.push(agent);
        }

        return agents;
    };

export const generateRandomHumans = (
        num,
        posMaxX,
        posMaxY,
        color,
        radius,
        //stats,
    ) => {
        let humans = [],
            _assNum = 0;

        for (let i = 0; i < num; i++) {
            let human = new Human(
                randomPosition(posMaxX, posMaxY),
                color,
                radius,
                //stats,
            );
            _assNum += 1;
            human.setMoveStats();
            //human.info.type += _assNum;
            humans.push(human);
        }

        return humans;
    };

export const generateOneHuman = (
        maxX,
        maxY,
        color,
        radius,
        //stats,
    ) => {
        let human = new Human(
            randomPosition(maxX, maxY),
            color,
            radius,
            //stats,
        );

        human.setMoveStats();
        return human;
    };

export const generateRandomZombies = (
        num,
        posMaxX,
        posMaxY,
        color,
        radius,
        //stats,
    ) => {
        let zombies = [],
            _assNum = 0;

        for (let i = 0; i < num; i++) {
            let zombie = new Zombie(
                randomPosition(posMaxX, posMaxY),
                color,
                radius,
                //stats,
            );
            _assNum += 1;
            zombie.setMoveStats();
            //zombie.info.type += _assNum;
            zombies.push(zombie);
        }

        return zombies;
    };

export const generateOneZombie = (
        maxX,
        maxY,
        color,
        radius,
        //stats,
    ) => {
        let zombie = new Zombie(
            randomPosition(maxX, maxY),
            color,
            radius,
            //stats,
        );

        zombie.setMoveStats();
        return zombie;
    };

export const spawnZombie = (
        posX,
        posY,
        color,
        radius,
        //stats,
    ) => {
        let zombie = new Zombie(
            fixedPosition(posX, posY),
            color,
            radius,
            //stats,
        );

        zombie.setMoveStats();
        return zombie;
    };

export const spawnDead = (
        posX,
        posY,
        color,
        radius,
    ) => {
        let dead = new Dead(
            fixedPosition(posX, posY),
            color,
            radius,
        );
        return dead;
    };
