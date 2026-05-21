#include "simulator/digital_gate.h"

#include "simulator/node.h"

DigitalGate::DigitalGate(std::string nameInput, int pins, const Direction* directions, const std::string& kind, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, pins, directions, sim), _kind(kind), _threshold(2.5), _highLevel(5.0), _lowLevel(0.0), _newRow(0)
{
}

DigitalGate::~DigitalGate(){
}

void DigitalGate::PrepareSolver(){
    std::pair<int,int> currsize = _solver->GetSize();
    _solver->Resize(currsize.first + 1, false);
    _newRow = currsize.first;
}

bool DigitalGate::Evaluate() const{
    const bool inputA = connectedNodes[0]->parent->voltage > _threshold;
    const bool inputB = ioPins > 3 ? connectedNodes[1]->parent->voltage > _threshold : false;

    if(_kind == "not"){
        return !inputA;
    }
    if(_kind == "and"){
        return inputA && inputB;
    }
    if(_kind == "or"){
        return inputA || inputB;
    }
    if(_kind == "nand"){
        return !(inputA && inputB);
    }
    return false;
}

void DigitalGate::Stamp(){
    const bool gateHigh = Evaluate();
    const double outputVoltage = gateHigh ? _highLevel : _lowLevel;
    const int positiveIndex = ioPins > 3 ? 2 : 1;
    const int negativeIndex = ioPins > 3 ? 3 : 2;

    if(connectedNodes[positiveIndex]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[positiveIndex]->parent->id, -1);
        _solver->StampVSMatrix(connectedNodes[positiveIndex]->parent->id, _newRow, 1);
    }

    if(connectedNodes[negativeIndex]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[negativeIndex]->parent->id, 1);
        _solver->StampVSMatrix(connectedNodes[negativeIndex]->parent->id, _newRow, -1);
    }

    _solver->StampVSCurrent(_newRow, outputVoltage);
}

void DigitalGate::SetThreshold(const double threshold){
    _threshold = threshold;
}

void DigitalGate::SetHighLevel(const double highLevel){
    _highLevel = highLevel;
}

void DigitalGate::SetLowLevel(const double lowLevel){
    _lowLevel = lowLevel;
}