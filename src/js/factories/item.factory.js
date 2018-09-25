/**
 * item.factory.js
 */
import { Item } from '../classes/item.class';
import { Food } from '../classes/food.class';
import { Weapon } from '../classes/weapon.class';
import { randomPosition } from './helpers';

export const generateRandomItems = (
        num,
        maxX,
        maxY,
        color,
        radius,
        //stats,
    ) => {
        let items = [];

        for (let i = 0; i < num; i++) {
            items.push(new Item(
                randomPosition(maxX, maxY),
                color,
                radius,
            ));
        }

        return items;
    };

export const generateOneItem = (
        maxX,
        maxY,
        color,
        radius,
        //stats,
    ) => {
        return new Item(
            randomPosition(maxX, maxY),
            color,
            radius,
            //stats,
        );
    };

export const generateRandomFoods = (
        num,
        maxX,
        maxY,
        color,
        radius,
        //stats
    ) => {
        let foods = [];

        for (let i = 0; i < num; i++) {
            foods.push (new Food(
                randomPosition(maxX, maxY),
                color,
                radius,
                //stats
            ));
        }

        return foods;
    };

export const generateOneFood = (
        maxX,
        maxY,
        color,
        radius,
        //stats,
    ) => {
        return new Food(
            randomPosition(maxX, maxY),
            color,
            radius,
            //stats
        );
    };

export const generateRandomWeapons = (
        num,
        maxX,
        maxY,
        color,
        radius,
        //stats
    ) => {
        let weapons = [];

        for (let i = 0; i < num; i++) {
            weapons.push (new Weapon(
                randomPosition(maxX, maxY),
                color,
                radius,
                //stats,
            ));
        }

        return weapons;
    };

export const generateOneWeapon = (
        maxX,
        maxY,
        color,
        radius,
        //stats,
    ) => {
        return new Weapon(
            reandomPosition(maxX, maxY),
            color,
            radius,
            //stats,
        );
    };
