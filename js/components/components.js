import Node from './nodes.js';

class CircuitComponent {
  constructor(id, type, terminals, wm) {

    this.id = id;



    this.terminals = terminals
    this.circles = [];

    for (let i = 0; i < this.terminals; i++) {
      //Position Nodes Correctly
      let x = (i) * 125;
      let y = 30;
      this.circles.push(new Node(x, y, this,wm));
    }

    this.element = document.createElement("div");
    this.element.classList.add("CircuitComponent");
    this.element.classList.add(type);


    this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.body.appendChild(this.element);

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

    this.element.style.left = `${event.clientX - this.initialX}px`;
    this.element.style.top = `${event.clientY - this.initialY}px`;

    for (let i = 0; i < this.terminals; i++) {
      this.circles[i].updatePos(event.clientX - this.initialX, event.clientY - this.initialY);
    }
  }
}

export default CircuitComponent

  
