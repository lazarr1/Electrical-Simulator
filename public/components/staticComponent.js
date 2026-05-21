import { cloneDefinition } from './componentSchemas.js';

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
        this.definition = cloneDefinition(type);
        this.element = document.createElement("div");
        this.element.classList.add("StaticCircuitComponent");
        this.element.classList.add(type);
        this.type = type;
        this.element.title = this.definition.displayName;
        this.element.setAttribute('aria-label', this.definition.displayName);
        this.element.addEventListener("click", this.onClick.bind(this));

        const caption = document.createElement('span');
        caption.className = 'StaticCircuitComponentLabel';
        caption.textContent = this.definition.displayName;
        this.element.appendChild(caption);

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

class VCCSComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"VCCS", componentBox);
    }

    onClick(){
        this.crc.createNewVCCS();
    }
}

class VCVSComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"VCVS", componentBox);
    }

    onClick(){
        this.crc.createNewVCVS();
    }
}

class ACVoltageSourceComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"ACVoltageSource", componentBox);
    }

    onClick(){
        this.crc.createNewACVoltageSource();
    }
}

class FunctionGeneratorComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"FunctionGenerator", componentBox);
    }

    onClick(){
        this.crc.createNewFunctionGenerator();
    }
}

class DiodeComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"Diode", componentBox);
    }

    onClick(){
        this.crc.createNewDiode();
    }
}

class NMOSComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"NMOS", componentBox);
    }

    onClick(){
        this.crc.createNewNMOS();
    }
}

class PMOSComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"PMOS", componentBox);
    }

    onClick(){
        this.crc.createNewPMOS();
    }
}

class NPNComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"NPN", componentBox);
    }

    onClick(){
        this.crc.createNewNPN();
    }
}

class PNPComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"PNP", componentBox);
    }

    onClick(){
        this.crc.createNewPNP();
    }
}

class NotGateComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"NotGate", componentBox);
    }

    onClick(){
        this.crc.createNewNotGate();
    }
}

class AndGateComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"AndGate", componentBox);
    }

    onClick(){
        this.crc.createNewAndGate();
    }
}

class OrGateComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"OrGate", componentBox);
    }

    onClick(){
        this.crc.createNewOrGate();
    }
}

class NandGateComponent extends StaticCircuitComponent{
    constructor(id,circuit,componentBox){
        super(id,circuit,"NandGate", componentBox);
    }

    onClick(){
        this.crc.createNewNandGate();
    }
}

export {VoltageSource, StaticCircuitComponent, Resistor, DCurrent, Capacitor, Inductor, Ground, VCCSComponent, VCVSComponent, ACVoltageSourceComponent, FunctionGeneratorComponent, DiodeComponent, NMOSComponent, PMOSComponent, NPNComponent, PNPComponent, NotGateComponent, AndGateComponent, OrGateComponent, NandGateComponent}
