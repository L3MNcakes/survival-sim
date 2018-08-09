/**
 * ghost_action.factory.js
 */
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import {
    GhostHumanGroupAction,
} from '../classes/actions/ghost.actions';

export const getGhostAction = (ghost, currAgents, currHumans, currZombies) => {
    let action = ['humanGroup'];

    switch(action) {
        case 'humanGroup':
            return new GhostHumanGroupAction({

            });
    }
};
