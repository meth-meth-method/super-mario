import Keyboard from './keyboard.js'; 
export function setupKeyBoard(entity){
     //to store it in the dic;
     const SPACE =32;
     const input =new Keyboard();
    
     input.addMapping(SPACE, keyState=>{
         if(keyState){
             //keystate =1, released
             //console.log('jumping!')
             entity.jump.start();
         }else{
             //keystate =0, keep pressing
             //console.log('you released down tab')
             entity.jump.cancel();
         }
 
     });
 
 
     
     // right button is 39
    //  input.addMapping(39, keyState=>{
    //      entity.go.dir =keyState;
        
         
    //  });
     // left button is 37
    //  input.addMapping(37, keyState=>{
    //      entity.go.dir =-keyState;
    //  });

     input.addMapping(39, keyState => {
        entity.go.dir += keyState ? 1 : -1;
    });

    input.addMapping(37, keyState => {
        entity.go.dir += keyState ? -1 : 1;
    });

     return input;
}