import Node from './nodes.js';


class StaticCircuitComponent {
  constructor(id) {
    this.id = id;
    this.element = document.createElement("div");
    this.element.classList.add("StaticCircuitComponent");

    this.element.innerHTML = `Circuit Component ${this.id}`;

    this.element.addEventListener("click", this.onClick.bind(this));
    document.body.appendChild(this.element);
  }

  onClick() {
    new CircuitComponent(++this.id, 2);
  }
}

export default StaticCircuitComponent

class CircuitComponent {
  constructor(id, terminals) {

    this.id = id;


    this.terminals = terminals
    this.circles = [];

    //Fix up these magic numbers which represent the position of the nodes
    this.offsetLeft = 20;
    this.offsetTop = 20;
    this.offsetHeight = 20;

    for (let i = 0; i < this.terminals; i++) {
      let x = this.offsetLeft + (i + 1) * 20;
      let y = this.offsetTop + this.offsetHeight + 20;
      this.circles.push(new Node(x, y));
    }

    this.element = document.createElement("div");
    this.element.classList.add("CircuitComponent");

    this.element.innerHTML = `Circuit Component ${this.id}`;


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
      this.circles[i].follow(event);
    }
  }
}
  

  
