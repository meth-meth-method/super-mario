import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 200;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir;
    }
}
