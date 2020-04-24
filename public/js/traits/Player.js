import {Trait} from '../Entity.js';
import Stomper from '../traits/Stomper.js';

const COIN_LIFE_THRESHOLD = 100;

export default class Player extends Trait {
    constructor() {
        super('player');
        this.name = "UNNAMED";
        this.coins = 0;
        this.lives = 3;
        this.score = 0;

        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += 100;
            console.log('Score', this.score);
        });
    }

    addCoins(count) {
        this.coins += count;
        if (this.coins >= COIN_LIFE_THRESHOLD) {
            const lifeCount = Math.floor(this.coins / COIN_LIFE_THRESHOLD);
            this.addLives(lifeCount);
            this.coins = this.coins % COIN_LIFE_THRESHOLD;
        }
    }

    addLives(count) {
        this.lives += count;
    }
}
