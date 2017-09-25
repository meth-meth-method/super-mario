import Compositor from './Compositor.js';
import Entity from './Entity.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
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

    mario.pos.x = 64;
    mario.pos.y = 180;
    mario.vel.x = 200;
    mario.vel.y = -600;

    const entities = [mario];

    const spriteLayer = createSpriteLayer(entities);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        entities.forEach(entity => {
            entity.update(deltaTime);
            entity.vel.y += 30;
        });
    };
    timer.draw = function draw() {
        comp.draw(context);
    };

    timer.start();
});
