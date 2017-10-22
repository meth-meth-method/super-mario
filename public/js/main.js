import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {setupKeyboard} from './input.js';

const canvi = [...document.querySelectorAll('.layer')];

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    const camera = new Camera();
    window.camera = camera;

    mario.pos.set(64, 64);


    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.layers.forEach((layer, i) => {
            const context = canvi[i].getContext('2d');
            context.clearRect(0, 0, 256, 240);
            layer(context, camera);
        });
    }

    timer.start();
});