import {Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = null;
        this.removeAfter = 2;
    }

    kill(by) {
        this.dead = true;
    }

    revive() {
        this.dead = false;
        this.deadTime = null;
    }

    update(entity, deltaTime, level) {
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                level.entities.delete(entity);
            }
        }
    }
}
