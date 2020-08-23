import Emit from '../traits/emit.js';
import {loadAudioBoard} from '../loader/audio.js';
import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
import AnimalGo from '../traits/animalGo.js';
import Jump from '../traits/jump.js';
import Position from '../traits/position.js';
import SynPosition from '../traits/synposition.js';
import Killable from '../traits/killable.js';
import LakituBehavior from '../traits/lakituBehavior.js';

export function loadLakitu(audioContext,entitiyFactories){

    return Promise.all([loadSpriteSheet('lakitu'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createLakituEntity(result[0],result[1],entitiyFactories)}); 

    
}

//mario is the parameter returned by loadSpriteSheet
function createLakituEntity(lakitu,audioBoard,entitiyFactories){
    
    const anime_fly_f = lakitu.animation.get('fly-f');
    const anime_fly_b = lakitu.animation.get('fly-b');

    function routeFrame(lakitu_entity){
       
        if(lakitu_entity.walk.dir == 1){
            return anime_fly_f(lakitu_entity.walk.duration);
        }else if (lakitu_entity.walk.dir == -1){
            return anime_fly_b(lakitu_entity.walk.duration);
        }else{
            return "fly-1";
        }
        

    }

    //create this function only once when loading the game, and then reuse it
    function drawLakitu(context,camera){
        //draw method from sprite sheet (This pointing to the mario entity not mario sprites)
        lakitu.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }


    function emitJugem(entity,level){
        const jugem_entity = entitiyFactories.jugem();
        jugem_entity.pos.x = entity.pos.x; 
        level.entities.add(jugem_entity);

    }

    

   


    //return a function create mario
    return function createLakituFunction(){
        const lakitu_entity = new Entity('lakitu');
        lakitu_entity.addTrait(new Position());
        lakitu_entity.addTrait(new SynPosition());
        lakitu_entity.addTrait(new AnimalGo());
        lakitu_entity.addTrait(new Jump());
        lakitu_entity.addTrait(new Killable());
        lakitu_entity.addTrait(new LakituBehavior());
        
        lakitu_entity.walk.go_limit = 50;
        lakitu_entity.size.set(16,16);
        lakitu_entity.offset.set(0,8);
        lakitu_entity.velocity.set(0,0);
        lakitu_entity.pos.set(0,0);

        lakitu_entity.walk.acc_x=0;
        lakitu_entity.jump.acc_y=0;
        lakitu_entity.canDetectTiles = false; 

  
        lakitu_entity.audio = audioBoard;
       

        const emit = new Emit();
        emit.coolDown =5;
        emit.bullet_list.push(emitJugem);
        lakitu_entity.addTrait(emit);

        lakitu_entity.draw = drawLakitu; 


        return lakitu_entity;
    }
}