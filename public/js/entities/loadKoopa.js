import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
import AnimalGo from '../traits/animalGo.js';
import AnimalFly from '../traits/animalFly.js';
import Jump from '../traits/jump.js';
import Position from '../traits/position.js'
import KoopaBehavior from '../traits/koopaBehavior.js'
import Killable from '../traits/killable.js';
import {loadAudioBoard} from '../loader/audio.js';




export function loadKoopa(audioContext){

    return Promise.all([loadSpriteSheet('koopa'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createKoopaEntity(result[0],result[1])}); 
 

}

function createKoopaEntity(koopa,audioBoard){
   
    const anime_walk_f = koopa.animation.get('walk-forward');
    const anime_walk_b = koopa.animation.get('walk-backward');

    const anime_fly_f = koopa.animation.get('fly-forward');
    const anime_fly_b = koopa.animation.get('fly-backward');

    const anime_sleep = koopa.animation.get('sleep');
   
    function routeFrame(koopa_entity){
        if(koopa_entity.killable.sleep){
            return anime_sleep(koopa_entity.walk.duration);
        

        }else if (koopa_entity.killable.state=="walk"){

            if(koopa_entity.walk.dir == 1){
                return anime_walk_f(koopa_entity.walk.duration);
            }else{
                return anime_walk_b(koopa_entity.walk.duration);
            }
        }else{

            if(koopa_entity.walk.dir == 1){
                return anime_fly_f(koopa_entity.walk.duration);
            }else{
                return anime_fly_b(koopa_entity.walk.duration);
            }

        }
        

        
    }
        //duration increase with time
        


    //create this function only once when loading the game, and then reuse it
    function drawKoopa(context,camera){
        //draw method from sprite sheet (This pointing to the koopa entity)
        koopa.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createKoopaFunction(){
        const koopa_entity = new Entity('koopa');
        
        koopa_entity.size.set(16,16);
        koopa_entity.velocity.set(0,0);
        koopa_entity.offset.set(0,8);
        koopa_entity.audio=audioBoard;

        koopa_entity.addTrait(new AnimalGo());
        koopa_entity.addTrait(new AnimalFly());
        koopa_entity.addTrait(new Jump());
        koopa_entity.addTrait(new Position());
        koopa_entity.addTrait(new KoopaBehavior());
        koopa_entity.addTrait(new Killable());

      
        koopa_entity.walk.go_limit = 30;

        //add a draw method to mario entity
        koopa_entity.draw = drawKoopa;
        return koopa_entity;
    }
}