// import Circuit from "./circuit.js";

class StaticCircuitComponent {
  constructor(id, circuit, type) {
    this.id = id;

    this.crc = circuit;
    this.element = document.createElement("div");
    this.element.classList.add("StaticCircuitComponent");
    this.element.classList.add(type);

    this.type = type;

    this.element.addEventListener("click", this.onClick.bind(this));
    document.body.appendChild(this.element);
  }


  onClick() {
    //Virtual Function
  }
}

class Resistor extends StaticCircuitComponent{
  constructor(id, circuit){
    super(id,circuit, "Resistor");

  }

  onClick(){
    this.crc.createNewResistor();
  }

}

class DCurrent extends StaticCircuitComponent{
  constructor(id, circuit){
    super(id,circuit,"DCCurrent");
  }

  onClick(){
    this.crc.createNewDCurrent();
  }
}

export {StaticCircuitComponent, Resistor, DCurrent}

  
