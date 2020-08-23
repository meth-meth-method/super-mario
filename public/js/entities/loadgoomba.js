import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
import AnimalGo from '../traits/animalGo.js';
import Jump from '../traits/jump.js';
import Position from '../traits/position.js'
import GoombaBehavior from '../traits/goombaBehavior.js'
import Killable from '../traits/killable.js';
import {loadAudioBoard} from '../loader/audio.js';




export function loadGoomba(audioContext){

    return Promise.all([loadSpriteSheet('goomba'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createGoombaEntity(result[0],result[1])}); 
 
}

function createGoombaEntity(goomba,audioBoard){
    const anime_run = goomba.animation.get('walk');
  
    function routeFrame(goomba_entity){
        if(goomba_entity.killable.dead){
            return 'flat';
        }
        return anime_run(goomba_entity.walk.duration);
    }

    //create this function only once when loading the game, and then reuse it
    function drawGoomba(context,camera){
        //draw method from sprite sheet (This pointing to the goomba entity)
        goomba.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createGoombaFunction(){
        const goomba_entity = new Entity('goomba');
        goomba_entity.size.set(16,16);
        goomba_entity.velocity.set(0,0);
        goomba_entity.audio=audioBoard;

        goomba_entity.addTrait(new AnimalGo());
        goomba_entity.addTrait(new Jump());
        goomba_entity.addTrait(new Position());
        goomba_entity.addTrait(new GoombaBehavior());
        goomba_entity.addTrait(new Killable());

        //add a draw method to mario entity
        goomba_entity.walk.go_limit = 50;
        goomba_entity.draw = drawGoomba;
        return goomba_entity;
    }
}