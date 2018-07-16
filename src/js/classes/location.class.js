/*
 * location.class.js
 */
import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
import { App } from './app.class';
let victor = require('victor');

//let app = new App();

export class Location {
    constructor(locationSettings) {
         this.previousLoca(locationSettings.previous);
         this.currentLoca(locationSettings.current);
         this.nextLoca(locationSettings.next);
     }

     previousLoca(previous) {
         this.previous = {
             agent: previous.agent || [],
             item: previous.item || [],
         }
     }

     currentLoca(current) {
         this.current = {
             agent: current.agent || [],
             item: current.item || [],
         }
     }

     nextLoca(next) {
         this.next = {
             agent: next.agent || [],
             item: next.item || [],
         }
     }
 }
