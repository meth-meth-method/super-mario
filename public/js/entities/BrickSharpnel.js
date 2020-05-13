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

    const pool = []
    for (let i = 0; i < 20; i++) {
        const entity = new Entity();
        entity.size.set(8, 8);
        entity.addTrait(new LifeLimit());
        entity.addTrait(new Gravity());
        entity.addTrait(new Velocity());
        entity.draw = draw;
        pool.push(entity);
    }

    let count = 0;
    return function createBrickShrapnel() {
        const entity = pool[count++ % pool.length];
        entity.lifetime = 0;
        return entity;
    };
}
