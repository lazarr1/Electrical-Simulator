import WireManager from "./wire.js";

/*  Class: Node: 
    *       This class defines the nodes for each component. Clicking on allows the user to create a wire that will connect 
    *       any nodes touching the same wire.
    *
    *       
    *      Member functions:
    *       - OnClick(): creates a wire starting at the node
*/
class Node {
    constructor(x, y, component, wireManager, id) {
        //Store the nodes unique ID to communicate with simulator
        this.id = id
        this.x = x;
        this.y = y;

        this.voltage = 0;
        //Create html element
        this.element = document.createElement("div");
        this.element.classList.add('node');
        component.element.appendChild(this.element);

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;

        this.mouseDownBind = this.mouseDown.bind(this);
        this.element.addEventListener("mousedown", this.mouseDownBind );

        //Store the associated component and wire manager
        this.parent = component;
        this.wm = wireManager;

        this.connectedNodes = [];

    }

    resetConnectedNodes(){
        this.connectedNodes = [];
    }

    addConnectedNode(node){
        this.connectedNodes.push(node);
    }

    setConnectedNodes(nodes){
        this.connectedNodes = nodes;
    }

    getConnectedNodes(){
        return this.connectedNodes;
    }

    setVoltage(volts){
        this.voltage = volts;
    }

    getVoltage(){
        return this.voltage;
    }

    getPos(){
        this.updatePos();
        return [this.x,this.y];
    }

    updatePos(){
        //gets the current position of the node (accounts for any rotation of the parent HTML element)
        const pos = this.element.getBoundingClientRect();

        this.x = Math.round(pos.x/20) * 20;
        this.y = Math.round(pos.y/20) * 20;
    }

    mouseDown(event){
        event.stopPropagation();
        //Send node location to the wire Manager
        // Start a wire from this node
        this.wm.Start(this);
    }

    delete(){
        this.element.removeEventListener("mousedown", this.mouseDownBind); 
        this.element.remove();
        delete this.element;
        delete this.parent;
        delete this.wm;
        delete this.x;
        delete this.y;
        delete this.mouseDownBind;
    }
        
}

export default Node
