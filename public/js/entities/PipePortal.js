import { Direction } from '../math.js';
import Entity from '../Entity.js';
import Pipe from '../traits/Pipe.js';
import {loadAudioBoard} from '../loaders/audio.js';

export function loadPipePortal(audioContext) {
    return Promise.all([
        loadAudioBoard('pipe-portal', audioContext),
    ])
    .then(([audio]) => {
        return createFactory(audio);
    });
}

function createFactory(audio) {

    return function createPipePortal() {
        const pipe = new Pipe();
        pipe.direction.copy(Direction.DOWN);
        const entity = new Entity();
        entity.audio = audio;
        entity.size.set(24, 24);
        entity.addTrait(pipe);
        return entity;
    };
}
