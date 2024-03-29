/*  Class: StaticCircuitComponent:
    *   This base class is simply the "clickable" version of each component that when clicked on by a user, it creates
    *   the real component. The class simply needs the type of component it creates, so that the stylesheet can update
    *   its image.
    * 
    *      Member functions:
    *       - onClick: Tells the circuit to create the real required component
*/
class StaticCircuitComponent {
    constructor(id, circuit, type, componentBox) {
        this.id = id;
        this.crc = circuit;
        this.element = document.createElement("div");
        this.element.classList.add("StaticCircuitComponent");
        this.element.classList.add(type);
        this.type = type;
        this.element.addEventListener("click", this.onClick.bind(this));
       // document.body.appendChild(this.element);
        componentBox.appendChild(this.element);
    }

    onClick() {
        //Virtual Function
    }
}

//To define a new component pass the base class the type of component as a string, and define the 
//virutal onClick function.
class Resistor extends StaticCircuitComponent{
    constructor(id, circuit, componentBox){
        super(id,circuit, "Resistor", componentBox);
    }

    onClick(){
        this.crc.createNewResistor();
    }

}

class DCurrent extends StaticCircuitComponent{
    constructor(id, circuit, componentBox){
        super(id,circuit,"DCCurrent", componentBox);
    }

    onClick(){
        this.crc.createNewDCurrent();
    }
}

class Ground extends StaticCircuitComponent{
    constructor(id, circuit, componentBox){
        super(id,circuit,"Ground", componentBox);
    }

    onClick(){
        this.crc.createGroundNode();
    }
}

class Capacitor extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"Capacitor", componentBox);
    }
    onClick(){
        this.crc.createNewCapacitor();
    }
}

class Inductor extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"Inductor", componentBox);
    }

    onClick(){
        this.crc.createNewInductor();
    }
}

class VoltageSource extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"VoltageSource", componentBox);
    }

    onClick(){
        this.crc.createNewVoltageSource();
    }
}

export {VoltageSource, StaticCircuitComponent, Resistor, DCurrent, Capacitor, Inductor, Ground}
