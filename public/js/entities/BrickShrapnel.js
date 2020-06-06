import Entity from '../Entity.js';
import Gravity from '../traits/Gravity.js';
import Velocity from '../traits/Velocity.js';
import {loadSpriteSheet} from '../loaders/sprite.js';

export function loadBrickShrapnel(audioContext) {
    return Promise.all([
        loadSpriteSheet('brick-shrapnel'),
    ])
    .then(([sprite]) => {
        return createFactory(sprite);
    });
}

function createFactory(sprite) {
    const spinBrick = sprite.animations.get('spinning-brick');

    function draw(context) {
        sprite.draw(spinBrick(this.lifetime), context, 0, 0);
    }

    return function createBrickShrapnel() {
        const entity = new Entity();
        entity.size.set(8, 8);
        entity.addTrait(new Gravity());
        entity.addTrait(new Velocity());
        entity.draw = draw;
        return entity;
    };
}
