import {loadMario} from './entities/Mario.js';
import {loadGoombaBrown, loadGoombaBlue} from './entities/Goomba.js';
import {loadKoopaGreen, loadKoopaBlue} from './entities/Koopa.js';
import {loadBullet} from './entities/Bullet.js';
import {loadCannon} from './entities/Cannon.js';

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
    ]);

    return entityFactories;
}
