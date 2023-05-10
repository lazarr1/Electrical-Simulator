import {hline, vline} from './line.js'

class wireNode{
    constructor(x,y,nodes){
        this.x = x;
        this.y = y;
        
    }
}

function roundCoords(x,y){
    return [Math.round(x/20)*20, Math.round(y/20)*20];
}


class WireManager{

    constructor(){

        //This will store the node that is currently being drawn

        this.currentlyDrawing = undefined;
        this.connections = {}; // Key : (x,y) --> Value: representative node

        //listen to all mouse ups and downs
        document.addEventListener('mousedown', this.mouseDown);
        document.addEventListener('mouseup', this.mouseUp);

        document.addEventListener('mousemove', this.mouseMove);


    }

    getConnections(){

        const collection = document.getElementsByClassName("wire");
        
        for (let i =0; i < collection.length; i++){
            
            console.log(collection[i]);
            this.mapWireLine(collection[i]);
        }

        console.log(this.connections);

    }
    Start(node1){

        this.connections[node1] = new Wire(node1);
        this.getConnections();

    }

    mapWireLine(wire){
        const pos = wire.getBoundingClientRect();


        // console.log(0,10);
        for (let i = pos.x; i <= pos.x+pos.width- pos.height; i+=20){
        console.log(i,pos.y);
            this.connections[ [i,pos.y] ] = true;
        }

        for (let i = pos.y; i <= pos.y+pos.height-pos.width; i+=20){
        console.log(pos.x,i);
            this.connections[ [pos.x,i ]] = true;
        }
    }

}

export default WireManager

class Wire{

    constructor(node1){

        this.connections = {}

        this.connections[node1] = node1;

        this.defined = false;

        let x = node1.getPos()[0]; 
        let y = node1.getPos()[1];

        this.start = [Math.round(x/20)*20, Math.round(y/20)*20]

        this.handleMouseMoveBound = this.handleMouseMove.bind(this);
        this.handleMouseUpBound = this.handleMouseUp.bind(this);

        document.addEventListener("mouseup",  this.handleMouseUpBound);
        document.addEventListener("mousemove", this.handleMouseMoveBound);
        this.element = document.createElement('wireParent');
        
        this.element.addEventListener("mousedown", this.handleMouseDown.bind(this));

        document.body.appendChild(this.element);


    }
    handleMouseDown(){
        document.addEventListener("mouseup",  this.handleMouseUpBound);
        document.addEventListener("mousemove", this.handleMouseMoveBound);
    }

    handleMouseUp(){
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
        this.end = [Math.round(event.clientX/20)*20, Math.round(event.clientY/20)*20];


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

