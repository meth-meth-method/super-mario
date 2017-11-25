import {Sides, Trait} from '../Entity.js';

export default class Solid extends Trait {
    constructor() {
        super('solid');
    }

    obstruct(entity, side) {
        console.log(side);
    }
}
