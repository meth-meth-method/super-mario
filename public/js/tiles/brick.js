import { Vec2 } from '../math.js';
import { Sides } from '../Entity.js';
import Player from "../traits/Player.js";

function centerEntity(entity, pos) {
    entity.pos.x = pos.x - entity.size.x / 2;
    entity.pos.y = pos.y - entity.size.y / 2;
}

function getMatchCenter(match) {
    return new Vec2(
        match.x1 + ((match.x2 - match.x1) / 2),
        match.y1 + ((match.y2 - match.y1) / 2),
    );
}

function addShrapnel(level, gameContext, match) {
    const center = getMatchCenter(match);

    const bricks = [];
    for (let i = 0; i < 4; i++) {
        const brick = gameContext.entityFactory.brickShrapnel();
        centerEntity(brick, center);
        level.entities.add(brick);
        bricks.push(brick);
    }

    const spreadH = 60;
    const spreadV = 400;
    bricks[0].sounds.add('break');
    bricks[0].vel.set(-spreadH, -spreadV * 1.2);
    bricks[1].vel.set(-spreadH, -spreadV);
    bricks[2].vel.set(spreadH, -spreadV * 1.2);
    bricks[3].vel.set(spreadH, -spreadV);
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
            addShrapnel(level, gameContext, match);
        }

        if (entity.bounds.top < match.y2) {
            entity.obstruct(Sides.TOP, match);
        }
    }
}

export const brick = [handleX, handleY];
