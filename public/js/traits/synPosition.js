import Trait from './trait.js'
export default class SynPosition extends Trait{
    constructor(){
        super('synposition');
        this.forward_pos_limit = 200;
        this.backward_pos_limit = 5;
    }
  
    // update the position of entity after time dt
    update(entity,dt,level,audioContext){
        this.updateLakituPos(entity,level,dt);
       
       
    }

    updateLakituPos(lakitu_entity,level,dt){
     
        level.entities.forEach(entity=>{
            if(entity.marioCollide){
                if(entity.go.dir >=0){
                    if(lakitu_entity.pos.x<entity.pos.x + this.forward_pos_limit){
                        lakitu_entity.pos.x += 2;
                    }else{
                        lakitu_entity.pos.x= entity.pos.x + this.forward_pos_limit;

                    }
                    
                    

                }else if(entity.go.dir<0){
                    if(lakitu_entity.pos.x >entity.pos.x - this.backward_pos_limit){
                        lakitu_entity.pos.x -= 2;
                    }else{
                        lakitu_entity.pos.x= entity.pos.x - this.backward_pos_limit;

                    }
                    
                }
                
                
              
            }

        })
        


    }

} 