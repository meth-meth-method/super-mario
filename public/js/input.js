import KeyboardState from './KeyboardState.js';

const SPACE = 32;

export function setupInput(entity) {
    const keyboardState = new KeyboardState();

    keyboardState.addMapping(SPACE, state => {
        if (state) {
            entity.jump.start();
        } else {
            entity.jump.abort();
        }
    });

    return keyboardState;
}