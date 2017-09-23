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


class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
    }
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

    const mario = new Entity();
    mario.pos.x = 64;
    mario.pos.y = 64;

    mario.draw = function drawMario(context) {
        marioSprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    const entities = [mario];

    const spriteLayer = createSpriteLayer(marioSprite, mario.pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);
        mario.pos.y += mario.vel.y;
        mario.vel.y += 0.5;
        requestAnimationFrame(update);
    }

    update();
});
