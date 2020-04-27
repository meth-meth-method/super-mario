import {Trait} from '../Entity.js';

export default class Trigger extends Trait {
    constructor() {
        super('trigger');
        this.touches = new Set();
        this.conditions = [];
    }

    collides(_, them) {
        this.touches.add(them);
    }

    update(_, gameContext, level) {
        if (this.touches.size > 0) {
            for (const condition of this.conditions) {
                condition(this.touches, gameContext, level);
            }
            this.touches.clear();
        }
    }
}
