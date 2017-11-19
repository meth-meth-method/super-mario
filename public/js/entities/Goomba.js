import Entity, {Sides, Trait} from '../Entity.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba')
    .then(createGoombaFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                them.stomper.bounce();
                us.killable.kill();
                us.pendulumWalk.speed = 0;
            }
        }
    }
}

function createGoombaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(goomba) {
        if (goomba.killable.dead) {
            return 'flat';
        }

        return walkAnim(goomba.lifetime);
    }

    function drawGoomba(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait(new Behavior());
        goomba.addTrait(new Killable());
        goomba.addTrait(new PendulumWalk());

        goomba.draw = drawGoomba;

        return goomba;
    };
}
