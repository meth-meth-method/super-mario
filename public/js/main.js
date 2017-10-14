import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders/level.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadEntities(),
    loadLevel('1-1'),
])
.then(([entityFactory, level]) => {
    const camera = new Camera();

    function spawnMario(posX, posY) {
        const mario = entityFactory.mario();
        mario.pos.set(posX, posY);
        level.entities.add(mario);
        const input = setupKeyboard(mario);
        input.listenTo(window);
        return mario;
    }

    const mario = spawnMario(64, 64);

    canvas.addEventListener('click', event => {
        spawnMario(event.offsetX + camera.pos.x, event.offsetY);
    });

    const goomba = entityFactory.goomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.draw(context, camera);
    }

    timer.start();
});