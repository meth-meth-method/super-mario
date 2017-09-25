import Compositor from './Compositor.js';
import Entity from './Entity.js';
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
    mario.vel.x = 3;
    mario.vel.y = -10;

    const entities = [mario];

    const spriteLayer = createSpriteLayer(entities);
    comp.layers.push(spriteLayer);

    function update() {
        entities.forEach(entity => {
            entity.update();
            entity.vel.y += 0.5;
        });

        comp.draw(context);

        requestAnimationFrame(update);
    }

    update();
});
