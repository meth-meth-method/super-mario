import Entity, {Trait, Sides} from '../Entity.js';
import Go from '../traits/Go.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadBowser() {
    return loadSpriteSheet('bowser')
    .then(createBowserFactory);
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
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }

    obstruct(us, side, match){
        if (side === Sides.LEFT){
            us.go.dir = 1;
        } else if (side === Sides.RIGHT){
            us.go.dir = -1;
        }
    }
}


function createBowserFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(bowser) {
        if (bowser.killable.dead) {
            return 'walk-1';
        }

        return walkAnim(bowser.lifetime);
    }

    function drawBowser(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.go.heading > 0);
    }

    return function createBowser() {
        const bowser = new Entity('bowser');
        bowser.size.set(36, 36);

        bowser.addTrait(new Physics());
        bowser.addTrait(new Solid());
        bowser.addTrait(new Go());
        bowser.addTrait(new PendulumMove());
        bowser.addTrait(new Behavior());
        bowser.addTrait(new Killable());

        bowser.draw = drawBowser;

        bowser.go.dir = -1;

        return bowser;
    }
}
