import { Vec2 } from '../math.js';
import Trait from '../Trait.js';
import PipeTraveller from './PipeTraveller.js';

export default class Pipe extends Trait {
    constructor() {
        super();
        this.activated = false;
        this.direction = new Vec2(0, 0);
    }

    collides(us, them) {
        if (this.activated) {
            return;
        }
        const pipeTraveller = them.traits.get(PipeTraveller);
        if (pipeTraveller) {
            console.log(pipeTraveller.direction);
            if (pipeTraveller.direction.equals(this.direction)) {
                us.sounds.add('pipe');
                this.activated = true;
            }
        }
    }
}
