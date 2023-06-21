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


        document.addEventListener("mouseup", this.run.bind(this));
        document.addEventListener("keydown", this.run.bind(this));

        //Manages all the connections between components
        this.wireManager = new WireManager();
    }

    run(){
        this.simulate();
    }

    setNodes(nodeVoltages){
        //Set nodes to match the server.
        for (const nodeName in nodeVoltages){
            const nodeID = nodeName.split('N')[1] - 1;
            if(nodeID < this.nodes.length){
                this.nodes[nodeID].setVoltage(nodeVoltages[nodeName]);
                this.wireManager.setWireVoltage(this.nodes[nodeID]);
            }
            else{
                console.error("Massive Bug, server thinks there are more nodes than actually exist");
            }
        }
    }

    createNewResistor(){
        const type = "Resistor";
        const newComp = new CircuitComponent(2,type,this,100);
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
        const newComp = new CircuitComponent(2,type,this, 1);
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
        const newComp = new CircuitComponent(2, type, this, 0.1);

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

    createNewInductor(){
        const type = "Inductor";
        const newComp = new CircuitComponent(2, type, this, 0.1);

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
        this.parentNodes = [];
        this.childNodes = [];

        for(let iNode = 0; iNode < this.nodes.length; iNode++){
            if(this.childNodes.indexOf(this.nodes[iNode]) <= -1){
                this.parentNodes.push(this.nodes[iNode]);
                this.childNodes.push(this.wireManager.findConnectedNodesDFS(this.nodes[iNode]));
            }
        }
        
    }

    sendNodeConnections(){
        for(const iNode in this.parentNodes){
            const node = this.parentNodes[iNode];

            const [baseNode, ...toConnectNodes] = node.getConnectedNodes();

            toConnectNodes.forEach(n => 
                this.client.SendConnectNodesMSG("N" + baseNode.id, "N" + n.id)
            );
        }

        //Ground nodes
        for(const ground in this.grounds){
            const node = this.grounds[ground].nodes[0];
            const grounded = this.wireManager.findConnectedNodesDFS(node);

            if(grounded.length >0){
                const nodeToGround = grounded[0];
                nodeToGround && this.client.SendGroundNodeMSG("N" + nodeToGround.id);
            }
        }
    }

    UpdateNodes(){
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
        this.wireManager.setNodes(this.nodes);
    }

    sendComponents(){
       this.UpdateNodes();
        for(let iComponentLoc =0; iComponentLoc < this.Components.length; iComponentLoc++){
            const iComponent = this.Components[iComponentLoc];
            this.client.SendCreateMessage(iComponent.type, iComponent.getValue());
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
        this.sendNodeConnections();
        this.client.SendRunMSG();
    }
}

export default Circuit
