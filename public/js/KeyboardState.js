const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const {keyCode} = event;

        if (!this.keyMap.has(keyCode)) {
            // Did not have key mapped.
            return false;
        }

        // Key is mapped; prevent default.
        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        // Did key state change?
        if (this.keyStates.get(keyCode) !== keyState) {
            if (this.keyMap.has(keyCode)) {
                this.keyMap.get(keyCode)(keyState, event);
            }

            this.keyStates.set(keyCode, keyState);
        }

        return true;
    }

    listenTo(window) {
        window.addEventListener('keydown', event => this.handleEvent(event));
        window.addEventListener('keyup', event => this.handleEvent(event));
    }
}
