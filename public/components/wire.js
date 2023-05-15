import { hline, vline } from "./line.js";

function roundCoords(x, y) {
    return [Math.round(x / 20) * 20, Math.round(y / 20) * 20];
}

class WireManager {
    constructor() {
        //This will store the node that is currently being drawn
        this.wireIdGenerator = 0;
        this.currentlyDrawing = undefined;
        this.wires = {}; //key : id --> Value : line representing the wire 
        this.wireGrid = {}; // Key : (x,y) --> Value: representative node
        this.handleMouseMoveBound = this.handleMouseMove.bind(this);
        this.handleMouseUpBound = this.handleMouseUp.bind(this);
        this.drawing = false;

    }

    getConnections() {
        //Hard resets all connections and the wiregrid stored by the wire manager, 
            //and recalculates everything.
            //if application gets too slow its probably this function
        this.wireGrid = {};
        for(const key in this.wires){
            const wire = this.wires[key]; 
            wire.connectedNodes = [];
            this.mapWireLine(wire);
        }
        
    }
    Start(node1) {
        this.drawing = true;
        this.InitialiseWire(node1.getPos());
    }

    InitialiseWire(start){
        //This Parameter will define if the the wire will come out like an L or an F (without the middle line)
        //Based on the users mouse movements
        this.defined = false;

        const nHWire = new hline(start,start,false,++this.wireIdGenerator,this);
        this.wires[nHWire.id] = nHWire;

        const nVWire = new vline(start,start,false,++this.wireIdGenerator, this);
        this.wires[nVWire.id] = nVWire;

        nHWire.addEndPointWire(nVWire);
        nVWire.addEndPointWire(nHWire);

        document.addEventListener("mouseup", this.handleMouseUpBound);
        document.addEventListener("mousemove", this.handleMouseMoveBound);



    }

    handleMouseMove(event){
        const end = roundCoords(event.clientX, event.clientY);  
        const hline = this.wires[this.wireIdGenerator-1];
        const vline = this.wires[this.wireIdGenerator];
        const start = hline.start;
        
        if(!(hline && vline)){
            return;
        }
        //If the user has not moved sufficiently far enough to determine the shape of the wire
        if(this.defined == false){
            if(end[0] !== start[0]){
                this.defined = true;
                vline.offset = true; //Offset the vline to start at the end of hline
            }
            else if(start[1] !== end[1]){
                this.defined = true;
                hline.offset = true; //Offset the hline to start at the end of the vline
            }

        }
        hline.updateEnd(end);
        vline.updateEnd(end);
    }

    handleMouseUp(event){
        document.removeEventListener("mouseup",this.handleMouseUpBound);
        document.removeEventListener("mousemove",this.handleMouseMoveBound);
       

        const end = roundCoords(event.clientX, event.clientY);  
        const hline = this.wires[this.wireIdGenerator-1];
        const vline = this.wires[this.wireIdGenerator];
        const start = hline.start || vline.start;
        
        if(hline && start[0] === end[0]){
            hline.delete();
        }
        if(vline && start[1] === end[1]){
            vline.delete();
        }
    }

    mapWireLine(wire) {
        const pos = wire.line.getBoundingClientRect();
        // console.log(wire);

        for (let i = pos.x; i <= pos.x + pos.width - pos.height; i += 20) {
            if (!([i, pos.y] in this.wireGrid)) {
                this.wireGrid[[i, pos.y]] = wire;
            } else {
                // console.log(this.wireGrid[i,pos.y])
                wire.connectedNodes = this.wireGrid[[i, pos.y]].connectedNodes;
            }
        }

        for (let i = pos.y; i <= pos.y + pos.height - pos.width; i += 20) {
            if (!([pos.x, i] in this.wireGrid)) {
                this.wireGrid[[pos.x, i]] = wire;
            } else {
                wire.connectedNodes = this.wireGrid[[pos.x, i]].connectedNodes;
            }
        }
    }

    mergeWires(wire1, wire2) {
        wire1.merge(wire2);        
    }

    deleteWire(wireID){
        wireID in this.wires && delete this.wires[wireID];
    }
}

export default WireManager;

