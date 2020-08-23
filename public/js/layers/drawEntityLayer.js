export function getSpriteLayer(entities){
    //draw entities on context
    return function drawOnContext_sprite(context,camera){
        entities.forEach((entity)=>{ 
          
            entity.draw(context,camera); //method for entity created in creatMario
        });  
    }
}