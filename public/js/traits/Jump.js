import {Sides, Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.ready = 0;
        this.duration = 0.3;
        this.engageTime = 0;

        this.velocity = 200;
    }

    get falling() {
        return this.ready < 0;
    }

    start() {
        if (this.ready > 0) {
            this.engageTime = this.duration;
        }
    }

    cancel() {
        this.engageTime = 0;
    }

    obstruct(entity, side) {
        if (side === Sides.BOTTOM) {
            this.ready = 1;
        } else if (side === Sides.TOP) {
            this.cancel();
        }
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * 0.3);
            this.engageTime -= deltaTime;
        }

        --this.ready;
    }
}
