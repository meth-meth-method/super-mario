import { Vec2 } from '../math.js';
import Trait from '../Trait.js';

export default class PipeTraveller extends Trait {
    constructor() {
        super();
        this.direction = new Vec2(0, 0);
    }
}
