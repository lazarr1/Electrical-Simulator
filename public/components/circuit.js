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

        document.addEventListener('mousedown', this.mouseDown.bind(this));
    }


    createNewResistor(){
        const type = "Resistor"
        let newComp = new CircuitComponent(this.idGenerator++,2,type);
        this.Components[this.idGenerator -1] = newComp;

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            let x = 20.5;
            let y = i * 80;
            let nNode = new Node(x,y, newComp, this.wireManager, this.nodeIDGenerator++);
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator] = nNode
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
            this.nodes[this.nodeIDGenerator] = nNode
        }

        this.client.SendCreateMessage(type);

    }

    ConnectWires(){

        this.wireManager.getConnections();
        for(const i in this.Components){
            const component = this.Components[i];
            // console.log(component);
            for(const iNode in component.nodes){
                const node = component.nodes[iNode];
                const pos = node.getPos();

                if (pos in this.wireManager.connections){
                 
                    const wire =this.wireManager.connections[pos];
                    // console.log(wire);
                    // console.log(wire.connectedNodes);
                    wire.connectedNodes.push(component);
                    console.log(wire.connectedNodes);

                } 

            }
        }

    }
    
    mouseDown(){
        this.ConnectWires();
    }




}

export default Circuit