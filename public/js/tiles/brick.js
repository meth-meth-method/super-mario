import {Sides} from '../Entity.js';

function handleX(match, entity, tiles, gameContext, level) {
    if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
            entity.obstruct(Sides.RIGHT, match);
        }
    } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
            entity.obstruct(Sides.LEFT, match);
        }
    }
}

function handleY(match, entity, tiles, gameContext, level) {
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstruct(Sides.BOTTOM, match);
        }
    } else if (entity.vel.y < 0) {
        if (entity.player) {
            tiles.matrix.delete(match.indexX, match.indexY);

            const koopa = gameContext.entityFactory.koopa();
            koopa.pos.copy(entity.pos);
            koopa.pos.y -= 64;
            koopa.vel.set(50, -400);
            level.entities.add(koopa);
        }

        if (entity.bounds.top < match.y2) {
            entity.obstruct(Sides.TOP, match);
        }
    }
}

export const brick = [handleX, handleY];
