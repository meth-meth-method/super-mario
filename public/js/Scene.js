import EventEmitter from "./EventEmitter.js";

export default class Scene {
    static EVENT_COMPLETE = Symbol('scene complete');

    constructor() {
        this.events = new EventEmitter();
    }

    end() {
    }
}
