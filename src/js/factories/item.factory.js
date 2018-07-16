/**
 * item.factory.js
 */
import { Item } from '../classes/item.class';
import { randomPosition } from './helpers';

export const generateRandomItems = (
        num,
        maxX,
        maxY,
        color,
        radius
    ) => {
        let items = [];

        for (let i = 0; i < num; i++) {
            items.push(new Item(
                randomPosition(maxX, maxY),
                color,
                radius
            ));
        }

        return items;
    };
