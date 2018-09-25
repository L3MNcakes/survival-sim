/*
 * weapon_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../../config/config';
import {
    WeaponInteractAction,
} from '../../classes/actions/weapon.actions';
import {

} from '../helpers';

export const getWeaponAction = (weapon, currentHumans, currentAgents) => {
    let randomAction = Random.picker(['taken'])(Random.engines.nativeMath);

    switch(randomAction) {
        case 'taken':
            return new WeaponInteractAction({
                weapon,
                agents: currentAgents,
                humans: currentHumans,
                origPositon: weapon.position.clone(),
            });
    }
};
