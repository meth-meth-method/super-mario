import {Trait} from '../Entity.js';
import Stomper from '../traits/Stomper.js';

export default class Player extends Trait {
    constructor() {
        super('player');
        this.lives = 3;
        this.score = 0;

        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += 100;
            console.log("Stomp", this.score);
        });
    }
}
