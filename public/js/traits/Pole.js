import { Vec2, Direction } from '../math.js';
import { Sides, Align } from '../Entity.js';
import Trait from '../Trait.js';
import PoleTraveller from './PoleTraveller.js';

function createTravellerState() {
    return {
        current: new Vec2(),
        goal: new Vec2(),
        done: false,
    };
}

export default class Pole extends Trait {
    constructor() {
        super();
        this.velocity = 100;
        this.travellers = new Map();
    }

    addTraveller(pole, traveller) {
        pole.sounds.add('ride');

        const poleTraveller = traveller.traits.get(PoleTraveller);
        poleTraveller.distance = 0;

        const state = createTravellerState();
        state.current.x = pole.bounds.meridian;
        state.current.y = traveller.bounds.bottom;
        state.goal.x = state.current.x;
        state.goal.y = pole.bounds.bottom;
        this.travellers.set(traveller, state);
    }

    collides(pole, traveller) {
        if (!traveller.traits.has(PoleTraveller)) {
            return;
        }

        if (this.travellers.has(traveller)) {
            return;
        }

        this.addTraveller(pole, traveller);
    }

    update(pole, gameContext, level) {
        const {deltaTime} = gameContext;
        const distance = this.velocity * deltaTime;
        for (const [traveller, state] of this.travellers.entries()) {
            if (!state.done) {
                state.current.y += distance;
                traveller.bounds.right = state.current.x;
                traveller.bounds.bottom = state.current.y;

                const poleTraveller = traveller.traits.get(PoleTraveller);
                poleTraveller.distance += distance;

                if (traveller.bounds.bottom > state.goal.y) {
                    state.done = true;
                    traveller.bounds.bottom = state.goal.y;
                    poleTraveller.distance = 0;
                }
            } else if (!pole.bounds.overlaps(traveller.bounds)) {
                this.travellers.delete(traveller);
            }
        }
    }
}
