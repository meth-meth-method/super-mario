import {Sides, Trait} from '../Entity.js';

export default class Solid extends Trait {
    constructor() {
        super('solid');
    }

    obstruct(entity, side, match) {
        console.log(side, match);
    }
}
