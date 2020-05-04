import Trait from '../Trait.js';
import Stomper from '../traits/Stomper.js';

const COIN_LIFE_THRESHOLD = 100;

export default class Player extends Trait {
    constructor() {
        super();
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
        this.queue(entity => entity.sounds.add('coin'));
        while (this.coins >= COIN_LIFE_THRESHOLD) {
            this.addLives(1);
            this.coins -= COIN_LIFE_THRESHOLD;
        }
    }

    addLives(count) {
        this.lives += count;
    }
}
