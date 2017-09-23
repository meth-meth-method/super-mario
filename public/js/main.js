import Compositor from './Compositor.js';
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

function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}


Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, sprites, level]) => {
    console.log('Level loader', level);

    const comp = new Compositor();
    comp.layers.push(createBackgroundLayer(level.backgrounds, sprites));

    const pos = {
        x: 64,
        y: 64,
    };

    comp.layers.push(createSpriteLayer(marioSprite, pos));

    function update() {
        comp.draw(context);
        pos.x += 2;
        pos.y += 1;
        requestAnimationFrame(update);
    }

    update();
});
