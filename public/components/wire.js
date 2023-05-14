import { hline, vline } from "./line.js";

function roundCoords(x, y) {
    return [Math.round(x / 20) * 20, Math.round(y / 20) * 20];
}

class WireManager {
    constructor() {
        //This will store the node that is currently being drawn
        this.wireIdGenerator = 1;
        this.currentlyDrawing = undefined;
        this.wires = {}; // Key : (x,y) --> Value: representative node
        this.handleMouseMoveBound = this.handleMouseMove.bind(this);
        this.handleMouseUpBound = this.handleMouseUp.bind(this);
        this.drawing = false;

    }

    getConnections() {
        this.mergeWires();
//        for (let i = 0; i < wires.length; i++) {
//            wires[i].connectednodes = [];
//            this.mapwireline(collection[i]);
//        }
    }
    Start(node1) {
        this.drawing = true;
        this.InitialiseWire(node1.getPos());
//        this.getConnections();
//       this.mergeWires();
    }

    InitialiseWire(start){
        //This Parameter will define if the the wire will come out like an L or an F (without the middle line)
        //Based on the users mouse movements
        this.defined = false;

        const nHWire = new hline(start,start,this,false,this.wireIdGenerator++);
        this.wires[this.wireIdGenerator] = nHWire;

        const nVWire = new vline(start,start,this,false,this.wireIdGenerator++);
        this.wires[this.wireIdGenerator] = nVWire;

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

        //If the user has not moved sufficiently far enough to determine the shape of the wire
        if(this.defined == false){
            if(end[0] !== start[0]){
                this.defined = true;
                hline.offset = true; //Offset the hline to start at the end of vline
            }
            else if(start[1] !== end[1]){
                this.defined = true;
                vline.offset = true; //Offset the vline to start at the end of the hline
            }

        }
        hline.updateEnd(end);
        vline.updateEnd(end);
    }

    handleMouseUp(event){
        document.removeEventListener("mouseup",this.handleMouseUpBound);
        document.removeEventListener("mousemove",this.handleMouseMoveBound);

        const end = roundCoords(event.clientX, event.clientY);
        const start = this.wires[this.wireIdGenerator].start;
       
        const hline = this.wires[this.wireIdGenerator-1];
        const vline = this.wires[this.wireIdGenerator];

        if(start[0] === end[0]){
            //Delete the wire in the case that the end did not vary from the start
            hline.delete();
            delete this[this.wireIdGenerator-1];
        }
        else{
            hline.updateEnd(end);
        }

        if(start[1] === end[1]){
            vline.delete();
            delete this.wires[this.wireIdGenerator];
        }
        else{
            vline.updateEnd(end);
        }
        
//        vline && this.mapWireLine(vline.line);
//        hline && this.mapWireLine(hline.line);
    }

    mapWireLine(wire) {
        const pos = wire.getBoundingClientRect();
        // console.log(wire);

        for (let i = pos.x; i <= pos.x + pos.width - pos.height; i += 20) {
            if (!([i, pos.y] in this.connections)) {
                this.connections[[i, pos.y]] = wire;
            } else {
                // console.log(this.connections[i,pos.y])
                wire.connectedNodes = this.connections[[i, pos.y]].connectedNodes;
            }
        }

        for (let i = pos.y; i <= pos.y + pos.height - pos.width; i += 20) {
            if (!([pos.x, i] in this.connections)) {
                this.connections[[pos.x, i]] = wire;
            } else {
                wire.connectedNodes = this.connections[[pos.x, i]].connectedNodes;
            }
        }
    }

    mergeWires() {

    }

}

export default WireManager;

