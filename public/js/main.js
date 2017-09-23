import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';

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



Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, sprites, level]) => {
    console.log('Level loader', level);
    level.backgrounds.forEach(background => {
        drawBackground(background, context, sprites);
    });

    const pos = {
        x: 64,
        y: 64,
    };

    function drawMario() {
        marioSprite.draw('idle', context, pos.x, pos.y);
    }

    drawMario();
});
