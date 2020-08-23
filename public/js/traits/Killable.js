import Trait from './trait.js';

export default class Killable extends Trait{
    constructor(){
        super('killable');
        this.dead = false;
        this.removeTime = 1;
    
        this.deadTime=0;

        this.sleep = false;
        this.sleepTime = 0;
        this.sleepLimit = 8;
        this.state ="fly";
      
        
    }

    transform(){
        this.state ="walk";
    }

    killed(){  
        this.dead = true;  
    }
    revive(){
        this.dead = false;
        this.deadTime=0;
    }
    letSleep(){
        
        this.sleep =true;
       
    }
    // letChange(){
      
    //     this.state ="walk";
    
    // }
 

    awake(entity){
        entity.walk.dir =1;
        entity.velocity.x =0;
        entity.walk.acc_x=6; //kopppa walk acc
    }


    update(entity,dt,level){
        

        if(this.sleep){
            this.sleepTime += dt;
            if(this.sleepTime>this.sleepLimit){
                console.log('koopa is going to awake..')
                this.sleep =false; 
                this.sleepTime = 0;
                this.awake(entity);
            }
        }

        if(this.dead){
            this.deadTime += dt;


            if(this.deadTime>this.removeTime){
                if(entity.marioCollide){
 
                    level.entities.forEach(e=>{
                        if(e.jugemBehavior){
                            console.log('deleting Jugem');
                            level.entities.delete(e);
                        }
                    })
                    level.entities.delete(entity);
    
                }else{
                    level.entities.delete(entity);
                }

                
            }

            

           
            
        }

        

     
    }


}