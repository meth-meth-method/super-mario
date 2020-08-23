import CompositionScene from './compositionScene.js';

export default class SceneRunner{
    constructor(){
        this.sceneIndex = -1;
        this.scenes =[];
    }

    addScene(scene){
        scene.events.listen(CompositionScene.EventFinish, ()=>{
            this.runNext();
        })

        scene.events.listen(CompositionScene.GameFinish, ()=>{
            this.runNext();
        })
       
        this.scenes.push(scene);

       
    }

    runNext(){
 
        this.sceneIndex+=1;
    }

    update(context,camera,dt,audioContext){

       
        const currentScene = this.scenes[this.sceneIndex];

        if(currentScene){
            
            currentScene.compo.draw(context,camera); //drawing background, entities and collision layer
            currentScene.updateEntity(dt,audioContext); // update 
        }

    }
}