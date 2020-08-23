import Trait from './trait.js'
export default class Position extends Trait{
    constructor(){
        super('position');
    }
  
    // update the position of entity after time dt
    update(entity,dt){
        entity.pos.x +=(entity.velocity.x * dt);
        entity.pos.y +=(entity.velocity.y * dt);
       
    }
} 
