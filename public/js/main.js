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

class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer(context);
        });
    }
}

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

    function drawMario() {
        marioSprite.draw('idle', context, pos.x, pos.y);
    }

    function update() {
        comp.draw(context);
        drawMario();
        pos.x += 2;
        pos.y += 1;
        requestAnimationFrame(update);
    }

    update();
});
