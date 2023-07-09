
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
        this.connectedWires = [];
        this.start = start;
        this.end = end;
        this.wm = wm;
        this.offset = offset;
        this.DC_voltage = 0;

        this.node = false;

        //Implement hover over, showing voltage at the wire functionality
        // The css will handle the display of the tooltip text
        this.line.classList.add('tooltip');
        this.hover_info = document.createElement("span");
        this.hover_info.classList.add('tooltiptext');
        this.hover_info.innerHTML = "DC: " + this.DC_voltage;
        this.line.appendChild(this.hover_info);

        //Store all bindings
        this.keyDownBind = this.handleKeyDown.bind(this);
        this.mouseOverBind = this.onMouseOver.bind(this);
        this.mouseLeaveBind = this.onMouseLeave.bind(this);
        this.mouseMoveBind = this.handleMouseMove.bind(this);
        this.line.addEventListener("mouseover", this.mouseOverBind);

    }

    setVoltage(voltage){
        this.DC_voltage = voltage;
    }
    

    onMouseOver(event){
        this.line.addEventListener("mouseleave", this.mouseLeaveBind);
        document.addEventListener("keydown", this.keyDownBind);
        this.line.addEventListener("mousemove", this.mouseMoveBind);

        this.hover_info.innerHTML = "DC: " + this.DC_voltage;
        this.hover_info.style.left = `${event.clientX - 10}px`;
        this.hover_info.style.top = `${event.clientY}px`;
    }

    handleKeyDown(event){
        //If backspace while hovering
        if(event.keyCode === 8){
            this.delete();
        }
    }

    onMouseLeave(){
        document.removeEventListener("keydown",this.keyDownBind);
        this.line.removeEventListener("mouseleave", this.mouseLeaveBind);
        this.line.removeEventListener("mousemove", this.mouseMoveBind);
    }

    handleMouseMove(event){
        this.hover_info.style.left = `${event.clientX + 10}px`; 
        this.hover_info.style.top = `${event.clientY}px`;
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

    delete(){
        //This was a mistake
        this.line.removeEventListener("mouseover",this.mouseOverBind);
        delete this.mouseOverBind;
        this.onMouseLeave();
        delete this.keyDownBind;
        delete this.mouseLeaveBind;
        delete this.mouseMoveBind;

        delete this.connectedWires;
        this.line.remove();
        this.line.removeChild(this.line.lastChild);
        delete this.line;

        this.wm.deleteWire(this.id);
        this.hover_info.remove();
        delete this.hover_info;

        delete this;
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

        if(!wire)
            return;

        const thisPos = this.line.getBoundingClientRect();
        const wirePos = wire.line.getBoundingClientRect();

        if(thisPos.y !== wirePos.y){
            return;
        }

        if(wire !== this && wire.line.style.height == this.line.style.height){
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
        if(!wire)
            return;

        const thisPos = this.line.getBoundingClientRect();
        const wirePos = wire.line.getBoundingClientRect();

        if(thisPos.x !== wirePos.x){
            return;
        }
        if(wire !== this && wire.line.style.width == this.line.style.width){
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
