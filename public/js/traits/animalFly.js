import Trait from './trait.js'
export default class AnimalFly extends Trait{
    constructor(){
        super('animalFly');
        this.duration =0.05 ;
        this.jump_velocity = 21;
        this.jumpTime = 2;
        this.acc_y=600;
    
      
    }
    //can jump
  
    //update jump velocity after time dt
    update(entity,dt,level,audioContext){
        
        //gravity
        entity.velocity.y +=this.acc_y * dt; 
       

        if(this.jumpTime>0){
            //entity.velocity.y -= entity.acc;
            entity.velocity.y -= this.jump_velocity; //jump upward
            this.jumpTime -= entity.mass * dt;
        }

        

    }
  
    obstruct(side){
        if(side=='bottom'){
            //after checking the collision, setting to true and then draw it 
      
            this.jumpTime=2;
         

        }
        
    }


}