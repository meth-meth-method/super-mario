export function setupInput(entity) {
    const state = new Map();

    function handle(event) {
        const c = event.keyCode;
        const t = event.type === 'keydown' ? true : false;

        if (state.get(c) === t) {
            return;
        }
        state.set(c, t);

        let prevent = true;

        if (c === 32 && t) {
            entity.jump();
        } else if (c === 68) {
            entity.go(t ? 1 : -1);
        } else if (c === 65) {
            entity.go(t ? -1 : 1);
        } else {
            prevent = false;
        }

        if (prevent) {
            event.preventDefault();
        }
    }

    window.addEventListener('keydown', handle);
    window.addEventListener('keyup', handle);
}