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

std::string CircuitElement::GetName() const{
    return _name;
}


PassiveElement::~PassiveElement(){
    
}



Impedance& PassiveElement::GetImpedance(){
    return _impedance;
}

void PassiveElement::SetResistance(const double resistanceInput){

    _impedance.resistance = resistanceInput;

}

const int PassiveElement::GetIOPinNum() const{
    return ioPins;
}

