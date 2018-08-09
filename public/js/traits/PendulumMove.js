import {Sides, Trait} from '../Entity.js';

export default class PendulumMove extends Trait {
    constructor() {
        super('pendulumMove');
        this.enabled = true;
        this.bumped = false;
        this.speed = -30;
    }

    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
            this.bumped = true;
        }
    }

    update(entity, {audioContext}) {
        if (this.bumped) {
            entity.audio.playAudio('bump', audioContext);
            this.bumped = false;
        }

        if (this.enabled) {
            entity.vel.x = this.speed;
        }
    }
}
