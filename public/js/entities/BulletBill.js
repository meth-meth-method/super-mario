import Entity from '../Entity.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadBulletBill() {
    return loadSpriteSheet('bullet-bill')
    .then(createBulletBillFactory);
}

function createBulletBillFactory(sprite) {
    function drawBulletBill(context) {
        sprite.draw('bullet', context, 0, 0);
    }

    return function createBulletBill() {
        const bullet = new Entity();
        bullet.size.set(16, 14);

        bullet.addTrait(new Killable());

        bullet.draw = drawBulletBill;

        return bullet;
    };
}
