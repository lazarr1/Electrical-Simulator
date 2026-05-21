#include "simulator/mosfet.h"

#include "simulator/node.h"

MOSFET::MOSFET(std::string nameInput, CircuitSolver* sim, bool pType)
    : CircuitComponent::CircuitComponent(nameInput, 3, _direction, sim), _pType(pType), _threshold(2.5), _onResistance(0.05), _offResistance(1000000000.0)
{
}

MOSFET::~MOSFET(){
}

void MOSFET::Stamp(){
    const double gateVoltage = connectedNodes[0]->parent->voltage;
    const double sourceVoltage = connectedNodes[2]->parent->voltage;
    const double controlVoltage = _pType ? sourceVoltage - gateVoltage : gateVoltage - sourceVoltage;
    const double resistance = controlVoltage >= _threshold ? _onResistance : _offResistance;
    const double conductance = resistance != 0 ? 1.0 / resistance : 0.0;

    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id, conductance);
    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[2]->parent->id, -conductance);
    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[1]->parent->id, -conductance);
    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[2]->parent->id, conductance);
}

void MOSFET::SetThreshold(const double threshold){
    _threshold = threshold;
}

void MOSFET::SetOnResistance(const double onResistance){
    _onResistance = onResistance;
}

void MOSFET::SetOffResistance(const double offResistance){
    _offResistance = offResistance;
}