import Entity from './Entity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
    return loadMarioSprite()
    .then(marioSprite => {
        const mario = new Entity();

        mario.draw = function drawMario(context) {
            marioSprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        mario.update = function updateMario() {
            this.pos.y += this.vel.y;
            this.vel.y += 0.5;
        }

        return mario;
    });
}
