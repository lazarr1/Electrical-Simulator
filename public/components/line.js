
function roundCoords(x,y){
    return [Math.round(x/20)*20, Math.round(y/20)*20];
}

class line{
    // Start and End are coordinates [x1,y1] and [x2,y2]
    constructor(start, end, wire,offset){
        this.line = document.createElement("div");
        this.line.classList.add('wire');
        // document.body.appendChild(this.line);
        this.line.connectedNodes = [];
        
        this.start = start;
        this.end = end;

        this.wire = wire;

        this.offset = offset;

        wire.element.appendChild(this.line);

        this.handleKeyDown = this.handleKeyDown.bind(this)
        // this.element.addEventListener("mousedown", this.onMouseDown.bind(this))
        this.line.addEventListener("mouseover", this.onMouseOver.bind(this));

    }
    onMouseOver(){
        this.line.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        document.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(event){
        if( event.keyCode === 8){
            this.line.remove();
            delete this;
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
    }

    updateEnd(end){
        this.end = end;
    }

    onMouseDown(){
        //Virtual Function
    }

    delete(){
        this.line.remove();
        delete this;
    }



}

class hline extends line{

    Draw(){

        if(!this.offset){
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
    
    Merge(wire){
        
    }

}

class vline extends line{
    Draw(){
        const delta = this.end[1] - this.start[1]
        this.line.style.height = `${Math.abs(delta)}px`;

        if(!this.offset){
            this.line.style.left = `${this.end[0]}px`;
        }
        else{

            this.line.style.left = `${this.start[0]}px`;
        }


        if(delta <= 0){
            this.line.style.top = `${this.end[1]}px`;
        }
        else{
            this.line.style.top = `${this.start[1]}px`;
        }

    }
}

export {vline, hline}
