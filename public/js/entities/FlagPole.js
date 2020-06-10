import Entity from '../Entity.js';
import {loadAudioBoard} from '../loaders/audio.js';

export function loadFlagPole(audioContext) {
    return Promise.all([
        loadAudioBoard('flag-pole', audioContext),
    ])
    .then(([audio]) => {
        return createFactory(audio);
    });
}

function createFactory(audio) {
    return function createFlagPole() {
        const entity = new Entity();
        entity.audio = audio;
        entity.size.set(8, 144);
        entity.offset.set(4, 0);
        return entity;
    };
}
