import Node from './nodes.js';

/*  Class: CircuitComponent: 
    *      This class represents the real circuit elements the user has defined. It stores the elments id and type,
    *      so that the stylesheet knows what graphic to place over the element and the circuit frontend and backend 
    *      can ensure they are referencing the same component. It also lets the user interface with the component by either transforming
    *      or updating its value.
    *      
    *      Member functions:
    *       -onMouseOver - Starts listening to the users inputs to rotate/delete
    *       -onMouseClick/MouseMove - Moves the component to the user's curosr (keeping component lined up on the grid)
    *       -handleKeyDown - Rotates given mouse over and r key is pressed. (will soon be able to delete)
    */
class CircuitComponent {
    constructor(id, terminals, type, circuit) {
        //Store the id and the number of terminals/nodes it has
        this.id = id;
        this.terminals = terminals;
        this.type = type;
        this.circuit = circuit;

        //Store all nodes associated with the component
        this.nodes = [];

        //Create html element for class
        this.element = document.createElement("div");
        this.element.classList.add("CircuitComponent");
        this.element.classList.add(type);
        this.rotation = 0;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.mouseDownBind = this.onMouseDown.bind(this);
        this.mouseOverBind = this.OnMouseOver.bind(this);

        document.body.appendChild(this.element);
        this.element.addEventListener("mouseover", this.mouseOverBind);
        this.element.addEventListener("mousedown", this.mouseDownBind);

    }

    OnMouseOver(){
        document.addEventListener("keydown", this.handleKeyDown);
        this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    }

    handleKeyDown(event){
        //If 'r' key is pressed, rotate the component
        if(event.keyCode === 82){
            if(this.rotation == 360){
                this.rotation = 0 //reset rotation
            }
            else{
                this.rotation += 90;
            }
            this.element.style.transform = `rotate(${this.rotation}deg)`;

            this.nodes.forEach(function(node){
                node.rotateNodes();
            })
        }
        else if(event.keyCode == 8){
            this.onMouseLeave();
            this.delete();
        }
    }

    onMouseLeave(){
        document.removeEventListener("keydown",this.handleKeyDown);
        this.element.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
    }

    onMouseDown(event) {
        //Store initialX and Y position of the component, this ensures the component stays
        //in the center of the user's mouse
        this.initialX = event.clientX - this.element.offsetLeft;
        this.initialY = event.clientY - this.element.offsetTop;

        //follow the cursor
        this.mouseUpListener = this.onMouseUp.bind(this);
        this.mouseMoveListener = this.onMouseMove.bind(this);

        document.addEventListener("mouseup", this.mouseUpListener);
        document.addEventListener("mousemove", this.mouseMoveListener);

    }

    onMouseUp() {
        //Stop following cursor
        document.removeEventListener("mouseup", this.mouseUpListener );
        document.removeEventListener("mousemove", this.mouseMoveListener);
    }

    onMouseMove(event) {
        //Ensure the component stays on the grid 
        this.element.style.left = `${Math.round((event.clientX - this.initialX)/20) *20}px`;
        this.element.style.top = `${Math.round((event.clientY - this.initialY)/20)*20}px`;

        //update the position of the nodes
        for (let i = 0; i < this.terminals; i++) {
            this.nodes[i].updatePos(event);
        }
    }


    setId(id){
        this.id = id;
    }

    delete(){
        this.element.remove(); 
        this.element.removeEventListener("mousedown", this.mouseDownBind);
        this.element.removeEventListener("mouseover", this.mouseOverBind);

        if(this.type !== "Ground"){
            this.circuit.DeleteComponent(this);
        }
        else{
            this.circuit.DeleteGround(this);
        }

        for(const node of this.nodes){
            node.delete();
        }

        this.nodes = [];
        delete this;
    }
}

export default CircuitComponent


