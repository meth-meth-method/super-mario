import Trait from './trait.js';

export default class AnimalGo extends Trait{
    constructor(){
        super('walk');
        this.dir =1;
        this.acc_x=30;
        this.distance = 0;
        this.duration =0;
        this.go_limit = 50
    }
    
    update(entity,dt,level){
      
        //cannot move in x direction if jumping

        if(this.dir==1){
            if(entity.velocity.x>this.go_limit){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }
            this.distance += entity.velocity.x * dt;

        }else if (this.dir==-1){

            if(entity.velocity.x<-this.go_limit){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }

            this.distance += entity.velocity.x * dt;

        }else{
            entity.velocity.x=0;
            this.acc_x=0;
        }
        this.duration += dt;
        
   
    }

    obstruct(side){
        if(side=='left'){
            //after checking the collision, setting to true and then draw it 
            this.dir=1;
       
        }
        if(side=='right'){
            //after checking the collision, setting to true and then draw it 
            this.dir=-1;
       
        }
       

        
        
    }

}