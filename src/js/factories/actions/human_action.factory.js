/**
 * human_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../../config/config';
import {
    HumanChaseOthersAction,
    HumanSeekItemAction,
    HumanIdleAction,
    HumanMoveAction,
    HumanCaughtAction,
    HumanAvoidOtherAction,
    HumanActionChainExample1
} from '../../classes/actions/human.actions';
import {
    getRandomDestination,
    getNearestAgentPosition,
    getRandomColor,
    objectCollision,
    getNearestItem,
    getFurthestPosition,
} from '../helpers';

export const getHumanAction = (human, currentHumans, currentZombies, currentItems, currentFoods, currentWeapons) => {
    /**
    let surviveLogic = () => {

            }

    switch(surviveLogic) {

    }

    new HumanAvoidOtherAction({
            human,
            avoidOthers: currentZombies,
            avoidRadius: CONFIG.bodies.agent.human.avoidRadius,
            speed: human.moveStats.currentSpeed,
        }),
        ;
    **/

        let randomAction = Random.picker(['seekItem', /**'seekFood',**/ 'randomMove', 'seekWeapon', /**'avoidZombie', 'groupMove', /**'chainedAction'*/])(Random.engines.nativeMath),
            feedAction = 'seekFood',
            avoidAction = 'avoidZombie',
            chooseAction = null;

            //human.toggles.isDying

            /**
            if (human.toggles.isDead) {

            }
            */

            if (human.toggles.isCaught) { //needs fixed
                //human.position = human.info.caughtSpot.clone();
                chooseAction = 'caught'; //caught action eventually -- fighting / dodging / etc?
            } else if (human.position.distance(getNearestAgentPosition(human, currentZombies)) < CONFIG.bodies.agent.human.avoidRadius) {
                chooseAction = avoidAction;
            } else if (human.moveStats.baseSpeed > human.moveStats.currentSpeed) {
                chooseAction = feedAction;
            } else {
                chooseAction = randomAction;
            }



            //} else if (human.toggles.isSought && human.moveStats.currentSpeed > human.moveStats.baseSpeed) {
            //    chooseAction = avoidAction;



        switch(chooseAction) {
            case 'seekItem':
                return new HumanSeekItemAction({
                    human,
                    items: currentItems,
                    affectStat: human.toggles.hasItemPick,
                    affectList: human.info.itemList,
                    avRadius: CONFIG.bodies.agent.human.avoidRadius,
                    avList: currentZombies,
                    speed: human.moveStats.currentSpeed,
                });
            case 'seekFood':
                return new HumanSeekItemAction({
                    human,
                    items: currentFoods,
                    affectStat: human.toggles.hasEaten,
                    affectList: human.info.eatenList,
                    avRadius: CONFIG.bodies.agent.human.avoidRadius,
                    avList: currentZombies,
                    speed: human.moveStats.currentSpeed,
                });
            case 'seekWeapon':
                return new HumanSeekItemAction({
                    human,
                    items: currentWeapons,
                    affectStat: human.toggles.hasWeapon,
                    affectList: human.info.itemList,
                    avRadius: CONFIG.bodies.agent.human.avoidRadius,
                    avList: currentZombies,
                    speed: human.moveStats.currentSpeed,
                });
            case 'avoidZombie':
                return new HumanAvoidOtherAction({
                    human,
                    avoidOthers: currentZombies,
                    avoidRadius: CONFIG.bodies.agent.human.avoidRadius,
                    allowedArea: null,
                    speed: human.moveStats.currentSpeed, //add running / endurance based speed?
                });
            case 'randomMove':
                return new HumanMoveAction({
                    human,
                    origPosition: human.position.clone(),
                    destination: getRandomDestination(),
                    speed: human.moveStats.currentSpeed,
                });
            case 'groupMove':
                return new HumanMoveAction({
                    human,
                    origPosition: human.position.clone(),
                    destination: currentHumans[0].position,
                    speed: human.moveStats.currentSpeed,
                });
            case 'wait':
                return new HumanIdleAction({
                    human,
                    time: CONFIG.bodies.agent.human.waitTime,
                });
            case 'caught':
                return new HumanCaughtAction({ //fight / dodge / etc (eventually)
                    human,
                    zombies: currentZombies,
                    time: CONFIG.bodies.agent.human.dyingTime,
                });
        }
};
