import modifyBox from './modifyParamsBox.js';

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
    constructor(terminals, type, circuit, value) {
        //Store the number of terminals/nodes it has
        this.terminals = terminals;
        this.type = type;
        this.circuit = circuit;

        this.defaultVal = value;
        this.value = value;

        //Store all nodes associated with the component
        this.nodes = [];

        //Create html element for class
        this.element = document.createElement("div");
        this.element.classList.add("CircuitComponent");
        this.element.classList.add(type);
        this.rotation = 0;
        
        this.keyDownBind = this.handleKeyDown.bind(this);
        this.mouseDownBind = this.onMouseDown.bind(this);
        this.mouseOverBind = this.onMouseOver.bind(this);

        document.body.appendChild(this.element);
        this.element.addEventListener("mouseover", this.mouseOverBind);
        this.element.addEventListener("mousedown", this.mouseDownBind);


        this.modifyBox = new modifyBox(this); 

    }

    onMouseOver(){
        document.addEventListener("keydown", this.keyDownBind);
        this.mouseLeaveBind = this.onMouseLeave.bind(this);
        this.element.addEventListener("mouseleave", this.mouseLeaveBind);
    }

    onMouseLeave() {
        document.removeEventListener("keydown",this.keyDownBind);
        this.element.removeEventListener("mouseleave", this.mouseLeaveBind);
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
            this.modifyBox.rotate(this.rotation);
            this.updateNodePos();
        }
        // 'delete' key
        else if(event.keyCode == 8){
            this.onMouseLeave();
            this.onMouseUp();
            this.delete();
        }
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

        this.updateNodePos();
    }

    updateNodePos(){
        //update the position of the nodes
        for (let i = 0; i < this.terminals; i++) {
            this.nodes[i].updatePos();
        }
    }

    setValue(value){
        this.value = value;
    }   

    getValue(){

        //If user is modifying parameter, assuming default until it is changed
        if(this.modifyBox.getOpenStatus()){
            return this.defaultVal;
        }

        this.value = this.modifyBox.getValue();
        if( !isNaN(this.value) &&  !isNaN(parseFloat(this.value))){ // ...and ensure strings of whitespace fail){
            return this.value;
        }
        else{
            this.modifyBox.setInput(this.defaultVal);
            return this.defaultVal;
        }
    }

    delete(){
        //Remove all references to this object
        //This was a mistake
        this.element.remove(); 
        this.element.removeEventListener("mousedown", this.mouseDownBind);
        this.element.removeEventListener("mouseover", this.mouseOverBind);

        delete this.mouseMoveListener;
        delete this.mouseOverBind;
        delete this.mouseDownBind;
        delete this.mouseUpListener;
        delete this.keyDownBind;
        delete this.mouseLeaveBind;

        this.modifyBox.delete();
        delete this.modifyBox;

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
