import Keyboard from './KeyboardState.js';

export function setupKeyboard(entity) {
    const input = new Keyboard();

    input.addMapping('KeyP', keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('KeyD', keyState => {
        entity.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('KeyA', keyState => {
        entity.go.dir += keyState ? -1 : 1;
    });

    return input;
}
