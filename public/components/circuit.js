import WireManager from "./wire.js";
import CircuitComponent from "./components.js";
import Node from "./nodes.js";

class Circuit{

    constructor(){
        this.idGenerator = 1;
        this.nodeIDGenerator = 1;

        this.Components = {};
        this.nodes = {};

        this.wireManager = new WireManager();


    }

    createNewResistor(){
        let newComp = new CircuitComponent(this.idGenerator++,2,"Resistor");
        this.Components[this.idGenerator -1] = newComp;

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            let x = (i) * 125;
            let y = 30;
            let nNode = new Node(x,y, newComp, this.wireManager, this.nodeIDGenerator++);
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
            let nNode = new Node(x,y, newComp, this.wireManager, this.nodeIDGenerator++);
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator++] = nNode
        }


    }

    




}

export default Circuit