#include "simulator/diode.h"

#include "simulator/node.h"

Diode::Diode(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, _direction, sim), _forwardVoltage(0.7), _onResistance(0.01), _offResistance(1000000000.0)
{
}

Diode::~Diode(){
}

void Diode::Stamp(){
    const double voltageDrop = connectedNodes[0]->parent->voltage - connectedNodes[1]->parent->voltage;
    const bool forwardBiased = voltageDrop >= _forwardVoltage;
    const double resistance = forwardBiased ? _onResistance : _offResistance;
    const double conductance = resistance != 0 ? 1.0 / resistance : 0.0;

    _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[0]->parent->id, conductance);
    _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[1]->parent->id, -conductance);
    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[0]->parent->id, -conductance);
    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id, conductance);

    if(forwardBiased){
        const double offsetCurrent = -conductance * _forwardVoltage;
        _solver->StampCurrentVector(connectedNodes[0]->parent->id, -offsetCurrent);
        _solver->StampCurrentVector(connectedNodes[1]->parent->id, offsetCurrent);
    }
}

void Diode::SetForwardVoltage(const double forwardVoltage){
    _forwardVoltage = forwardVoltage;
}

void Diode::SetOnResistance(const double onResistance){
    _onResistance = onResistance;
}

void Diode::SetOffResistance(const double offResistance){
    _offResistance = offResistance;
}