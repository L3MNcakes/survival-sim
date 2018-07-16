/**
 * helpers.js
 */
 let Victor = require('victor');
 import * as Random from 'random-js';

 export const randomPosition = (maxX, maxY) => {
     return new Victor(
         Random.integer(0, maxX)(Random.engines.nativeMath),
         Random.integer(0, maxY)(Random.engines.nativeMath)
     );
 };
