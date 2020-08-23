export default class Matrix{

    constructor(){
        this.grid = [];
    }

    //x is columns index
    //y is row index
    set(columnIndex,rowIndex,value){
        //if column does not exist, create an empty one
        if(!this.grid[columnIndex]){
            this.grid[columnIndex]=[];
        }
       
        this.grid[columnIndex][rowIndex]=value;
    }
    get(columnIndex,rowIndex){
        const col = this.grid[columnIndex];
        if(col){
            return col[rowIndex];
        }else{
            return undefined;
        }
    }

    loop(callback){
        this.grid.forEach((column,columnIndex)=>{
            column.forEach((value,rowIndex)=>{
                callback(value,columnIndex,rowIndex);
            });
        }); 
    }

    delete(columnIndex,rowIndex) {
        const col = this.grid[columnIndex];
        if (col) {
            delete col[rowIndex];
        }
    }

    
}





