#include "simulator/circuit_element.h"

#include "simulator/node.h"


CircuitComponent::CircuitComponent(std::string nameInput, int numioPins, const Direction * connectionDirections, CircuitSolver* sim)
    : ioPins(numioPins), connectionDirection(connectionDirections), name(nameInput), _current(0), _solver(sim)
{

}

CircuitComponent::~CircuitComponent(){
}

std::string CircuitComponent::GetName() const{
    return name;
}

void CircuitComponent::SetCurrent(const double curr){
    _current = curr;   
}

double CircuitComponent::GetCurrent() const{
    return _current;
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

double Resistor::GetCurrent() const{
    return (connectedNodes[0]->parent->voltage - connectedNodes[1]->parent->voltage)/resistance; 
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
