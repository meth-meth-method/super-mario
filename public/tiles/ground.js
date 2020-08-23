function groundX({match,entity}){

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


function groundY({match,entity}){
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

export const ground = [groundX,groundY];





