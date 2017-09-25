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
    //comp.layers.push(backgroundLayer);

    mario.pos.x = 64;
    mario.pos.y = 180;
    mario.vel.x = 200;
    mario.vel.y = -600;

    const entities = [mario];

    const spriteLayer = createSpriteLayer(entities);
    comp.layers.push(spriteLayer);

    const deltaTime = 1/60;
    let lastTime = 0;
    function update(time) {
        //deltaTime = (time - lastTime) / 1000;

        console.log(deltaTime, time);

        entities.forEach(entity => {
            entity.update(deltaTime);
            entity.vel.y += 30;
        });

        comp.draw(context);

        setTimeout(update, 1000/144, performance.now());
        //requestAnimationFrame(update);

        lastTime = time;
    }

    update(0);
});
