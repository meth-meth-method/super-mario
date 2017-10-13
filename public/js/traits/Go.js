import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acceleration = 400;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        if (this.dir) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }
    }
}
