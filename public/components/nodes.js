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

        //Create html element
        this.element = document.createElement("div");
        this.element.classList.add('node');
        component.element.appendChild(this.element);


        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;

        this.element.addEventListener("mousedown", this.mouseDown.bind(this));

        //Store the associated component and wire manager
        this.parent = component;
        this.wm = wireManager;

    }

    getPos(){
        return [this.x,this.y];
    }

    updatePos(){
        //gets the current position of the node (accounts for any rotation of the parent HTML element)
        const pos = this.element.getBoundingClientRect();

        this.x = Math.round(pos.x/20) * 20;
        this.y = Math.round(pos.y/20) * 20;
        
        //Tell any wires attatched, that the node has moved
//        const nodeMove = new CustomEvent("node_move", {detail:{ pos: this.getPos() }});
//        this.element.dispatchEvent(nodeMove);
    }

    mouseDown(event){
        event.stopPropagation();
        //Tells the wiremanager to create a new wire starting at this node
        //Send node location to the wire Manager
        this.wm.Start(this);
    }

    rotateNodes(){
        //update stored x and y position
        const pos = this.element.getBoundingClientRect();

        this.x = Math.round(pos.x/20) * 20; 
        this.y = Math.round(pos.y/20) * 20;

    }


        
}

export default Node
