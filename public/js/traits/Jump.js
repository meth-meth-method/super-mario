import Trait from './trait.js'
export default class Jump extends Trait{
    constructor(){
        super('jump');
        this.duration =0.05 ;
        this.jump_velocity = 140;
        this.jumpTime = 0;
        this.acc_y=500;

        this.ready=false;

        this.requestTime = 0;
        this.graceTime =0.3;

    }
    //can jump
    start(){
        this.requestTime = this.graceTime;
        
    }
    cancel(){
        this.jumpTime=0;
        this.requestTime=0;
    }
    //update jump velocity after time dt
    update(entity,dt,level,audioContext){
        

        //gravity
        entity.velocity.y +=this.acc_y * dt; 

        if(this.requestTime >0){
            if(this.ready){
                entity.audio.playAudio('jump');
                this.jumpTime=this.duration;
                this.requestTime =0;
                
            }
            this.requestTime-= entity.mass *dt;
        }
       
        if(this.jumpTime>0){
            //entity.velocity.y -= entity.acc;
            entity.velocity.y -= this.jump_velocity; //jump upward
            this.jumpTime -= entity.mass * dt;
        }
        //when update the new entity, set to false
        this.ready=false;

        

        
     
    }
    
    obstruct(side){
        if(side=='bottom'){
            //after checking the collision, setting to true and then draw it 
            this.ready=true;
       
        }
        
    }

    jugem_obstruct(entity){
        //after checking the collision, setting to true and then draw it 
        entity.walk.acc_x=30;
       
    }

  

}