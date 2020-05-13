import Entity from '../Entity.js';
import Gravity from '../traits/Gravity.js';
import Velocity from '../traits/Velocity.js';
import {loadSpriteSheet} from '../loaders/sprite.js';
import LifeLimit from '../traits/LifeLimit.js';

export function loadBrickSharpnel() {
    return loadSpriteSheet('brick-sharpnel')
    .then(createFactory);
}

function createFactory(sprite) {
    function draw(context) {
        sprite.draw('bullet', context, 0, 0);
    }

    return function createBrickShrapnel() {
        const entity = new Entity();
        entity.size.set(8, 8);

        const limit = new LifeLimit();
        limit.time = 2;

        entity.addTrait(limit);
        entity.addTrait(new Gravity());
        entity.addTrait(new Velocity());
        entity.draw = draw;
        return entity;
    };
}
