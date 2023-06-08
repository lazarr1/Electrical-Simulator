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
    * 
    *      Member functions:
    *       - CreatenewResistr: Creates a resistor with 100 ohm resistance and sends information to server
    *       - CreateNewDCCurrent: Creates a new DCCurrent with a defaul 1Amp current and sends information to server
    *       - ConnectWires: Uses WireManager to sense anywire connections, and sends information to server
*/
class Circuit{
    constructor(){
        
        this.client = new Client(this);
        //This ensures that the ids of the server and client are the same. Will be updated, so the ids can
        //be aliased.
        this.idGenerator = 1;
        this.nodeIDGenerator = 1;

        //Store all components in a dictionary.
        this.Components = {}; //key : component name, val: component
        this.nodes = {}; //key : node name, val: node
        this.grounds = [];

        //Manages all the connections between components
        this.wireManager = new WireManager();

        //On mousedown, anywhere on the document update the server to match the current information.
        document.addEventListener('mousedown', this.mouseDown.bind(this));
    }

    setNodes(nodeVoltages){
        for (const nodeName in nodeVoltages){
            const nodeID = nodeName.split('N')[1];
            if(nodeID in this.nodes){
                this.nodes[nodeID].setVoltage(nodeVoltages[nodeName]);
            }
        }
    }

    createNewResistor(){
        const type = "Resistor"
        const newComp = new CircuitComponent(this.idGenerator++,2,type);
        this.Components[this.idGenerator -1] = newComp;

        //Position the nodes in the correct position relative to the resistor. 
            //A less dodgy way needs to be found for this.
        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            const x = 20.5;
            const y = i * 80;
            const nNode = new Node(x,y, newComp, this.wireManager, this.nodeIDGenerator++);
            
            //Store the node in the circuit's list of nodes 
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator-1] = nNode
        }

        //Tell the server to create a resistor
        this.client.SendCreateMessage(type);

    }


    createNewDCurrent(){
        const type = "DCCurrent"
        const newComp = new CircuitComponent(this.idGenerator++,2,type);
        this.Components[this.idGenerator -1] = newComp;

        //Position the nodes in the correct position relative to the resistor. 
            //A less dodgy way needs to be found for this.
        for (let i = 0; i < 2; i++) {
            //Position Nodes Correctly
            const x = 20.5;
            const y = (i) * 80;
            const nNode = new Node(x,y, newComp, this.wireManager, this.nodeIDGenerator++);

            //Store the node in the circuit's list of nodes 
            newComp.nodes.push(nNode);
            this.nodes[this.nodeIDGenerator-1] = nNode
        }
        //Tell the server to create a DCCurrent
        this.client.SendCreateMessage(type);

    }

    createGroundNode(){
        const type = "Ground";
        //Do not associate a unique id to ground nodes and "components"
        const newComp = new CircuitComponent("G",1, type); 

        const x = 20.5;
        const y = 0;

        const nNode = new Node(x,y,newComp, this.wireManager, "G");

        newComp.nodes.push(nNode);
        //Store grounded nodes sperately
        this.grounds.push(newComp);

        
    }
    GetConnections(){
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
                    //If a wire was found to be connected, append this component to the wires' list of connected components
                    const wire =this.wireManager.wireGrid[pos];
                    wire.connectedNodes.push(node);

                } 

            }
        }
        
        console.log(this.wireManager.wireGrid);


    }
    sendCircuitInfo(){
        for(const wireID in this.wireManager.wires){
            const wire = this.wireManager.wires[wireID];

            const [baseNode, ...toConnectNodes] = wire.connectedNodes;

            toConnectNodes.forEach(n => 
                this.client.SendConnectNodesMSG("N" + baseNode.id, "N" + n.id)
            );
        }

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

    mouseDown(){
        this.GetConnections();
        this.sendCircuitInfo();
        this.client.SendRunMSG();
    }




}

export default Circuit
