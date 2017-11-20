import {Sides, Trait} from '../Entity.js';
import {Vec2} from '../math.js';

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
    }

    setPlayer(entity) {
        this.player = entity;
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
        }
    }
}
