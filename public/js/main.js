import Compositor from './Compositor.js';
import {Vec2} from './math.js';
import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}


Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);


    const pos = new Vec2(64, 64);
    const vel = new Vec2(0, 0);

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);
        pos.y += vel.y;
        vel.y += 0.5;
        requestAnimationFrame(update);
    }

    update();
});
