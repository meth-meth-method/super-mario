import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
import AnimalGo from '../traits/animalGo.js';
import Jump from '../traits/jump.js';
import Position from '../traits/position.js'
import JugemBehavior from '../traits/jugemBehavior.js'
import Killable from '../traits/killable.js';
import {loadAudioBoard} from '../loader/audio.js';




export function loadJugem(audioContext,entitiyFactories){

    return Promise.all([loadSpriteSheet('jugem'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createJugemEntity(result[0],result[1],entitiyFactories)}); 
 
}

function createJugemEntity(jugem,audioBoard,entitiyFactories){
    const anime_walk_f = jugem.animation.get('walk-f');
    const anime_walk_b = jugem.animation.get('walk-b');
  
  
    function routeFrame(jugem_entity){
        
        if(jugem_entity.walk.dir >0){
     
            return anime_walk_f(jugem_entity.walk.duration);
        }else if (jugem_entity.walk.dir <0){
          
            return anime_walk_b(jugem_entity.walk.duration);
        }else{

            return 'fly';

        }
       
    }

    //create this function only once when loading the game, and then reuse it
    function drawJugem(context,camera){
        //draw method from sprite sheet (This pointing to the goomba entity)
        jugem.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createGoombaFunction(){
        const jugem_entity = new Entity('jugem');
        
        jugem_entity.size.set(16,16);
        jugem_entity.velocity.set(0,0);
        jugem_entity.audio=audioBoard;

        jugem_entity.addTrait(new AnimalGo());
        jugem_entity.addTrait(new Jump());
        jugem_entity.addTrait(new Position());
        jugem_entity.addTrait(new Killable());
        jugem_entity.addTrait(new JugemBehavior());

       

        jugem_entity.walk.acc_x=0;
        jugem_entity.draw = drawJugem;
        return jugem_entity;
    }
}