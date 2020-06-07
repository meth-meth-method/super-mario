import { Vec2 } from '../math.js';
import Trait from '../Trait.js';
import PipeTraveller from './PipeTraveller.js';

function createTravellerState() {
    return {
        time: 0,
        start: new Vec2(),
        end: new Vec2(),
    };
}

export default class Pipe extends Trait {
    static EVENT_PIPE_COMPLETE = Symbol('pipe complete');

    constructor() {
        super();
        this.duration = 1;
        this.direction = new Vec2(0, 0);
        this.travellers = new Map();
    }

    collides(pipe, traveller) {
        if (!traveller.traits.has(PipeTraveller)) {
            return;
        }

        if (this.travellers.has(traveller)) {
            return;
        }

        const pipeTraveller = traveller.traits.get(PipeTraveller);
        if (pipeTraveller.direction.equals(this.direction)) {
            pipe.sounds.add('pipe');

            pipeTraveller.distance.set(0, 0);

            const state = createTravellerState();
            state.start.copy(traveller.pos);
            state.end.copy(traveller.pos);
            state.end.x += this.direction.x * pipe.size.x;
            state.end.y += this.direction.y * pipe.size.y;
            this.travellers.set(traveller, state);
        }
    }

    update(pipe, gameContext, level) {
        const {deltaTime} = gameContext;
        for (const [traveller, state] of this.travellers.entries()) {
            state.time += deltaTime;
            const progress = state.time / this.duration;
            traveller.pos.x = state.start.x + (state.end.x - state.start.x) * progress;
            traveller.pos.y = state.start.y + (state.end.y - state.start.y) * progress;

            const pipeTraveller = traveller.traits.get(PipeTraveller);
            pipeTraveller.movement.copy(this.direction);
            pipeTraveller.distance.x = traveller.pos.x - state.start.x;
            pipeTraveller.distance.y = traveller.pos.y - state.start.y;

            if (state.time > this.duration) {
                this.travellers.delete(traveller);
                pipeTraveller.movement.set(0, 0);
                pipeTraveller.distance.set(0, 0);

                level.events.emit(Pipe.EVENT_PIPE_COMPLETE, pipe, traveller);
            }
        }
    }
}
