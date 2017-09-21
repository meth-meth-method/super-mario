import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    loadLevel('1-1')
    .then(level => {
        console.log(level);
    });

    for (let x = 0; x < 30; ++x) {
        for (let y = 0; y < 15; ++y) {
            sprites.drawTile('sky', context, x, y);
        }
    }
    for (let x = 0; x < 30; ++x) {
        for (let y = 13; y < 15; ++y) {
            sprites.drawTile('ground', context, x, y);
        }
    }
});
