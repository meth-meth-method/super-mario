import Trait from '../Trait.js';

export default class LifeLimit extends Trait {
    constructor() {
        super();
        this.time = 2;
    }

    update(entity, _, level) {
        if (entity.lifetime > this.time) {
            this.queue(() => {
                level.entities.delete(entity);
            });
        }
    }
}
