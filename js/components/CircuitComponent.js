class StaticCircuitComponent {
  constructor(id) {
    this.id = id;
    this.element = document.createElement("div");
    this.element.innerHTML = `Circuit Component ${this.id}`;
    this.element.style.backgroundColor = "lightgray";
    this.element.style.padding = "10px";
    this.element.style.margin = "10px";
    this.element.style.cursor = "pointer";
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

    this.offsetLeft = 20;
    this.offsetTop = 20;
    this.offsetHeight = 20;

    for (let i = 0; i < this.terminals; i++) {
      let x = this.offsetLeft + (i + 1) * 20;
      let y = this.offsetTop + this.offsetHeight + 20;
      this.circles.push(new Circle(x, y));
    }

    this.element = document.createElement("div");
    this.element.innerHTML = `Circuit Component ${this.id}`;
    this.element.style.backgroundColor = "lightgray";
    this.element.style.padding = "10px";
    this.element.style.margin = "10px";
    this.element.style.cursor = "pointer";
    this.element.style.position = "absolute";


    this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.body.appendChild(this.element);
  }

  onMouseDown(event) {
    this.initialX = event.clientX - this.element.offsetLeft;
    this.initialY = event.clientY - this.element.offsetTop;

    this.mouseUpListener = this.onMouseUp.bind(this);
    this.mouseMoveListener = this.onMouseMove.bind(this);

    document.addEventListener("mouseup", this.mouseUpListener);
    document.addEventListener("mousemove", this.mouseMoveListener);
  }

  onMouseUp() {
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
  

  
class Circle {
  constructor(x, y) {
    this.xoffset = x;
    this.yoffset = y;
    this.element = document.createElement("div");
    this.element.classList.add('node');
    this.element.style.backgroundColor = "red";
    this.element.style.borderRadius = "50%";
    this.element.style.width = "10px";
    this.element.style.height = "10px";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.xoffset}px`;
    this.element.style.top = `${this.yoffset}px`;
    document.body.appendChild(this.element);
  }

  follow(event) {
    this.element.style.left = `${event.clientX  + this.xoffset}px`;
    this.element.style.top = `${event.clientY  + this.yoffset}px`;
  }
}