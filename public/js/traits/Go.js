import Trait from './trait.js'

export default class Go extends Trait{
    constructor(){
        super('go');
        this.dir =0;
        this.acc_x=250;
        this.distance = 0;
        this.right_hit =false;
        this.left_hit =false;
    }
    
    update(entity,dt,level){
      

        if(this.dir==1){
           
            if(entity.velocity.x>80){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }
            this.distance += entity.velocity.x * dt;

        }else if (this.dir==-1){
           

            if(entity.velocity.x<-80){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }

            this.distance += entity.velocity.x * dt;

        }else{
           
           
            entity.velocity.x=0;
        }

        
    }




}
