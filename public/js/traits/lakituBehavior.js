import Trait from './trait.js';

export default class LakituBehavior extends Trait{
    constructor(){
        super('lakituBehavior');
        
    }

    collides_entity(me,other){
        if(other.marioCollide){
           
          
            if(!other.playerController.super){
            
                other.killable.killed(); 

            }else{
                other.playerController.disgrow();
            
            }
            
            
        } 
          
    }

    
}