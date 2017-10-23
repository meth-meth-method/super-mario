import Entity, {Sides} from '../Entity.js';
import PendulumWalk from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../loaders.js';
import {createAnim} from '../anim.js';

export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

function createKoopaFactory(sprite) {
    const walkAnim = createAnim(['walk-1', 'walk-2'], 0.15);

    function drawKoopa(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);

        koopa.addTrait(new PendulumWalk());
        koopa.pendulumWalk.speed = -30;

        koopa.draw = drawKoopa;

        return koopa;
    };
}
