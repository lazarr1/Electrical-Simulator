import WireManager from "./wire.js";
import CircuitComponent from "./components.js";
import Node from "./nodes.js";
import Client from "../client/client.js";

/*  Class: Circuit
    *      This class manages all the components, manages any changes to the components and 
    *      forwards any changes made to the server, it also detects any connections between 
    *      components before sending the data to the server.
    *
    * 
    *       - CreatenewResistr: Creates a resistor with 100 ohm resistance and sends information to server
    *       - CreateNewDCCurrent: Creates a new DCCurrent with a defaul 1Amp current and sends information to server
    *       - ConnectWires: Uses WireManager to sense anywire connections, and sends information to server
*/
class Circuit{
    constructor(){
        this.client = new Client(this);

        //Store all components
        this.Components = [];
        this.nodes = []; 
        this.grounds = [];

        //Manages all the connections between components
        this.wireManager = new WireManager();
    }

    setNodes(nodeVoltages){
        //Set nodes to match the server.
        for (const nodeName in nodeVoltages){
            const nodeID = nodeName.split('N')[1] - 1;
            if(nodeID < this.nodes.length){
                this.nodes[nodeID].setVoltage(nodeVoltages[nodeName]);
            }
            else{
                console.error("Massive Bug, server thinks there are more nodes than actually exist");
            }
        }
    }

    createNewResistor(){
        const type = "Resistor";
        const newComp = new CircuitComponent(2,type,this);
        this.Components.push(newComp);

        //Position the nodes in the correct position relative to the resistor. 
        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            const x = 20.5;
            const y = i * 80;
            const nNode = new Node(x,y, newComp, this.wireManager);
            
            //Store the node in the circuit's list of nodes 
            newComp.nodes.push(nNode);
        }
    }

    createNewDCurrent(){
        const type = "DCCurrent"
        const newComp = new CircuitComponent(2,type,this);
        this.Components.push(newComp);

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            const x = 20.5;
            const y = (i) * 80;
            const nNode = new Node(x,y, newComp, this.wireManager);

            //Store the node in the circuit's list of nodes 
            newComp.nodes.push(nNode);
        }
    }
    
    createNewCapacitor(){
        const type = "Capacitor";
        const newComp = new CircuitComponent(2, type, this);

        this.Components.push(newComp);

        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            const x = 20.5;
            const y = (i) * 80;
            const nNode = new Node(x,y, newComp, this.wireManager);

            //Store the node in the circuit's list of nodes 
            newComp.nodes.push(nNode);
        }

    }

    createGroundNode(){
        const type = "Ground";
        const newComp = new CircuitComponent(1, type,this);

        const x = 20.5;
        const y = 0;
        const nNode = new Node(x,y,newComp, this.wireManager, "G");

        newComp.nodes.push(nNode);

        //Store grounded nodes sperately
        this.grounds.push(newComp);
    }

    getConnections(){
        //Iterates through every node in the Circuit and checks if the node is connected to any wires
        this.wireManager.getConnections();
        for(const i in this.Components){
            const component = this.Components[i];
            //Iterate through every node of the component 
            for(const iNode in component.nodes){

                //Get position of the node and check its position agains the wireMangers
                // dictionary of all wire locations
                const node = component.nodes[iNode];
                const pos = node.getPos();

                if (pos in this.wireManager.wireGrid){
                    //If a wire was found to be connected, append this node to the wires' list of connected components
                    const wire =this.wireManager.wireGrid[pos];
                    wire.connectedNodes.push(node);

                } 
            }
        }
        
    }

    sendCircuitInfo(){
        for(const wireID in this.wireManager.wires){
            const wire = this.wireManager.wires[wireID];

            const [baseNode, ...toConnectNodes] = wire.connectedNodes;

            toConnectNodes.forEach(n => 
                this.client.SendConnectNodesMSG("N" + baseNode.id, "N" + n.id)
            );
        }

        //Ground nodes
        for(const ground in this.grounds){
            const node = this.grounds[ground].nodes[0];
            const pos = node.getPos();

            if(pos in this.wireManager.wireGrid){
                const nodes = this.wireManager.wireGrid[pos].connectedNodes;

                //Ground the first node, this should ground all the others
                const nodeToGround = nodes[0];
                nodeToGround && this.client.SendGroundNodeMSG("N" + nodeToGround.id);
            }
        }
    }

    UpdateComponents(){
        //give each node an associated ID, to assign correct node voltages to correct nodes
        let newNodeID = 1;
        this.nodes = [];
        for(let iComponentLoc =0; iComponentLoc < this.Components.length; iComponentLoc++){
            const iComponent = this.Components[iComponentLoc];
            for(const iNode of iComponent.nodes){
                iNode.id = newNodeID++;
                this.nodes.push(iNode);
            }
        }
    }

    sendComponents(){
       this.UpdateComponents();
        for(let iComponentLoc =0; iComponentLoc < this.Components.length; iComponentLoc++){
            const iComponent = this.Components[iComponentLoc];
            this.client.SendCreateMessage(iComponent.type);
        }
    }

    DeleteComponent(component){
        const index = this.Components.indexOf(component);
        if (index > -1) { 
            this.Components.splice(index, 1); 
        }
        else{
            console.error("A COMPONENT WAS NOT DELETED CORRECTLY!!!");
        }
    }
    
    DeleteGround(ground){
        const index = this.grounds.indexOf(ground);
        if (index > -1) { 
            this.grounds.splice(index, 1);
        }
        else{
            console.error("A GROUND COMPONENT WAS NOT DELETED CORRECTLY!!!");
        }
    }

    simulate(){
        this.sendComponents();
        this.getConnections();
        this.sendCircuitInfo();
        this.client.SendRunMSG();
    }
}

export default Circuit
