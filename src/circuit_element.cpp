#include "simulator/circuit_element.h"


Impedance::Impedance(){
    resistance = 0.0;
    capacitance = 0.0 ;
    inductance = 0.0;
}

CircuitElement::CircuitElement(std::string nameInput)
    : _name(nameInput)
{
}

CircuitElement::~CircuitElement(){

}

PassiveElement::~PassiveElement(){
    
}

std::string CircuitElement::GetName(){
    return _name;
}

Impedance PassiveElement::GetImpedance() const{
    return _impedance;
}

void PassiveElement::SetResistance(const double resistanceInput){

    _impedance.resistance = resistanceInput;

}
