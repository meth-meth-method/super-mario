import Entity from '../Entity.js';
import Trait from '../Trait.js';
import {loadSpriteSheet} from '../loaders/sprite.js';
import {findPlayers} from '../player.js';

export function loadPiranhaPlant() {
    return loadSpriteSheet('piranha-plant')
    .then(createPiranhaPlantFactory);
}

class Behavior extends Trait {
    constructor() {
        super();

        this.graceDistance = 32;

        this.idleTime = 4;
        this.idleCounter = 0;
        this.attackTime = 2;
        this.attackCounter = null;
        this.holdTime = 2;
        this.holdCounter = null;
        this.retreatTime = 2;
        this.retreatCounter = null;

        this.velocity = 30;
        this.deltaMove = 0;
    }

    update(entity, gameContext, level) {
        const {deltaTime} = gameContext;

        if (this.idleCounter !== null) {
            for (const player of findPlayers(level.entities)) {
                const distance = player.bounds.getCenter().distance(entity.bounds.getCenter());
                if (distance < this.graceDistance) {
                    this.idleCounter = 0;
                    return;
                }
            }

            this.idleCounter += deltaTime;
            if (this.idleCounter >= this.idleTime) {
                this.attackCounter = 0;
                this.idleCounter = null;
            }
        }
        else if (this.attackCounter !== null) {
            this.attackCounter += deltaTime;
            const movement = this.velocity * deltaTime;
            this.deltaMove += movement;
            entity.pos.y -= movement;
            if (this.deltaMove >= entity.size.y) {
                entity.pos.y += entity.size.y - this.deltaMove;
                this.attackCounter = null;
                this.holdCounter = 0;
            }
        }
        else if (this.holdCounter !== null) {
            this.holdCounter += deltaTime;
            if (this.holdCounter >= this.holdTime) {
                this.retreatCounter = 0;
                this.holdCounter = null;
            }
        }
        else if (this.retreatCounter !== null) {
            this.retreatCounter += deltaTime;
            const movement = this.velocity * deltaTime;
            this.deltaMove -= movement;
            entity.pos.y += movement;
            if (this.deltaMove <= 0) {
                entity.pos.y -= this.deltaMove;
                this.retreatCounter = null;
                this.idleCounter = 0;
            }
        }
    }
}


function createPiranhaPlantFactory(sprite) {
    const chewAnim = sprite.animations.get('chew');

    function routeAnim(entity) {
        return chewAnim(entity.lifetime);
    }

    function drawPiranhaPlant(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createPiranhaPlant() {
        const entity = new Entity();
        entity.size.set(16, 24);

        entity.addTrait(new Behavior());

        entity.draw = drawPiranhaPlant;

        return entity;
    };
}
