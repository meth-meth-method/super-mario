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
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }

        return mario;
    });
}
