import Entity, {Trait} from '../Entity.js';
import Emitter from '../traits/Emitter.js';

export function loadCannon(entityFactory) {
    return createCannonFactory(entityFactory);
}

function createCannonFactory(entityFactory) {
    const createBullet = entityFactory['bullet-bill'];

    const bulletEmitter = (entity, level) => {
        const bullet = createBullet();
        bullet.vel.set(10, 0);
        bullet.pos.copy(entity.pos);
        level.entities.add(bullet);
    };

    return function createCannon() {
        const cannon = new Entity();

        const emitter = new Emitter();
        emitter.emitters.push(bulletEmitter);

        cannon.addTrait(emitter);

        return cannon;
    };
}
