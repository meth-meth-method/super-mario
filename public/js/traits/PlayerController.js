import {Trait} from '../Entity.js';
import {Vec2} from '../math.js';

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.players = new Set();
        this.score = 0;
        this.time = 300;

        this.handleStomp = () => {
            this.score += 100;
        };
    }

    addPlayer(entity) {
        this.players.add(entity);
        entity.stomper.events.listen('stomp', this.handleStomp);
    }

    update(entity, {deltaTime}, level) {
        this.players.forEach(player => {
            if (!level.entities.has(player)) {
                player.killable.revive();
                player.pos.set(this.checkpoint.x, this.checkpoint.y);
                level.entities.add(player);
            }
        });

        this.time -= deltaTime * 2;
    }
}
