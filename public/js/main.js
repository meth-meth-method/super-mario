import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    level.entities.add(mario);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);

        mario.vel.y += gravity;
    }

    timer.start();
});
