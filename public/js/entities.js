import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';

export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => {
            entityFactories[name] = factory;
        };
    }

    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
    ])
    .then(() => entityFactories);
}