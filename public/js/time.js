export default class Timer{
    constructor(dt = 1/60){
        let last=0;
        let acc_time=0;

        this.updateProxy = (time) =>{

            acc_time += (time-last)/1000; //divided by one sec

            if(acc_time>dt){
                this.update(dt);
            }
    
            last = time;
            this.enqueue();
        
        }
   
    }
    //prototype methods
    print(){
        console.log('i am print method in prototype');
    }

    enqueue(){
        requestAnimationFrame((time)=>
        {
            this.updateProxy(time);
        });
    }

    start(){
        this.enqueue();
    }

}