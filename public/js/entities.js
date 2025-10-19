import {loadMario} from './entities/Mario.js';
import {loadGoombaBrown, loadGoombaBlue} from './entities/Goomba.js';
import {loadKoopaGreen, loadKoopaBlue} from './entities/Koopa.js';
import {loadPiranhaPlant} from './entities/PiranhaPlant.js';
import {loadBullet} from './entities/Bullet.js';
import {loadCannon} from './entities/Cannon.js';
import {loadBrickShrapnel} from './entities/BrickShrapnel.js';
import {loadPipePortal} from './entities/PipePortal.js';
import {loadFlagPole} from './entities/FlagPole.js';

function createPool(size) {
    const pool = [];

    return function createPooledFactory(factory) {
        for (let i = 0; i < size; i++) {
            pool.push(factory());
        }

        let count = 0;
        return function pooledFactory() {
            const entity = pool[count++ % pool.length];
            entity.lifetime = 0;
            return entity;
        }
    }
}

export async function loadEntities(audioContext) {
    const entityFactories = {};

    function setup(loader) {
        return loader(audioContext);
    }

    function addAs(name) {
        return function addFactory(factory) {
            entityFactories[name] = factory;
        }
    }

    await Promise.all([
        setup(loadMario)
            .then(addAs('mario')),
        setup(loadPiranhaPlant)
            .then(addAs('piranha-plant')),
        setup(loadGoombaBrown)
            .then(addAs('goomba-brown')),
        setup(loadGoombaBlue)
            .then(addAs('goomba-blue')),
        setup(loadKoopaGreen)
            .then(addAs('koopa-green')),
        setup(loadKoopaBlue)
            .then(addAs('koopa-blue')),
        setup(loadBullet)
            .then(addAs('bullet')),
        setup(loadCannon)
            .then(addAs('cannon')),
        setup(loadPipePortal)
            .then(addAs('pipe-portal')),
        setup(loadFlagPole)
            .then(addAs('flag-pole')),
        setup(loadBrickShrapnel)
            .then(createPool(8))
            .then(addAs('brickShrapnel')),
    ]);

    return entityFactories;
}
