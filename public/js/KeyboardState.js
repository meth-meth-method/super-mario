const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();
    }

    addMapping(key, callback) {
        this.keyMap.set(key, callback);
    }

    handleEvent(event) {
        // use event.code, because keyCode is deprecated and will removed soon.
        // read https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode for more information.
        const {code} = event;

        if (!this.keyMap.has(code)) {
            // Did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(target) {
        ['keydown', 'keyup'].forEach(eventName =>
            target.addEventListener(eventName, this)
        );
    }
}