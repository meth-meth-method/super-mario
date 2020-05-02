import Compositor from './Compositor.js';
import EventEmitter from './EventEmitter.js';

export default class Scene {
    static EVENT_COMPLETE = Symbol('scene complete');

    constructor() {
        this.events = new EventEmitter();
        this.comp = new Compositor();
    }

    draw(gameContext) {
        this.comp.draw(gameContext.videoContext);
    }

    update(gameContext) {
    }

    pause() {
        console.log("Pause", this);
    }
}
