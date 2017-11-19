import {Trait} from '../Entity.js';

export default class Stomper extends Trait {
    constructor() {
        super('stomper');
        this.bounceSpeed = 400;
        this.queueBounce = false;
    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        this.queueBounce = true;
    }

    update(entity) {
        if (this.queueBounce) {
            entity.vel.y = -this.bounceSpeed;
            this.queueBounce = false;
        }
    }
}
