import { Vec2 } from '../math.js';
import Trait from '../Trait.js';
import PipeTraveller from './PipeTraveller.js';

export default class Pipe extends Trait {
    constructor() {
        super();
        this.travellers = new Set();
        this.direction = new Vec2(0, 0);
    }

    collides(pipe, traveller) {
        if (!traveller.traits.has(PipeTraveller)) {
            return;
        }

        if (this.travellers.has(traveller)) {
            return;
        }

        const pipeTraveller = traveller.traits.get(PipeTraveller);
        console.log(pipeTraveller.direction);
        if (pipeTraveller.direction.equals(this.direction)) {
            console.log("Entering Pipe");
            pipe.sounds.add('pipe');
            this.travellers.add(traveller);
        }
    }

    update(pipe, gameContext, level) {
        for (const traveller of this.travellers) {
            if (!traveller.bounds.overlaps(pipe.bounds)) {
                console.log("Leaving Pipe");
                this.travellers.delete(traveller);
            }
        }
    }
}
