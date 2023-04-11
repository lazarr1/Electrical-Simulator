import WireManager from "./wire.js";
import CircuitComponent from "./components.js";
import Node from "./nodes.js";

class Circuit{

    constructor(){
        this.idGenerator = 0;
        this.nodeIDGenerator = 0;

        this.Components = {};
        this.nodes = {};

        this.wireManager = new WireManager();


    }

    createNewComponent(type, nodeCount){

        this.Components[this.idGenerator +1] = new CircuitComponent(++this.idGenerator,type, 2, this.wireManager)

    }

    createNewResistor(){
        let newComp = new CircuitComponent(this.idGenerator++,2,"Resistor");
        this.Components[this.idGenerator -1] = newComp;

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            let x = (i) * 125;
            let y = 30;
            let nNode = new Node(x,y, newComp, this.wireManager);
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator++] = nNode
        }

    }

    createNewDCurrent(){
        
        let newComp = new CircuitComponent(this.idGenerator++,2,"DCurrent");
        this.Components[this.idGenerator -1] = newComp;

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            let x = 47.5;
            let y = (i) * 100;
            let nNode = new Node(x,y, newComp, this.wireManager);
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator++] = nNode
        }


    }

    




}

export default Circuit