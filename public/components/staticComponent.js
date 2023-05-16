/*  Class: StaticCircuitComponent:
    *   This base class is simply the "clickable" version of each component that when clicked on by a user, it creates
    *   the real component. The class simply needs the type of component it creates, so that the stylesheet can update
    *   its image.
    * 
    *      Member functions:
    *       - onClick: Tells the circuit to create the real required component
*/
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

//To define a new component pass the base class the type of component as a string, and define the 
//virutal onClick function.
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

class Ground extends StaticCircuitComponent{
    constructor(id, circuit){
        super(id,circuit,"Ground");
    }

    onClick(){
        this.crc.createGroundNode();
    }
}

export {StaticCircuitComponent, Resistor, DCurrent, Ground}


