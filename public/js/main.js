import Timer from './Timer.js';
import {loadLevel} from './loaders/level.js';
import {createMario} from './entities.js';
import {setupInput} from './keyboard.js';
import {createCollisionLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(0, -600);

    setupInput(mario);

    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const timer = new Timer(1/60);
    timer.speed = 0.1;
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);

        mario.vel.y += gravity;
    }

    timer.start();
});
