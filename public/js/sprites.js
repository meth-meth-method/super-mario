import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
    .then(image => {
        const mario = new SpriteSheet(image, 16, 16);
        mario.define('idle', 276, 44, 16, 16);
        return mario;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/img/tiles.png')
    .then(image => {
        console.log('Image loaded', image);
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}
