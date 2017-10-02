import Entity from './Entity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(32, 32);
        mario.go = {
            x: 0,
            y: 0,
        };

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        mario.update = function updateMario(deltaTime) {
            this.vel.x = this.go.x;
        }

        return mario;
    });
}