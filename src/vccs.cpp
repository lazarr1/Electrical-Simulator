#include "simulator/vccs.h"

#include "simulator/node.h"

VCCS::VCCS(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 4, _direction, sim)  
{

}

VCCS::~VCCS(){
    
}

void VCCS::Stamp(){

    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[0]->parent->id ,_conductance);
    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[1]->parent->id ,-_conductance);
    _solver->StampMatrix(connectedNodes[3]->parent->id, connectedNodes[0]->parent->id ,-_conductance);
    _solver->StampMatrix(connectedNodes[3]->parent->id, connectedNodes[1]->parent->id ,_conductance);



}

void VCCS::SetConductance(const double conductance){

    _conductance = conductance;

}


