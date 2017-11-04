import Camera from './Camera.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadEntities()
.then(entityFactory => Promise.all([
    entityFactory,
    createLevelLoader(entityFactory),
]))
.then(([entityFactory, loadLevel]) => Promise.all([
    entityFactory,
    loadLevel('1-1'),
]))
.then(([entityFactory, level]) => {
    const camera = new Camera();

    const mario = entityFactory.mario();
    mario.pos.set(64, 64);

    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const input = setupKeyboard(mario);
    input.listenTo(window);

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
