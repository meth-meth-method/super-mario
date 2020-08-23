
import CompositionScene from './compositionScene.js';

export default class CompositionLevel extends CompositionScene{
    constructor(){
        super();
        this.count =2;
 
    }
    
    updateEntity(dt,audioContext){
        this.count -=dt;

        if(this.count<=0){
            this.events.emit(CompositionScene.EventFinish);
        }
   
    }
}


