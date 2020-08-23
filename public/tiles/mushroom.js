function mushroomX({match,entity,resolver}){

   
    if(entity.marioCollide){
        const grid = resolver.matrix;
        grid.delete(match.indexX,match.indexY);
    
        //cannot pass in entity as paramether
        entity.playerController.grow(1);
        entity.playerController.score +=1000;
        entity.audio.playAudio('coin'); 

      

    }

}


function mushroomY({match,entity,resolver}){
  
    if(entity.marioCollide){
            const grid = resolver.matrix;
            grid.delete(match.indexX,match.indexY);
            entity.playerController.grow();
            entity.playerController.score +=1000;
            entity.audio.playAudio('coin'); 
           

        }

}

export const mushroom = [mushroomX,mushroomY];





