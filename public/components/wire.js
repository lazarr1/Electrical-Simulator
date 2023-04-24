import {hline, vline} from './line.js'

class WireManager{

    constructor(){

        //This will store the node that is currently being drawn

        this.currentlyDrawing = undefined;
        this.connections = {};

        //listen to all mouse ups and downs
        document.addEventListener('mousedown', this.mouseDown);
        document.addEventListener('mouseup', this.mouseUp);

        document.addEventListener('mousemove', this.mouseMove);


    }

    Start(node1){

        this.connections[node1] = new Wire(node1);
    }

    End(node2){
        // this.node2 = node2;
        // this.connections[this.node1] = new Wire(this.node1,this.node2);
    }
}

export default WireManager

class Wire{

    constructor(node1){
        this.connections = {}
        if(node1 !== undefined){
            this.connections[node1] = node1;
        }
        this.defined = false;
        this.drawing = true;

        this.start = node1.getPos();

        this.handleMouseMoveBound = this.handleMouseMove.bind(this);
        this.handleMouseUpBound = this.handleMouseUp.bind(this);

        document.addEventListener("mouseup",  this.handleMouseUpBound);
        document.addEventListener("mousemove", this.handleMouseMoveBound);
        this.element = document.createElement('wireParent');

    }
    handleMouseUp(){
        this.drawing = false;
        document.removeEventListener("mouseup",  this.handleMouseUpBound);
        document.removeEventListener("mousemove",this.handleMouseMoveBound);

    }
    Draw(){
        if(this.hline !== undefined){
            this.hline.Draw();
        }
        if(this.vline !== undefined){
            this.vline.Draw();
        }
    }

    handleMouseMove(event){
        this.end = [event.clientX, event.clientY];

        if(!this.defined){
            if(this.end[0] !== this.start[0]){

                this.defined = true;
                this.hline = new hline(this.start,this.end,this,true);
                this.vline = new vline(this.start,this.end,this,false);
            }
            else if(this.end[1] !== this.start[1]){
                this.vline = new vline(this.start,this.end,this,true);
                this.hline = new hline(this.start,this.end,this,false);
                this.defined = true;
            }
        }
        else{

            this.hline.updateEnd(this.end);
            this.vline.updateEnd(this.end);
        }

  
        this.Draw();

    }




}

