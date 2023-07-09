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
        this.wireGrid = {}; // Key : (x,y) position --> Value: representative wire
        this.wireSet = {}; //Key : int (wire position) --> Value: array of connected wire ids;
        this.handleMouseMoveBound = this.handleMouseMove.bind(this);
        this.handleMouseUpBound = this.handleMouseUp.bind(this);
        this.drawing = false;

    }

    getConnections() {
        //Hard resets all connections and the wiregrid stored by the wire manager, 
            //and recalculates everything.
            //if application gets too slow its probably this function
        this.wireGrid = {};

        //disjoint set of all wires
        this.wireSet = {};
        for(const key in this.wires){
            const wire = this.wires[key]; 
            this.mapWireLine(wire);
        }
        this.flattenWireSet();
        
    }

    setNodes(nodes){
        this.nodes = nodes;
        this.nodeMap = [];
        this.nodes.forEach(node => {
            this.nodeMap[node.getPos()] = node;
        });
    }


    findStrongNode(id){

        for(const iWireKey in this.strongWires){
            const set = this.strongWires[iWireKey];
            if(set.has(id)){
                return iWireKey;
            }
        }
 
        return -1;
    }


    setWireVoltage(node){
        if(node.getPos() in this.wireGrid){
            const wireID = this.wireGrid[node.getPos()].id;
            const strongWireKey = this.findStrongNode(wireID);
            if(strongWireKey > -1){
                this.strongWires[strongWireKey].forEach(id =>{
                    this.wires[id].setVoltage(node.getVoltage());
                })
                delete this.strongWires[strongWireKey];
            }
        }
    }
    
    DfsHelper(pos){

        //This DFS may jump into a different grid that happens to be 1 jump away from the wire currently being DFSed
        //this will make sure only the currentWire gets iterated
        if(!(this.currentWire.has(this.wireGrid[pos].id))){
            return;
        }

        if(pos in this.nodeMap){
            this.connectedNodes.push(this.nodeMap[pos]);
        }


        const pos1 = [pos[0] + 20, pos[1]]; 
        const pos2 = [pos[0], pos[1]+20]; 
        const pos3 = [pos[0] - 20, pos[1]]; 
        const pos4 = [pos[0],pos[1]-20];

        if(pos1 in this.wireGrid && !(pos1 in this.travelledNodes) ) {
            this.travelledNodes[pos1] = true;
            this.DfsHelper(pos1);
        }
        if(pos2 in this.wireGrid && !(pos2 in this.travelledNodes)){
            this.travelledNodes[pos2] = true;
            this.DfsHelper(pos2);
        }
        if(pos3 in this.wireGrid && !(pos3 in this.travelledNodes)){
            this.travelledNodes[pos3] = true;
            this.DfsHelper(pos3);
        }
        if(pos4 in this.wireGrid && !(pos4 in this.travelledNodes)){
            this.travelledNodes[pos4] = true;
            this.DfsHelper(pos4);
        }

    }

    findConnectedNodesDFS(node){
        this.connectedNodes = [];
        this.travelledNodes = {};
        const startPos = node.getPos();

        if(startPos in this.wireGrid){
            //To ensure the DFS only interates over the connected wires 
            this.currentWire = this.strongWires[this.findStrongNode(this.wireGrid[startPos].id)]; 
            this.DfsHelper(startPos);

            //remove the current node from the connectednode list
            this.connectedNodes.splice(0,1);
        }

        node.setConnectedNodes(this.connectedNodes);
        return this.connectedNodes;

    }

    Start(node1) {
        //semaphore to prevent race condition if the user was to click on a node to end the
        //drawing of another node
        if(!this.drawing){
            this.drawing = true;
            this.InitialiseWire(node1.getPos());
        }   
    }
    

    InitialiseWire(start){
        //This boolean will define if the the wire will come out like an L or an F (without the middle line)
        //Based on the users mouse movements
        this.defined = false;

        const nHWire = new hline(start,start,false,++this.wireIdGenerator,this);
        this.wires[nHWire.id] = nHWire;

        const nVWire = new vline(start,start,false,++this.wireIdGenerator, this);
        this.wires[nVWire.id] = nVWire;


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

        this.drawing = false;
        this.getConnections();

        if(vline){
            this.checkMerge(vline);
        }
        if(hline){
            this.checkMerge(hline);
        }
    }


    checkMerge(line){
        const strongWireKey = this.findStrongNode(line.id);
        if(strongWireKey > -1){
        console.log(this.strongWires[strongWireKey]);
            this.strongWires[strongWireKey].forEach(id =>{
                line.merge(this.wires[id]);
            })
        }
    }

    mapWireLine(wire) {
        //wire grid is an occupancy map, whereas the wireSet stores all connected wires after
            // a point that is occupied.
        const pos = wire.line.getBoundingClientRect();
        this.wireSet[wire.id] = [wire.id];

        for (let i = pos.x; i <= pos.x + pos.width - pos.height; i += 20) {
            if (!([i, pos.y] in this.wireGrid)) {
                this.wireGrid[[i, pos.y]] = wire;
            } else {
                this.wireSet[this.wireGrid[[i,pos.y]].id].push(wire.id);
            }
        }

        for (let i = pos.y; i <= pos.y + pos.height - pos.width; i += 20) {
            if (!([pos.x, i] in this.wireGrid)) {
                this.wireGrid[[pos.x, i]] = wire;
            } else {
                this.wireSet[this.wireGrid[[pos.x,i]].id].push(wire.id);
            }
        }
    }

    flattenWireSet(){
        //get Strongly Connected wires
        this.strongWires = [];

        while (Object.keys(this.wireSet).length>0){
            const firstKey = Object.keys(this.wireSet)[0];
            let firstSet = this.wireSet[firstKey];
            
            firstSet = new Set(firstSet);
            delete this.wireSet[firstKey];

            let prevLength = -1;

            while(firstSet.size > prevLength){
                prevLength = firstSet.size;

                for(const rKey in this.wireSet){
                    const mergeSet = new Set(this.wireSet[rKey]);
                    const intersection = new Set(
                        [...firstSet].filter(x => mergeSet.has(x)));
                    if(intersection.size > 0){
                        firstSet = new Set([...firstSet, ...mergeSet]);
                        delete this.wireSet[rKey];
                    }
                }

            }
            this.strongWires.push(firstSet);
        }

    }


    deleteWire(wireID){
        wireID in this.wires && delete this.wires[wireID];
    }
}

export default WireManager;
