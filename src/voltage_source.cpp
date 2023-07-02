#include "simulator/voltage_source.h"

VoltageSource::VoltageSource(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, currentDirection, sim)  
{

}

VoltageSource::~VoltageSource(){
    
}

void VoltageSource::Stamp(){

     

//    _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[0]->parent->id ,addmittance);
//    _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[1]->parent->id ,-addmittance);
//    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[0]->parent->id ,-addmittance);
//    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id ,addmittance);
//    _solver->StampCurrentVector(connectedNodes[0]->parent->id, -_current);
//	_solver->StampCurrentVector(connectedNodes[1]->parent->id, _current);

}

