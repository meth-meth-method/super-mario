import Entity, {Trait} from '../Entity.js';
import Velocity from '../traits/Velocity.js';
import Gravity from '../traits/Gravity.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadBulletBill() {
    return loadSpriteSheet('bullet-bill')
    .then(createBulletBillFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
        this.gravity = new Gravity();
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.vel.set(100, -200);
            } else {
                them.killable.kill();
            }
        }
    }

    update(entity, deltaTime, level) {
        if (entity.killable.dead) {
            this.gravity.update(entity, deltaTime, level);
        }
    }
}

function createBulletBillFactory(sprite) {
    function drawBulletBill(context) {
        sprite.draw('bullet', context, 0, 0);
    }

    return function createBulletBill() {
        const bullet = new Entity();
        bullet.size.set(16, 14);

        bullet.addTrait(new Velocity());
        bullet.addTrait(new Killable());
        bullet.addTrait(new Behavior());

        bullet.draw = drawBulletBill;

        return bullet;
    };
}
