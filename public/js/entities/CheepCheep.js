import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders/sprite.js';

export function loadCheepSlow() {
    return loadSpriteSheet('cheep-gray')
        .then(createCheepSlowFactory);
}

export function loadCheepSlowWavy() {
    return loadSpriteSheet('cheep-gray')
        .then(createCheepSlowWavyFactory);
}

export function loadCheepFast() {
    return loadSpriteSheet('cheep-red')
        .then(createCheepFastFactory);
}

export function loadCheepFastWavy() {
    return loadSpriteSheet('cheep-red')
        .then(createCheepFastWavyFactory);
}

class Behavior extends Trait {

    collides(us, them) {
        if(them.traits.has(Killable)) {
            them.traits.get(Killable).kill();
        }
    }

    update(entity, gameContext, level) {
        const {deltaTime} = gameContext;
        entity.pos.x += entity.vel.x * deltaTime;
    }

}

class Wavy extends Trait {
    constructor() {
        super();
        this.amplitude = 16;
        this.direction = 1;
        this.offset = 0;
        this.speed = 0.5;
    }

    update(entity, gameContext, level) {
        const {deltaTime} = gameContext;
        const movementY = (entity.vel.x * deltaTime * this.direction) * this.speed;
        entity.pos.y += movementY;

        this.offset += movementY;
        if (Math.abs(this.offset) > this.amplitude) {
            this.direction = -this.direction;
        }
    }
}

function createCheepSlowFactory(sprite) {
    const swimAnim = sprite.animations.get('swim');

    function routeAnim(entity) {
        return swimAnim(entity.lifetime);
    }

    function drawCheepSlow(context) {
        sprite.draw(routeAnim(this), context, 0, 0, true);
    }

    return function createCheepSlow() {
        const entity = new Entity();
        entity.size.set(16, 16);
        entity.vel.x = -16;
        entity.addTrait(new Behavior());
        entity.draw = drawCheepSlow;

        return entity;
    };
}

function createCheepSlowWavyFactory(sprite) {
    const swimAnim = sprite.animations.get('swim');

    function routeAnim(entity) {
        return swimAnim(entity.lifetime);
    }

    function drawCheepSlowWavy(context) {
        sprite.draw(routeAnim(this), context, 0, 0, true);
    }

    return function createCheepSlowWavy() {
        const entity = new Entity();
        entity.size.set(16, 16);
        entity.vel.x = -16;

        entity.addTrait(new Behavior());
        entity.addTrait(new Wavy());
        
        entity.draw = drawCheepSlowWavy;

        return entity;
    };
}

function createCheepFastFactory(sprite) {
    const swimAnim = sprite.animations.get('swim');

    function routeAnim(entity) {
        return swimAnim(entity.lifetime);
    }

    function drawCheepFast(context) {
        sprite.draw(routeAnim(this), context, 0, 0, true);
    }

    return function createCheepFast() {
        const entity = new Entity();
        entity.size.set(16, 16);
        entity.vel.x = -32;
        entity.addTrait(new Behavior());
        entity.draw = drawCheepFast;

        return entity;
    };
}

function createCheepFastWavyFactory(sprite) {
    const swimAnim = sprite.animations.get('swim');

    function routeAnim(entity) {
        return swimAnim(entity.lifetime);
    }

    function drawCheepFastWavy(context) {
        sprite.draw(routeAnim(this), context, 0, 0, true);
    }

    return function createCheepFastWavy() {
        const entity = new Entity();
        entity.size.set(16, 16);
        entity.vel.x = -32;

        entity.addTrait(new Behavior());
        entity.addTrait(new Wavy());
        entity.traits.get(Wavy).speed = 0.25;
        
        entity.draw = drawCheepFastWavy;

        return entity;
    };
}
