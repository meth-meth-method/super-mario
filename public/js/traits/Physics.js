import {Trait} from '../Entity.js';
import Gravity from './Gravity.js';

export default class Physics extends Trait {
    constructor() {
        super('physics');
        this.gravity = new Gravity();
    }

    update(entity, gameContext, level) {
        const {deltaTime} = gameContext;

        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity);

        this.gravity.update(entity, gameContext, level);
    }
}
