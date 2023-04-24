import WireManager from "./wire.js";
import CircuitComponent from "./components.js";
import Node from "./nodes.js";

class Circuit{

    constructor(client){
        this.client = client;
        this.idGenerator = 1;
        this.nodeIDGenerator = 1;

        this.Components = {};
        this.nodes = {};

        this.wireManager = new WireManager();


    }

    createNewResistor(){
        const type = "Resistor"
        let newComp = new CircuitComponent(this.idGenerator++,2,type);
        this.Components[this.idGenerator -1] = newComp;

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            let x = (i) * 90;
            let y = 12.5;
            let nNode = new Node(x,y, newComp, this.wireManager, this.nodeIDGenerator++);
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator++] = nNode
        }

        this.client.SendCreateMessage(type);

    }

    createNewDCurrent(){
        const type = "DCCurrent"
        let newComp = new CircuitComponent(this.idGenerator++,2,type);
        this.Components[this.idGenerator -1] = newComp;

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            let x = 20.5;
            let y = (i) * 80;
            let nNode = new Node(x,y, newComp, this.wireManager, this.nodeIDGenerator++);
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator++] = nNode
        }

        this.client.SendCreateMessage(type);

    }

    




}

export default Circuit