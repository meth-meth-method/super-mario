import Trait from '../Trait.js';

export default class Velocity extends Trait {
    update(entity, {deltaTime}, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
}
