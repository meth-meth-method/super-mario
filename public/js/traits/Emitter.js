import {Trait} from '../Entity.js';

export default class Emitter extends Trait {
    constructor() {
        super('emitter');
        this.interval = 2;
        this.coolDown = this.interval;
        this.emitters = [];
    }

    emit(entity, level) {
        for (const emitter of this.emitters) {
            emitter(entity, level);
        }
    }

    update(entity, {deltaTime}, level) {
        this.coolDown -= deltaTime;
        if (this.coolDown <= 0) {
            this.emit(entity, level);
            this.coolDown = this.interval;
        }
    }
}
