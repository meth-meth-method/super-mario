import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
    });
}
