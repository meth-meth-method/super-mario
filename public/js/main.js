import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}


loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    loadLevel('1-1')
    .then(level => {
        level.backgrounds.forEach(bg => {
            drawBackground(bg, context, sprites);
        });
    });
});
