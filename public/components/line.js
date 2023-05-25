
/*  Class: line 
    * Base class for the hline and vline class. Defines the common functionality and key values
    *  for each and allows the hline and vline class to handle their own method of drawing.
    *  Each wire will store the two wires connected at end points and ensure it is connected to Each
    *  of them
    *      
    * The line class is used to represent the wires of the circuit.
    *      Member functions:
    */

    function roundCoords(x,y){
        return [Math.round(x/20)*20, Math.round(y/20)*20];
    }

class line{
    // Start and End are coordinates [x1,y1] and [x2,y2]
    constructor(start, end, offset,id, wm){
        this.id = id; 
        //Create html element
        this.line = document.createElement("div");
        this.line.classList.add('wire');
        document.body.appendChild(this.line);
        this.connectedNodes = [];
        this.endPointWires = []; 
        this.start = start;
        this.end = end;
        this.wm = wm;
        this.offset = offset;

        //Each line is a part of a bigger grouping of other lines known as a "wire"

        this.handleKeyDown = this.handleKeyDown.bind(this)
        // this.element.addEventListener("mousedown", this.onMouseDown.bind(this))
        this.line.addEventListener("mouseover", this.onMouseOver.bind(this));

    }
    onMouseOver(){
        this.line.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        document.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(event){
        //If backspace while hovering
        if( event.keyCode === 8){
            this.delete();
        }

    }
    onMouseLeave(){
        document.removeEventListener("keydown",this.handleKeyDown);
        this.line.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
    }



    Draw(){
        //Virtual function
    }

    updateStart(start){
        this.start = start;
       

        this.Draw();
    }

    updateEnd(end){
        this.end = end;
        this.Draw();
    }

    onMouseDown(){
        //Virtual Function
    }

    delete(){
        //Update any wires that are following this wire, that it no longer exits
        for (let i =0; i < this.endPointWires.length; i++){
            this.endPointWires[i].deleteEndPointWire(this);
        }
        this.line.remove();
        this.wm.deleteWire(this.id);
        delete this;
    }
    
    addEndPointWire(line){
        this.endPointWires.push(line); 
        if(this.endPointWires.length > 2){
            console.error("Too many end points!");   
        }
    }

    deleteEndPointWire(line){
        const index = this.endPointWires.indexOf(line);
        if (index > -1) { // only splice array when item is found
            this.endPointWires.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    merge(){
        //Virtual Function
    }

}


class hline extends line{

    Draw(){

        if(this.offset){
            this.line.style.top = `${this.end[1]}px`;
        }
        else{
            this.line.style.top = `${this.start[1]}px`;
        }

        const delta = this.end[0]-this.start[0];

        if(delta >= 0){        
            this.line.style.left = `${this.start[0]}px`;
        }
        else{
            this.line.style.left = `${this.end[0]}px`;
        }

        this.line.style.width = `${Math.abs(delta)}px`;

    }

    merge(wire){
        if(wire.line.width == this.line.width){
            const minX = Math.min(wire.start[0], wire.end[0], this.start[0], this.end[0]); 
            const maxX = Math.max(wire.start[0], wire.end[0], this.start[0], this.end[0]);

            const start = [minX, this.start[1]];
            const end = [maxX, this.end[1]];

            this.updateEnd(end);
            this.updateStart(start);


            wire.delete();
            
        }

    }

}

class vline extends line{
    Draw(){
        const delta = this.end[1] - this.start[1]
        this.line.style.height = `${Math.abs(delta)}px`;

        if(this.offset){
            this.line.style.left = `${this.end[0]}px`;
        }
        else{

            this.line.style.left = `${this.start[0]}px`;
        }


        if(delta <  0){
            this.line.style.top = `${this.end[1]}px`;
        }
        else{
            this.line.style.top = `${this.start[1]}px`;
        }


    }
    merge(wire){

        if(wire.line.height == this.line.height){
            const minY = Math.min(wire.start[1], wire.end[1], this.start[1], this.end[1]); 
            const maxY = Math.max(wire.start[1], wire.end[1], this.start[1], this.end[1]);

            const start = [this.start[0], minY];
            const end = [this.end[0], maxY];

            this.updateEnd(end);
            this.updateStart(start);


            wire.delete();
            
        }
    }
}

export {vline, hline}
