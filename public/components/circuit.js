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
        
        this.inSim = false;
        this.Components = [];
        this.nodes = []; 
        this.grounds = [];

        this.playbutton = document.getElementById("playbutton");
        this.playbutton.onclick = () => {
            if (!this.inSim) {
                this.run();
            }
        };

        //Manages all the connections between components
        this.wireManager = new WireManager();
    }

    run(){
        console.log("Simulating circuit");
        this.simulate();
    }

    clearInSimFlag(){
        console.log("Clearing inSim flag");
        this.inSim = false;
        this.playbutton.style.backgroundImage = "url('components/images/play.png')";
    }

    okButtonOff(){
        this.okDiv.classList.add("notOk");
    }   
    okButtonOn(){
        this.okDiv.classList.remove("notOk");
    }
    ErrorMsg(){
 //       this.okButtonOff();
    }

    setNodes(nodeVoltages){
//        this.okButtonOn();
        //Set nodes to match the server.
        for (const nodeName in nodeVoltages){
            const nodeID = nodeName.split('N')[1] - 1;
            if(nodeID < this.nodes.length && this.nodes[nodeID] !== undefined){
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
        this.enableComponentDragToPlace(newComp)
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
        this.enableComponentDragToPlace(newComp)
    }
    
    createNewVoltageSource(){
        const type = "VoltageSource"
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
        this.enableComponentDragToPlace(newComp)
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
        this.enableComponentDragToPlace(newComp)
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
        this.enableComponentDragToPlace(newComp)
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
        this.enableComponentDragToPlace(newComp)
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
        if(!this.inSim){
            this.inSim = true;
            this.playbutton.style.backgroundImage = "url('components/images/play_running.png')";
            this.sendComponents();
            this.getConnections();
            this.sendNodeConnections();
            this.client.SendRunMSG();
            // this.inSim will be cleared by the websocket response
        }
    }

    // Drag-and-drop placement for a component after it is created
    enableComponentDragToPlace(component) {
        if (this._draggingComponent) return;
        this._draggingComponent = component;
        const elem = component.element;
        elem.style.position = 'absolute';
        elem.style.pointerEvents = 'none';
        elem.style.zIndex = 10000;
        elem.style.display = 'none'; // Hide initially
        let shown = false;
        // Show and move on first mousemove
        const moveHandler = (e) => {
            if (!shown) {
                elem.style.display = '';
                shown = true;
            }
            const rootRect = document.getElementById('root').getBoundingClientRect();
            const mx = e.clientX - rootRect.left;
            const my = e.clientY - rootRect.top;
            const gx = Math.round(mx / 20) * 20;
            const gy = Math.round(my / 20) * 20;
            elem.style.left = (gx - elem.offsetWidth/2) + 'px';
            elem.style.top = (gy - elem.offsetHeight/2) + 'px';
        };
        document.addEventListener('mousemove', moveHandler);
        // Drop on click
        const dropHandler = (e) => {
            if (shown !== true){
                escHandler({key: 'Escape'});
            }
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mousedown', dropHandler, true);
            document.removeEventListener('keydown', escHandler, true);
            // Snap to grid on drop
            const rootRect = document.getElementById('root').getBoundingClientRect();
            const mx = e.clientX - rootRect.left;
            const my = e.clientY - rootRect.top;
            const gx = Math.round(mx / 20) * 20;
            const gy = Math.round(my / 20) * 20;
            elem.style.left = (gx - elem.offsetWidth/2) + 'px';
            elem.style.top = (gy - elem.offsetHeight/2) + 'px';
            elem.style.pointerEvents = '';
            elem.style.zIndex = '';
            this._draggingComponent = null;
        };
        // Cancel on esc/delete
        const escHandler = (e) => {
            if (e.key === 'Escape' || e.key === 'Delete' || e.key === 'Backspace') {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mousedown', dropHandler, true);
                document.removeEventListener('keydown', escHandler, true);
                if (elem && elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                }
                const idx = this.Components.indexOf(component);
                if (idx > -1) this.Components.splice(idx, 1);
                this._draggingComponent = null;
            }
        };
        setTimeout(() => {
            document.addEventListener('mousedown', dropHandler, true);
            document.addEventListener('keydown', escHandler, true);
        }, 0);
    }
}

export default Circuit
