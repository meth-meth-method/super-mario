export default class EventEmitter {
    constructor(){
        this.listeners =[];
    }

    listen(eventName, callback){
        const listener = {eventName,callback};
        this.listeners.push(listener);
    }
    //envoke callback by name
    //...arg represent the rest of the parameter goes into call back function
    emit(name,...args){
        this.listeners.forEach(listener=>{
            if(listener.eventName==name){
                listener.callback(...args);
            }
        })
    }
}