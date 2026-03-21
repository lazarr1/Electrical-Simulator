#include "simulator/ac_voltage_source.h"
#include "simulator/node.h"
#include <cmath>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

ACVoltageSource::ACVoltageSource(std::string nameInput, CircuitSolver* sim)
    : VoltageSource(nameInput, sim), _amplitude(0), _frequency(60)
{
}

ACVoltageSource::~ACVoltageSource() {
}

void ACVoltageSource::Stamp() {

    if(connectedNodes[0]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[0]->parent->id, -1);
        _solver->StampVSMatrix(connectedNodes[0]->parent->id, _newRow, 1);
    }

    if(connectedNodes[1]->parent->grounded == false){
        _solver->StampVSMatrix(_newRow, connectedNodes[1]->parent->id, 1);
        _solver->StampVSMatrix(connectedNodes[1]->parent->id, _newRow, -1);
    }

    double t = _solver->GetTime();
    double v = _amplitude * std::sin(2.0 * M_PI * _frequency * t);
    _solver->StampVSCurrent(_newRow, v);
}

void ACVoltageSource::SetAmplitude(const double amplitude) {
    _amplitude = amplitude;
}

void ACVoltageSource::SetFrequency(const double frequency) {
    _frequency = frequency;
}
