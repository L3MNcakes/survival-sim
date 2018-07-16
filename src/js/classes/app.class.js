/**
 * app.class.js
 */
import { World } from './world.class';

export class App {
    constructor() {
        this.world = new World();
    }

    render() {
        this.world.render();
    }
}
