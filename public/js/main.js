import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


function loadBackgroundSprites() {
    return loadImage('/img/tiles.png')
    .then(image => {
        console.log('Image loaded', image);
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('ground', 0, 0);
        sprites.define('sky', 3, 23);
        return sprites;
    });
}

Promise.all([
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([sprites, level]) => {
    console.log('Level loader', level);
    level.backgrounds.forEach(background => {
        drawBackground(background, context, sprites);
    });
});
