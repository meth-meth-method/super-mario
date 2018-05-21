import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadBowser} from './entities/Bowser.js';

export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadMario().then(addAs('mario')),
        //loadGoomba().then(addAs('goomba')),
        //loadKoopa().then(addAs('koopa')),
        loadBowser().then(addAs('bowser'))
    ])
    .then(() => entityFactories);
}