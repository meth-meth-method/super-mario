import Trait from './trait.js';

export default class FlowerBehavior extends Trait{
    constructor(){
        super('flowerBehavior');
    }

    collides_entity(me,other){

        if(other.marioCollide){
            //if mario jump on me, me bounce up and being killed
            if(other.velocity.y>me.velocity.y){
                other.marioCollide.bounceUp();
                other.killable.killed();
                me.audio.playAudio('stomp');
                
          
            }else if(other.velocity.y==me.velocity.y){
                if(!other.playerController.super){
                    other.marioCollide.bounceUp();
                    other.playerController.deleteLives(1);

                    if(other.playerController.lives==0){
                        other.killable.killed();
                       
                    }else{
                        other.playerController.disgrow();
                    
                    }

                }
            
            }
            
        }   
    }
}