import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
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
                them.stomper.bounce(them, us);
                us.killable.kill();
                us.pendulumWalk.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }
}

function createKoopaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(koopa) {
        return walkAnim(koopa.lifetime);
    }


    function drawKoopa(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;

        koopa.addTrait(new PendulumWalk());
        koopa.addTrait(new Killable());
        koopa.addTrait(new Behavior());

        koopa.draw = drawKoopa;

        return koopa;
    };
}
