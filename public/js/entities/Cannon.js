import Entity, {Trait} from '../Entity.js';
import Emitter from '../traits/Emitter.js';

export function loadCannon(entityFactory) {
    return createCannonFactory(entityFactory);
}

function createCannonFactory(entityFactory) {
    const createBullet = entityFactory.bulletBill;

    function* findPlayers (level) {
        for (const entity of level.entities) {
            if (entity.player) {
                yield entity;
            }
        }
    }

    const bulletEmitter = (entity, level) => {
        for (const player of findPlayers(level)) {
            if (player.pos.x > entity.pos.x - 30 && player.pos.x < entity.pos.x + 30) {
                return;
            }
        }

        const bullet = createBullet();
        bullet.vel.set(80, 0);
        bullet.pos.copy(entity.pos);
        level.entities.add(bullet);
    };

    return function createCannon() {
        const cannon = new Entity();

        const emitter = new Emitter();
        emitter.interval = 4;
        emitter.emitters.push(bulletEmitter);

        cannon.addTrait(emitter);

        return cannon;
    };
}
