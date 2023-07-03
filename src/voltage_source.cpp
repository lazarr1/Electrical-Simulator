#include "simulator/voltage_source.h"
#include "simulator/node.h"

VoltageSource::VoltageSource(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, currentDirection, sim)  
{

}

VoltageSource::~VoltageSource(){
    
}

void VoltageSource::ResizeSolver(){
    std::pair<int,int> currsize = _solver->GetSize();
    _solver->Resize(currsize.first + 1, false);
    _newRow = currsize.first;
}

void VoltageSource::Stamp(){

    if(connectedNodes[0]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[0]->parent->id, -1);
        _solver->StampVSMatrix(connectedNodes[0]->parent->id, _newRow, 1);
    }

    if(connectedNodes[1]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[1]->parent->id, 1);
        _solver->StampVSMatrix(connectedNodes[1]->parent->id, _newRow,-1);
    }

    _solver->StampVSCurrent(_newRow, voltage);

}

