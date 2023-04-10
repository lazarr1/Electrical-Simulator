// import Circuit from "./circuit.js";

class StaticCircuitComponent {
  constructor(id, circuit) {
    this.id = id;
    console.log(circuit);
    this.crc = circuit;
    this.element = document.createElement("div");
    this.element.classList.add("StaticCircuitComponent");

    this.element.innerHTML = `Circuit Component ${this.id}`;

    this.element.addEventListener("click", this.onClick.bind(this));
    document.body.appendChild(this.element);
  }


  onClick() {
    this.crc.createNewComponent("R", 2);
  }
}
export default StaticCircuitComponent

  
