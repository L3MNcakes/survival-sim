/**
 * sprite.class.js
 */
import * as PIXI from 'pixi.js';
import * as Random from 'random-js';
import { CONFIG } from '../config/config';
let Victor = require('victor');

export class Sprite {
    constructor(position) {
        this.position = position;
        this.pixiSprite = new PIXI.Sprite();

        //this.texture = PIXI.utils.TextureCache['..images/charmander.png'];
    }

    loader() {
        PIXI.loader.add([
            '.../images/charmander.png',
        ]).load(this.setup);
    }

    setup() {
        let charmander = new PIXI.Sprite(PIXI.loader.resources['.../images/charmander.png'].texture);

        app.stage.addChild(charmander);
    }
/**
    textures() {
        //this.texture =
    }
**/
    update() {
        //this.pixiSprite = new PIXI.Sprite(PIXI.loader.resources['.../images/charmander.png'].app.texture);
        //this.pixiSprite.x = this.position.x;
        //this.pixiSprite.y = this.position.y;
    }
}
