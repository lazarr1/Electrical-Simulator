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
    this.circles = [];
    for (let i = 0; i < terminals; i++) {
      let x = 10 + i * 20;
      let y = 10 + i * 20;
      this.circles.push(new CircleComponent(x, y));
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
  }
}
  

  
class CircleComponent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.element.style.backgroundColor = "white";
    this.element.style.borderRadius = "50%";
    this.element.style.width = "10px";
    this.element.style.height = "10px";
    this.element.style.position = "absolute";
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    document.body.appendChild(this.element);
  }
}