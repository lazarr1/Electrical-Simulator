import { hline, vline } from "./line.js";

function roundCoords(x, y) {
    return [Math.round(x / 20) * 20, Math.round(y / 20) * 20];
}

class WireManager {
    constructor() {
        //This will store the node that is currently being drawn

        this.currentlyDrawing = undefined;
        this.connections = {}; // Key : (x,y) --> Value: representative node
        this.wires = [];
    }

    getConnections() {
        const collection = document.getElementsByClassName("wire");
        this.connections = {};
        this.mergeWires();
        for (let i = 0; i < collection.length; i++) {
            collection[i].connectedNodes = [];
            this.mapWireLine(collection[i]);
        }
    }
    Start(node1) {
        this.wires.push(new Wire(node1));

        this.getConnections();
        this.mergeWires();
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

//This class initially draws the wire, and then keeps track of all nodes connected to the wire
class Wire {
    constructor(node1) {
        this.defined = false;

        let x = node1.getPos()[0];
        let y = node1.getPos()[1];

        this.start = [Math.round(x / 20) * 20, Math.round(y / 20) * 20];

        this.handleMouseMoveBound = this.handleMouseMove.bind(this);
        this.handleMouseUpBound = this.handleMouseUp.bind(this);

        document.addEventListener("mouseup", this.handleMouseUpBound);
        document.addEventListener("mousemove", this.handleMouseMoveBound);
        this.element = document.createElement("wireParent");

        // this.element.addEventListener("mousedown", this.handleMouseDown.bind(this));

        document.body.appendChild(this.element);
    }

    handleMouseUp() {
        document.removeEventListener("mouseup", this.handleMouseUpBound);
        document.removeEventListener("mousemove", this.handleMouseMoveBound);
    }
    Draw() {
        if (this.hline !== undefined) {
            this.hline.Draw();
        }
        if (this.vline !== undefined) {
            this.vline.Draw();
        }
    }

    handleMouseMove(event) {
        this.end = [
            Math.round(event.clientX / 20) * 20,
            Math.round(event.clientY / 20) * 20,
        ];

        if (!this.defined) {
            if (this.end[0] !== this.start[0]) {
                this.defined = true;
                this.hline = new hline(this.start, this.end, this, true);
                this.vline = new vline(this.start, this.end, this, false);
            } else if (this.end[1] !== this.start[1]) {
                this.vline = new vline(this.start, this.end, this, true);
                this.hline = new hline(this.start, this.end, this, false);
                this.defined = true;
            }
        } else {
            this.hline.updateEnd(this.end);
            this.vline.updateEnd(this.end);
        }

        this.Draw();
    }
}
