import AnimalGo from '../traits/animalGo.js';
import Position from '../traits/position.js';
import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js'
import Killable from '../traits/killable.js';
import {loadAudioBoard} from '../loader/audio.js';
import BulletBehavior from '../traits/bulletBehavior.js';

export function loadBullet(audioContext){
  
    return Promise.all([loadSpriteSheet('bullet'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createBulletEntity(result[0],result[1])}); 
    
}

//mario is the parameter returned by loadSpriteSheet
function createBulletEntity(bullet,audioBoard){

   
    //create this function only once when loading the game, and then reuse it
    function drawBullet(context,camera){
        //draw method from sprite sheet (This pointing to the mario entity not mario sprites)
        bullet.draw('bullet-1',context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

  

    //return a function create mario
    return function createBulletFunction(){
        const bullet_entity = new Entity('bullet');
        bullet_entity.size.set(16,14);
        bullet_entity.velocity.set(200,0);
        

        bullet_entity.audio = audioBoard;
        bullet_entity.canDetectTiles =false;

        bullet_entity.addTrait(new AnimalGo());
        bullet_entity.addTrait(new Position());
        bullet_entity.addTrait(new Killable());
        bullet_entity.addTrait(new BulletBehavior());

        bullet_entity.walk.go_limit = 100;
        bullet_entity.draw = drawBullet; 
        return bullet_entity;
    }
}