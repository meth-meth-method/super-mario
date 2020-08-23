import Compositor from './compository.js';
import EntityCollider from './entityCollider.js';
import TileCollider from './tileCollider.js';
import CompositionScene from './compositionScene.js';

export default class Level extends CompositionScene{
    constructor(){
        super();
        this.compo = new Compositor();
        this.entities = new Set();
        this.tileCollider = new TileCollider();
        this.entity_collider = new EntityCollider(this.entities);
        this.duration = 0;
        this.count=300;
   

    }
    


    updateEntity(dt,audioContext){

        this.count -=dt;

        if(this.count<=0){
            this.events.emit(CompositionScene.GameFinish);
        }

        

        this.entities.forEach(entity=>{
            if(entity.marioCollide){
                if(entity.playerController.lives<=0){
                    this.events.emit(CompositionScene.GameFinish);
                }
            }
            
            //first update entity jump, go speed and then update position
            console.log('updating after dt.....');
           
            entity.updateBytime(dt,this,audioContext); //this pointing to level 
            //check whether entities collide with tiles
            if(entity.canDetectTiles){
                this.tileCollider.test(entity); 
            }

 
            //check if overlap or collide with mario
            this.entity_collider.checkEntityCollideMario(entity);
            this.entity_collider.checkEntityPushedByMario(entity);

            //"this "is pointing to level
            this.duration +=dt;


        })
   
    }
}


