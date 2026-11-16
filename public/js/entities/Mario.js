import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import PipeTraveller from '../traits/PipeTraveller.js';
import PoleTraveller from '../traits/PoleTraveller.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadAudioBoard} from '../loaders/audio.js';
import {loadSpriteSheet} from '../loaders/sprite.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadMario(audioContext) {
    return Promise.all([
        loadSpriteSheet('mario'),
        loadAudioBoard('mario', audioContext),
    ])
    .then(([sprite, audio]) => {
        return createMarioFactory(sprite, audio);
    });
}

function createMarioFactory(sprite, audio) {
    const runAnim = sprite.animations.get('run');
    const climbAnim = sprite.animations.get('climb');

    function getHeading(mario) {
        const poleTraveller = mario.traits.get(PoleTraveller);
        if (poleTraveller.distance) {
            return false;
        }
        return mario.traits.get(Go).heading < 0;
    }

    function routeFrame(mario) {
        const pipeTraveller = mario.traits.get(PipeTraveller);
        if (pipeTraveller.movement.x != 0) {
            return runAnim(pipeTraveller.distance.x * 2);
        }
        if (pipeTraveller.movement.y != 0) {
            return 'idle';
        }

        const poleTraveller = mario.traits.get(PoleTraveller);
        if (poleTraveller.distance) {
            return climbAnim(poleTraveller.distance);
        }

        if (mario.traits.get(Jump).falling) {
            return 'jump';
        }

        const go = mario.traits.get(Go);
        if (go.distance > 0) {
            if ((mario.vel.x > 0 && go.dir < 0) || (mario.vel.x < 0 && go.dir > 0)) {
                return 'break';
            }

            return runAnim(mario.traits.get(Go).distance);
        }

        return 'idle';
    }

    function setTurboState(turboOn) {
        this.traits.get(Go).dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, getHeading(this));
    }

    return function createMario() {
        const mario = new Entity();
        mario.audio = audio;
        mario.size.set(14, 16);

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Killable());
        mario.addTrait(new Stomper());
        mario.addTrait(new PipeTraveller());
        mario.addTrait(new PoleTraveller());

        mario.traits.get(Killable).removeAfter = Infinity;
        mario.traits.get(Jump).velocity = 175;

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    }
}
