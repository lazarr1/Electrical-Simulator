import Node from './nodes.js';

class CircuitComponent {
  constructor(id, terminals, type) {

    this.id = id;
    this.terminals = terminals;

    this.nodes = [];

    this.element = document.createElement("div");
    this.element.classList.add("CircuitComponent");
    this.element.classList.add(type);

    this.rotation = 0;

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.body.appendChild(this.element);

    this.element.addEventListener("mouseover", this.OnMouseOver.bind(this));

  }

  OnMouseOver(){
    document.addEventListener("keydown", this.handleKeyDown);
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  handleKeyDown(event){

    if(event.keyCode === 82){
      if(this.rotation == 360){
        this.rotation = 0
      }
      else{
        this.rotation += 90;
      }
      this.element.style.transform = `rotate(${this.rotation}deg)`;

      this.nodes.forEach(function(node){
        node.rotateNodes();
      })

    }
  }

  onMouseLeave(){
    document.removeEventListener("keydown",this.handleKeyDown);
    this.element.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  onMouseDown(event) {
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
    
    this.element.style.left = `${Math.round((event.clientX - this.initialX)/20) *20}px`;
    this.element.style.top = `${Math.round((event.clientY - this.initialY)/20)*20}px`;

    for (let i = 0; i < this.terminals; i++) {
      this.nodes[i].updatePos(event);
    }
  }
}

export default CircuitComponent

  
