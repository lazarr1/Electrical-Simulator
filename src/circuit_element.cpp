#include "simulator/circuit_element.h"

#include "simulator/node.h"


CircuitComponent::CircuitComponent(std::string nameInput, int numioPins, const Direction * connectionDirections, CircuitSolver* sim)
    : ioPins(numioPins), connectionDirection(connectionDirections), name(nameInput), _solver(sim)
{

}

CircuitComponent::~CircuitComponent(){
}

std::string CircuitComponent::GetName() const{
    return name;
}

Resistor::Resistor(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, passiveDirection, sim)  
{

}


Resistor::~Resistor(){
    
}
void CircuitComponent::Print() const{
    std::cout << "Name: " << name << std::endl;
}

void Resistor::Stamp(){

    if(resistance != 0){
        double addmittance = 1/resistance;

        _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[0]->parent->id ,addmittance);
        _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[1]->parent->id ,-addmittance);
        _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[0]->parent->id ,-addmittance);
        _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id ,addmittance);

    }

}

