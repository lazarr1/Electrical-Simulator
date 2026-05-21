#include "simulator/bjt.h"

#include "simulator/node.h"

BJT::BJT(std::string nameInput, CircuitSolver* sim, bool pnp)
    : CircuitComponent::CircuitComponent(nameInput, 3, _direction, sim), _pnp(pnp), _baseTurnOn(0.7), _transconductance(2.0), _onResistance(0.1), _offResistance(1000000000.0), _baseResistance(1000.0)
{
}

BJT::~BJT(){
}

void BJT::Stamp(){
    const double baseVoltage = connectedNodes[0]->parent->voltage;
    const double emitterVoltage = connectedNodes[2]->parent->voltage;
    const double vbe = _pnp ? emitterVoltage - baseVoltage : baseVoltage - emitterVoltage;
    const bool on = vbe >= _baseTurnOn;

    const double baseConductance = on ? 1.0 / _baseResistance : 1.0 / _offResistance;
    _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[0]->parent->id, baseConductance);
    _solver->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[2]->parent->id, -baseConductance);
    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[0]->parent->id, -baseConductance);
    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[2]->parent->id, baseConductance);

    const double ceResistance = on ? _onResistance : _offResistance;
    const double ceConductance = 1.0 / ceResistance;
    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id, ceConductance);
    _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[2]->parent->id, -ceConductance);
    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[1]->parent->id, -ceConductance);
    _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[2]->parent->id, ceConductance);

    if(on){
        const double gm = _pnp ? -_transconductance : _transconductance;
        const double offsetCurrent = _pnp ? _transconductance * _baseTurnOn : -_transconductance * _baseTurnOn;

        _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[0]->parent->id, gm);
        _solver->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[2]->parent->id, -gm);
        _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[0]->parent->id, -gm);
        _solver->StampMatrix(connectedNodes[2]->parent->id, connectedNodes[2]->parent->id, gm);

        _solver->StampCurrentVector(connectedNodes[1]->parent->id, -offsetCurrent);
        _solver->StampCurrentVector(connectedNodes[2]->parent->id, offsetCurrent);
    }
}

void BJT::SetBaseTurnOn(const double baseTurnOn){
    _baseTurnOn = baseTurnOn;
}

void BJT::SetTransconductance(const double transconductance){
    _transconductance = transconductance;
}

void BJT::SetOnResistance(const double onResistance){
    _onResistance = onResistance;
}

void BJT::SetOffResistance(const double offResistance){
    _offResistance = offResistance;
}

void BJT::SetBaseResistance(const double baseResistance){
    _baseResistance = baseResistance;
}