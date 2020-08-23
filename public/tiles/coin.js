function coinX({match,entity,resolver}){

   
    if(entity.marioCollide){
        const grid = resolver.matrix;
        grid.delete(match.indexX,match.indexY);
    
        //cannot pass in entity as paramether
        entity.playerController.addCoins(1);
        entity.audio.playAudio('coin'); 

    }

}


function coinY({match,entity,resolver}){
  
    if(entity.marioCollide){
            const grid = resolver.matrix;
            grid.delete(match.indexX,match.indexY);
            entity.playerController.addCoins(1);
            entity.audio.playAudio('coin');
        }

}

export const coin = [coinX,coinY];





