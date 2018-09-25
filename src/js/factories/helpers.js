/**
 * helpers.js
 */
 let Victor = require('victor');
 import * as Random from 'random-js';
 import { CONFIG } from '../config/config';
 import {
    generateRandomAgents,
    generateRandomHumans,
    generateRandomZombies
} from './agent.factory';

export const getRandomColor = () => {
    return parseInt(Random.hex()(Random.engines.nativeMath, 6), 16);
};

//Used in ACTION QUUEUEUEUEUE
export const getRandomDestination = () => {
    let randomX = Random.integer(0, CONFIG.world.width)(Random.engines.nativeMath),
        randomY = Random.integer(0, CONFIG.world.height)(Random.engines.nativeMath),
        destination = new Victor(randomX, randomY);

    return destination;
};

//Used in factories (generating assets)
export const randomPosition = (maxX, maxY) => {
    return new Victor(
        Random.integer(0, maxX)(Random.engines.nativeMath),
        Random.integer(0, maxY)(Random.engines.nativeMath)
    );
};

//Used in factories, spawning specific places
export const fixedPosition = (posX, posY) => {
    return new Victor(posX, posY);
};

//export const getCleanStatus = ();

export const getFurthestPosition = (checkingBody, avoidBodies) => {
    let cheBodyLoca = checkingBody.position.clone(),
        avoBodyLoca = avoidBodies.map((body) => {
            return body.position.clone();
        }),
        avoBodyDist = avoidBodies.map((body) => {
            return body.position.clone().distances(checkingBody.position);
        }),
        randomPositions = (cheBodyLoca, avoBodyLoca, avoBodyDist) => {

        };
};

// Area allowed to travel, and redirrected if it exeeds Area
export const checkCanvasArea = (checkingBody) => {
    let canMaxX = CONFIG.world.width,
        canMaxY = CONFIG.world.height,
        bodyX = checkingBody.position.x,
        bodyY = checkingBody.position.y;
};

/**
export const getNearestAgent = (item, agents) => {
    let agentDistances = agents.map((agent) => {
        return agent.position.clone().distance(item.position);
    }),
        closestDistance = Math.min(...agentDistances),
        closestIndex = agentDistances.indexOf(closestDistance);

        //return agents[closestIndex].position;

        if(closestDistance !== 0) {
            destination = item.position.clone();
            return destination;
        } else {
            destination = getRandomDestination();
            return destination;
        }
};
*/

export const getNearestItem = (agent, items) => {
    let itemDistances = items.map((item) => {
        return item.position.clone().distance(agent.position); //Victor man
    }),
        closestDistance = Math.min(...itemDistances),
        closestIndex = itemDistances.indexOf(closestDistance);

        return items[closestIndex].position;
};

//Gives position of nearest agent (getActualNearestAgent)
export const getNearestAgentPosition = (from, agents) => {
    let agentDistances = agents.map((agent) => {
        return agent.position.clone().distance(from.position);
    });

    let closestDistance = Math.min(...agentDistances),
        closestIndex = agentDistances.indexOf(closestDistance);

    return agents[closestIndex].position.clone();
}

//Gives name of nearest agent
export const getNearestAgentInfo = (from, agents) => {
    let agentDistances = agents.map((agent) => {
        return agent.position.clone().distance(from.position);
    });

    let closestDistance = Math.min(...agentDistances),
        closestIndex = agentDistances.indexOf(closestDistance);

    return agents[closestIndex];
}

//Returns all Agent info -- ***not sure if works
export const getAgentsInfo = (agents) => {
    return agents;
}

//Needs revision
export const objectCollision = (agent, item) => {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  //hit will determine whether there's a collision
  hit = false;
  //Find the center points of each sprite
  agent.centerX = agent.position.x + agent.radius / 2;
  agent.centerY = agent.position.y + agent.radius / 2;
  item.centerX = item.position.x + item.radius / 2;
  item.centerY = item.position.y + item.radius / 2;
  //Find the half-widths and half-heights of each sprite
  agent.halfWidth = agent.width / 2;
  agent.halfHeight = agent.height / 2;
  item.halfWidth = item.width / 2;
  item.halfHeight = item.height / 2;
  //Calculate the distance vector between the sprites
  vx = agent.centerX - item.centerX;
  vy = agent.centerY - item.centerY;
  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = agent.halfWidth + item.halfWidth;
  combinedHalfHeights = agent.halfHeight + item.halfHeight;
  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return hit;
};
