#include "simulator/circuit_element.h"




Impedance::Impedance(){
    resistance = 0.0;
    capacitance = 0.0 ;
    inductance = 0.0;
}

CircuitComponent::CircuitComponent(std::string nameInput)
    : _name(nameInput)
{
}

CircuitComponent::~CircuitComponent(){
}

std::string CircuitComponent::GetName() const{
    return _name;
}

PassiveComponent::PassiveComponent(std::string nameInput)
    : CircuitComponent::CircuitComponent(nameInput)
{
    _terminals.resize(_ioPins);

}

PassiveComponent::PassiveComponent(std::string nameInput, std::shared_ptr<Node> positiveNode, std::shared_ptr<Node> negativeNode)
    : CircuitComponent::CircuitComponent(nameInput)
{
    _terminals.resize(_ioPins);

    _terminals[_positiveTerminal] = positiveNode;
    _terminals[_negativeTerminal] = negativeNode;
}

PassiveComponent::~PassiveComponent(){
    
}

void PassiveComponent::Print() const{
    std::cout << "Name: " << _name << std::endl;
    std::cout << "Resistance: " << _impedance.resistance << std::endl;
    std::cout << "Capacitance: " << _impedance.capacitance << std::endl;
    std::cout << "Inductance: " << _impedance.inductance << std::endl;

}

void PassiveComponent::SetResistance(double resistance){
    _impedance.resistance = resistance;
}

Impedance PassiveComponent::GetImpedance() const{
    return _impedance;
}
