import Emit from '../traits/emit.js';
import {loadAudioBoard} from '../loader/audio.js';
import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
export function loadCannon(audioContext,entitiyFactories){

    return Promise.all([loadSpriteSheet('cannon'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createCannonEntity(result[0],result[1],entitiyFactories)}); 

    
}

//mario is the parameter returned by loadSpriteSheet
function createCannonEntity(cannon,audioBoard,entitiyFactories){

    //create this function only once when loading the game, and then reuse it
    function drawCannon(context,camera){
        //draw method from sprite sheet (This pointing to the mario entity not mario sprites)
        cannon.draw('cannon-1',context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    function emitBullet(entity,level){
        const bullet = entitiyFactories.bullet();
        
        bullet.pos.x = entity.pos.x;
        bullet.pos.y = entity.pos.y; 

        level.entities.add(bullet);

    }

    //return a function create mario
    return function createCannonFunction(){
        const cannon_entity = new Entity('cannon');

        cannon_entity.audio = audioBoard;
        

        const emit_object = new Emit();
        emit_object.bullet_list.push(emitBullet);
       
        cannon_entity.addTrait(emit_object);
        cannon_entity.draw = drawCannon; 

        return cannon_entity;
    }
}