#include "simulator/current_source.h"
#include "simulator/node.h"


CurrentSource::CurrentSource(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, currentDirection, sim)  
{

}


CurrentSource::~CurrentSource(){
    
}

void CurrentSource::Stamp(){

    _sim->StampCurrentVector(connectedNodes[0]->parent->id, -current);
	_sim->StampCurrentVector(connectedNodes[1]->parent->id, current);

}
