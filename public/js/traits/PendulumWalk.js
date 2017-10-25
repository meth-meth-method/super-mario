import {Sides, Trait} from '../Entity.js';

export default class PendulumWalk extends Trait {
    constructor() {
        super('pendulumWalk');
        this.speed = -30;
    }

    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed;
    }
}
