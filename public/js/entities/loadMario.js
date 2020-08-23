import Go from '../traits/go.js'
import MarioCollide from '../traits/marioCollide.js'
import Jump from '../traits/jump.js'
import Position from '../traits/position.js'
import Entity from '../entity.js'
import {loadSpriteSheet} from '../loader.js'
import Killable from '../traits/killable.js';
import PlayerController from '../traits/playerController.js';
import {loadAudioBoard} from '../loader/audio.js';

export function loadMario(audioContext){
  
    return Promise.all([loadSpriteSheet('mario'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createMarioEntity(result[0],result[1])}); 
    
}

//mario is the parameter returned by loadSpriteSheet
function createMarioEntity(mario,audioBoard){

    const anime_run = mario.animation.get('run');
    const anime_retreat = mario.animation.get('retreat');

    const super_anime_run = mario.animation.get('super-run');
    const super_anime_retreat = mario.animation.get('super-retreat');
    //const anime_run  = createAnime(['run-1','run-2','run-3'],10);
    //const anime_retreat  = createAnime(['retreat-1','retreat-2','retreat-3'],10);
    //create this function only once when loading the game, and then reuse it

    function routeFrame(mario_entity){
        // draw jumping when not able to jump(while jumping )
        if(mario_entity.playerController.super){
            if(!mario_entity.jump.ready){
                if(mario_entity.go.dir >=0){
                    return 'super-jump-forward';
                }else{
                    return 'super-jump-backward';
                }
            }else{
                if(mario_entity.go.dir >0){
                    if(mario_entity.velocity.x<0 ){
                        return 'super-break-backward';
                    }

                    return super_anime_run(mario_entity.go.distance);
                }else if(mario_entity.go.dir <0){
                    if(mario_entity.velocity.x>0 ){
                        return 'super-break-forward';
                    }
                    return super_anime_retreat(Math.abs(mario_entity.go.distance));
                }else {
                    return 'super-mario'     
                }

            }
           

        }
            if(!mario_entity.jump.ready){
                if(mario_entity.go.dir >=0){
                    return 'jump-forward';
                }else{
                    return 'jump-backward';
                }
                
            }else{

                if(mario_entity.go.dir >0){
                    if(mario_entity.velocity.x<0 ){
                    
                        return 'break-backward';
                    }
                    return anime_run(mario_entity.go.distance);
                }else if(mario_entity.go.dir <0){
                    if(mario_entity.velocity.x>0 ){
                       
                        return 'break-forward';
                    }
                    return anime_retreat(Math.abs(mario_entity.go.distance));
                }else{
                   
                    return 'mario'     
                } 

            }

            
        
            
    
    }

    

    //create this function only once when loading the game, and then reuse it
    function drawMario(context,camera){
        //draw method from sprite sheet (This pointing to the mario entity not mario sprites)
      
        mario.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

  

    //return a function create mario
    return function createMarioFunction(){
        const mario_entity = new Entity('mario');
        mario_entity.size.set(16,16);
        mario_entity.velocity.set(0,0);
        mario_entity.audio = audioBoard;

        mario_entity.addTrait(new Go());
        mario_entity.addTrait(new Jump());
        mario_entity.addTrait(new Position());
        mario_entity.addTrait(new MarioCollide());
        mario_entity.addTrait(new Killable());
        mario_entity.addTrait(new PlayerController());

        mario_entity.playerController.setPlayer(mario_entity);

        //add a draw method to mario entity
        mario_entity.draw = drawMario; // this function connect mario entity object with mario sprites object

 
        return mario_entity;
    }
}