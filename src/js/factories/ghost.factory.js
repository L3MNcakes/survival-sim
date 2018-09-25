/**
 * ghost.factory.js
 */
import { Ghost } from '../classes/ghost.class';

export const generateGhost = () => {
        let ghosts =  [
            new Ghost(),
        ];

        return ghosts;
    };
