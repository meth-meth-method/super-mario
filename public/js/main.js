import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillStyle = 'black';
context.fillRect(0, 0, 100, 100);

loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);
    for (let x = 0; x < 30; ++x) {
        for (let y = 0; y < 15; ++y) {
            sprites.draw('sky', context, x * 16, y * 16);
        }
    }
    sprites.draw('ground', context, 64, 32);
});
