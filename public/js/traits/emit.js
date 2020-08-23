import Trait from './trait.js'

export default class Emit extends Trait{
    constructor(){
        super('emit');
        this.coolDown =5;
        this.bullet_list = [];
       
        
    }
  
    //update after time dt
    update(entity,dt,level,audioContext){      

        if(this.coolDown >0){
            this.coolDown-=dt;
        }else{
            if(entity.name=='cannon'){
                entity.audio.playAudio('shoot');

            }
            
            this.emit(entity,level);
            this.coolDown =5;
        }
     
    }

    emit(entity,level){

        
        for (let emitter of this.bullet_list){
            emitter(entity,level);
        }
    }

    

}