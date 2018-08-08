import {Sides, Trait} from '../Entity.js';

export default class Stomper extends Trait {
    constructor() {
        super('stomper');
        this.bounceSpeed = 400;
        this.didStomp = false;

        this.onStomp = function() {
        }
    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us, them) {
        if (!them.killable || them.killable.dead) {
            return;
        }

        if (us.vel.y > them.vel.y) {
            this.bounce(us, them);
            this.didStomp = true;
            this.onStomp(us, them);
        }
    }

    update(entity, {audioBoard}) {
        if (this.didStomp) {
            audioBoard.playAudio('stomp');
            this.didStomp = false;
        }
    }
}
