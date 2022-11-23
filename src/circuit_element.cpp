#include "simulator/circuit_element.h"

#include "simulator/node.h"


Impedance::Impedance(){
    resistance = 0.0;
    capacitance = 0.0 ;
    inductance = 0.0;
}

CircuitComponent::CircuitComponent(std::string nameInput, int numioPins, const Direction * connectionDirections)
    : name(nameInput), ioPins(numioPins), connectionDirection(connectionDirections)
{

}

CircuitComponent::~CircuitComponent(){
}



// void CircuitComponent::Print() const{
//     std::cout << name << std::endl;
// }




PassiveComponent::PassiveComponent(std::string nameInput)
    : CircuitComponent::CircuitComponent(nameInput, 2, passiveDirection)  
{

}


PassiveComponent::~PassiveComponent(){
    
}
void CircuitComponent::Print() const{
    std::cout << "Name: " << name << std::endl;
    std::cout << "Resistance: " << impedance.resistance << std::endl;
    std::cout << "Capacitance: " << impedance.capacitance << std::endl;
    std::cout << "Inductance: " << impedance.inductance << std::endl;

}
