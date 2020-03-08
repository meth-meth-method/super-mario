import {Trait} from '../Entity.js';
import {Vec2} from '../math.js';

export default class Player extends Trait {
    constructor() {
        super('player');
        this.lives = 3;
        this.score = 0;
    }
}
