const Pressed = 1;
const Released = 0;

export default class Keyboard{
    constructor(){
        //hold current state of the a given key
        this.keyStates = new Map();
        //hold the callback function of a key code
        this.keyMap = new Map();

    }
    addMapping(keyCode, callback){
        
        this.keyMap.set(keyCode,callback);
    }

    handleEvent(event){
        const keyCode = event.keyCode;
        // console.log('you are hitting keycode:',keyCode);
        // console.log(`the current event type is ${event.type}`);

        if(this.keyMap.has(keyCode)|keyCode==40){
            event.preventDefault();
        }else{
            // console.log('keyCode is not 13 returning back');
            // return;
        }
        

        //Get current state is pressed or released
        const keyState = event.type ==='keydown' ? Pressed:Released;
        //console.log('the new keystate is',keyState);


        //is current state same as before = hold
        if(this.keyStates.get(keyCode) ===keyState){
            //console.log('you are pressing same button, returning back');
            return;
        }

        //update state
        this.keyStates.set(keyCode,keyState);
        //call callback
        this.keyMap.get(keyCode)(keyState);
        
    }

        listenTo(window){
        
            ['keydown','keyup'].forEach(eventName=>{
                window.addEventListener(eventName,event=>{
                    this.handleEvent(event);
                });

            })
        
        } 
}