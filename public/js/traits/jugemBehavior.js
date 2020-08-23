import Trait from './trait.js';

export default class JugemBehavior extends Trait{
    constructor(){
        super('jugemBehavior');
        
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