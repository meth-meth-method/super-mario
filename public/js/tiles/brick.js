import { Vec2 } from '../math.js';
import {Sides} from '../Entity.js';
import Player from "../traits/Player.js";

function createSharpnel(gameContext, match) {
    const center = new Vec2(
        match.x1 + ((match.x2 - match.x1) / 2),
        match.y1 + ((match.y2 - match.y1) / 2),
    );

    const bricks = [
        gameContext.entityFactory.brickSharpnel(),
        gameContext.entityFactory.brickSharpnel(),
        gameContext.entityFactory.brickSharpnel(),
        gameContext.entityFactory.brickSharpnel(),
    ];
    for (const brick of bricks) {
        brick.pos.copy(center);
    }
    bricks[0].vel.set(-50, -400);
    bricks[1].vel.set(-25, -400);
    bricks[2].vel.set(25, -400);
    bricks[3].vel.set(50, -400);
    return bricks;
}

function handleX({entity, match}) {

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

function handleY({entity, match, resolver, gameContext, level}) {
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstruct(Sides.BOTTOM, match);
        }
    } else if (entity.vel.y < 0) {
        if (entity.traits.has(Player)) {
            const grid = resolver.matrix;
            grid.delete(match.indexX, match.indexY);

            const shrapnel = createSharpnel(gameContext, match);
            for (const entity of shrapnel) {
                level.entities.add(entity);
            }
        }

        if (entity.bounds.top < match.y2) {
            entity.obstruct(Sides.TOP, match);
        }
    }
}

export const brick = [handleX, handleY];
