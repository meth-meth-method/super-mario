import Vector from './math.js'
import BoundingBox from './boundingBox.js';


export default class Entity{
    constructor(name){
        this.name =name;
        this.pos=new Vector(0,0);
        this.velocity=new Vector(0,0);
        this.size = new Vector(0,0);
        this.mass = 2.5;
        this.canBePush = false;
        this.canDetectTiles = true;
        this.offset =new Vector(0,0);  // offset positive x is moving to left, offset positive y is
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);

        this.traits=[];
        

    }
    
   
    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] = trait;
        //important!!! this pointing to the entity object
    
    }
    //update properties that change with time
    updateBytime(dt,level,audioContext){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.update(this,dt,level,audioContext);
            
        });
    }
    //update properties that change with entity position
    //during checking collision, if entity obstruct with tile, then update multiple entity properties jump and dir
    obstruct(side){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.obstruct(side);
        });

    } 
    //update properties that change with entity position
    //during checking entity collision, if entity obstruct with mario, 
    //then update multiple entity properties such as score.canDetectTiles and canbepush //this is not related to dt, so did not add it into parameter
    collides(candidate){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.collides_entity(this,candidate);
        });
    }

    
    


}


