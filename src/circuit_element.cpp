#include "simulator/circuit_element.h"

#include <iostream>

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


PassiveElement::PassiveElement(std::string nameInput)
    : CircuitElement::CircuitElement(nameInput)
{
}

PassiveElement::~PassiveElement(){
    
}

// void PassiveElement::AddNode(std::shared_ptr<Node> node){

//     if(_connectedNodes.size() < ioPins){

//         _connectedNodes.push_back(node);

//     }
//     else{
//         std::cout << "tried to assign to many nodes to a component" << std::endl;
//     }


// }


Impedance& PassiveElement::GetImpedance(){
    return _impedance;
}

void PassiveElement::SetResistance(const double resistanceInput){

    _impedance.resistance = resistanceInput;

}

const int PassiveElement::GetIOPinNum() const{
    return ioPins;
}

