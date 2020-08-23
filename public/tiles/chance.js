function chanceX({match,entity,resolver}){

   
    if(entity.velocity.x>0){
                    
        if(entity.bounds.right>match.x_left){
        
            entity.bounds.left=match.x_left-entity.size.x;
            entity.velocity.x=0;
            entity.obstruct('right');
        }
        
    } else if(entity.velocity.x<0){
        if(entity.bounds.left<match.x_right){
            entity.bounds.left=match.x_right;
            entity.velocity.x=0;
            entity.obstruct('left');
    
        }
        
    } 

}


function chanceY({match,entity,resolver,level}){
  
    if(entity.marioCollide){

        if(entity.velocity.y>0){
            if(entity.bounds.bottom>match.y_cell){
                entity.bounds.top=match.y_cell-entity.size.y;
                entity.velocity.y=0;

                if(entity.name=='jugem'){
                    entity.jump.jugem_obstruct(entity);
                }else{
                    entity.obstruct('bottom');
                }
        
            }
        } 
        else if(entity.velocity.y<0){
            if(entity.bounds.top<match.y_floor){
                entity.bounds.top=match.y_floor;
                entity.velocity.y=0;

                const grid = resolver.matrix;
                let value = 0;
                const num = Math.random();
    
                if(num<0.6){
                    value = {
                        name: "coin",
                        type: "coin",
                    }
                }else{
                    value = {
                        name: "mushroom",
                        type: "mushroom",
                    }

                }

                const afterChance = {
                    name: "after-chance",
                    type: "ground",
                }


                grid.set(match.indexX,match.indexY,afterChance);
                grid.set(match.indexX,match.indexY-1,value);
        
            }
        
        }   
        
        
           
    }else{

        if(entity.velocity.y>0){
            if(entity.bounds.bottom>match.y_cell){
        
                entity.bounds.top=match.y_cell-entity.size.y;
                entity.velocity.y=0;
        
                if(entity.name=='jugem'){
                    entity.jump.jugem_obstruct(entity);
                }else{
                    entity.obstruct('bottom');
                }
        
            }
        } 
        else if(entity.velocity.y<0){
            //tell entity is hitting ceiling
            if(entity.bounds.top<match.y_floor){
                entity.bounds.top=match.y_floor;
                entity.velocity.y=0;
        
            }
        
        }   
    }

}

export const chance = [chanceX,chanceY];





