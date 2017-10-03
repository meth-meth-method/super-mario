import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {createCollisionLayer} from './layers.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    Promise.all(new Array(100).fill(0).map(() => createMario())),
    loadLevel('1-1'),
])
.then(([marios, level]) => {
    marios.forEach(mario => {
        const input = setupKeyboard(mario);
        input.listenTo(window);

        mario.pos.set(200 * Math.random(), 64);
        level.entities.add(mario);
    });

    level.comp.layers.push(createCollisionLayer(level));

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        });
    });

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);
    }

    timer.start();
});