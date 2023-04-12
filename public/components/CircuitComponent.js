// import Circuit from "./circuit.js";

class StaticCircuitComponent {
  constructor(id, circuit, type) {
    this.id = id;

    this.crc = circuit;
    this.element = document.createElement("div");
    this.element.classList.add("StaticCircuitComponent");
    this.element.classList.add(type);

    this.type = type;
    // this.element.innerHTML = `Circuit Component ${this.id}`;

    this.element.addEventListener("click", this.onClick.bind(this));
    document.body.appendChild(this.element);
  }


  onClick() {
    // this.crc.createNewComponent(this.type, 2);
  }
}

class Resistor extends StaticCircuitComponent{
  constructor(id, circuit){

    super(id,circuit, "Resistor");

    // this.element.classList.add("Resistor");
  }

  onClick(){
    this.crc.createNewResistor();
  }

}

class DCurrent extends StaticCircuitComponent{
  constructor(id, circuit){
    super(id,circuit,"DCurrent");
  }

  onClick(){
    this.crc.createNewDCurrent();
  }
}

export {StaticCircuitComponent, Resistor, DCurrent}

  
