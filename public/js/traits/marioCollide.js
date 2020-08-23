import Trait from './trait.js';

export default class MarioCollide extends Trait{
    constructor(){
        super('marioCollide');
        this.bounce = false;
        this.boundSpeed=-300;
    }

    bounceUp(){
        this.bounce = true;
    }

    update(entity,dt,level){
        if(this.bounce){
           
            entity.velocity.y = this.boundSpeed;
            this.bounce=false;


        }

    }
}



