import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Velocity from './traits/Velocity.js';
import Go from './traits/Go.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(96, 96);

        mario.addTrait(new Velocity());
        mario.addTrait(new Jump());
        mario.addTrait(new Go());

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return mario;
    });
}