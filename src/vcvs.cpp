#include "simulator/vcvs.h"

#include "simulator/node.h"

VCVS::VCVS(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 4, _direction, sim), _gain(1), _newRow(0)
{
}

VCVS::~VCVS(){
}

void VCVS::PrepareSolver(){
    std::pair<int,int> currsize = _solver->GetSize();
    _solver->Resize(currsize.first + 1, false);
    _newRow = currsize.first;
}

void VCVS::Stamp(){
    if(connectedNodes[2]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[2]->parent->id, -1);
        _solver->StampVSMatrix(connectedNodes[2]->parent->id, _newRow, 1);
    }

    if(connectedNodes[3]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[3]->parent->id, 1);
        _solver->StampVSMatrix(connectedNodes[3]->parent->id, _newRow, -1);
    }

    if(connectedNodes[0]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[0]->parent->id, _gain);
    }

    if(connectedNodes[1]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[1]->parent->id, -_gain);
    }
}

void VCVS::SetGain(const double gain){
    _gain = gain;
}