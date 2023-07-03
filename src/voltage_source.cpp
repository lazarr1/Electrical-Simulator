#include "simulator/voltage_source.h"
#include "simulator/node.h"

VoltageSource::VoltageSource(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, currentDirection, sim)  
{

}

VoltageSource::~VoltageSource(){
    
}

void VoltageSource::Stamp(){

    std::pair<int,int> currsize = _solver->GetSize();

    _solver->Resize(currsize.first + 1, false);
    int newSize = currsize.first;

    
    if(connectedNodes[0]->parent->grounded == false){
        _solver->StampVSMatrix(newSize, connectedNodes[0]->parent->id, -1);
        _solver->StampVSMatrix(connectedNodes[0]->parent->id, newSize, 1);
    }


    if(connectedNodes[1]->parent->grounded == false){
        _solver->StampVSMatrix(newSize, connectedNodes[1]->parent->id, 1);
        _solver->StampVSMatrix(connectedNodes[1]->parent->id, newSize,-1);
    }

    _solver->StampVSCurrent(newSize, voltage);
//	stampMatrix(vn, n1, -1);
//	stampMatrix(vn, n2, 1);
//	stampRightSide(vn, v);
//	stampMatrix(n1, vn, 1);
//	stampMatrix(n2, vn, -1);
     
//    _solver->AddRowsAndZero_VS(connectedNodes[1]->parent->id, connectedNodes[0]->parent->id, voltage); 

//    _solver->StampVSMatrix(connectedNodes[0]->parent->id, connectedNodes[0]->parent->id ,addmittance);
//    _solver->StampVSMatrix(connectedNodes[0]->parent->id, connectedNodes[1]->parent->id ,-addmittance);
//    _solver->StampVSMatrix(connectedNodes[1]->parent->id, connectedNodes[0]->parent->id ,-addmittance);
//    _solver->StampVSMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id ,addmittance);
//    _solver->StampCurrentVector(connectedNodes[0]->parent->id, -_current);
//	_solver->StampCurrentVector(connectedNodes[1]->parent->id, _current);

}

