import {loadMario} from './entities/Mario.js';
import {loadGoombaBrown, loadGoombaBlue} from './entities/Goomba.js';
import {loadKoopaGreen, loadKoopaBlue} from './entities/Koopa.js';
import {loadBullet} from './entities/Bullet.js';
import {loadCannon} from './entities/Cannon.js';

export function loadEntities(audioContext) {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadMario(audioContext).then(addAs('mario')),
        loadGoombaBrown(audioContext).then(addAs('goomba-brown')),
        loadGoombaBlue(audioContext).then(addAs('goomba-blue')),
        loadKoopaGreen(audioContext).then(addAs('koopa-green')),
        loadKoopaBlue(audioContext).then(addAs('koopa-blue')),
        loadBullet(audioContext).then(addAs('bullet')),
        loadCannon(audioContext).then(addAs('cannon')),

    ])
    .then(() => entityFactories);
}
