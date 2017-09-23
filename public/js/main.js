import Compositor from './Compositor.js';
import Entity from './Entity.js';
import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const mario = new Entity();
    mario.pos.x = 64;
    mario.pos.y = 64;

    mario.draw = function drawMario(context) {
        marioSprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    mario.update = function updateMario() {
        this.pos.y += this.vel.y;
        this.vel.y += 0.5;
    };

    const entities = [mario];

    const spriteLayer = createSpriteLayer(entities);
    comp.layers.push(spriteLayer);

    function update() {
        entities.forEach(entity => {
            entity.update();
        });

        comp.draw(context);

        requestAnimationFrame(update);
    }

    update();
});
