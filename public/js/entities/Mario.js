import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import {loadSpriteSheet} from '../loaders.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadMario() {
    return loadSpriteSheet('mario')
    .then(createMarioFactory);
}

function createAnim(frames, frameLen) {
    return function resolveFrame(distance) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    }
}

function createMarioFactory(sprite) {
    const runAnim = sprite.animations.get('run');

    function routeFrame(mario) {
        if (mario.jump.falling) {
            return 'jump';
        }

        if (mario.go.distance > 0) {
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                return 'break';
            }

            return runAnim(mario.go.distance);
        }

        return 'idle';
    }

    function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        const mario = new Entity();
        mario.size.set(14, 16);
        mario.offset.set(8, 12);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        mario.turbo = function setTurboState(turboOn) {
            this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
        }

        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    }
}
