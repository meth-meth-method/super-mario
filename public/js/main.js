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
    sprites.draw('ground', context, 64, 32);
});
