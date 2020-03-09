import {findPlayers} from '../player.js';
import Entity, {Trait} from '../Entity.js';
import Emitter from '../traits/Emitter.js';
import {loadAudioBoard} from '../loaders/audio.js';

export function loadCannon(entityFactory, audioContext) {
    return loadAudioBoard('cannon', audioContext)
    .then(audio => {
        return createCannonFactory(entityFactory, audio);
    });
}

function createCannonFactory(entityFactory, audio) {
    const createBullet = entityFactory.bulletBill;

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
        cannon.audio = audio;

        const emitter = new Emitter();
        emitter.interval = 4;
        emitter.emitters.push(bulletEmitter);

        cannon.addTrait(emitter);

        return cannon;
    };
}
