import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([mario, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);


    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;
    }

    timer.start();
});
