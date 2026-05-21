#include "simulator/function_generator.h"

#include <cmath>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

FunctionGenerator::FunctionGenerator(std::string nameInput, CircuitSolver* sim)
    : VoltageSource(nameInput, sim), _amplitude(5), _frequency(60), _offset(0), _phaseDegrees(0), _dutyCycle(0.5), _waveform("sine")
{
}

FunctionGenerator::~FunctionGenerator(){
}

void FunctionGenerator::Stamp(){
    const double phaseRadians = _phaseDegrees * M_PI / 180.0;
    const double phase = (2.0 * M_PI * _frequency * _solver->GetTime()) + phaseRadians;
    const double cycles = phase / (2.0 * M_PI);
    const double frac = cycles - std::floor(cycles);
    double sample = 0;

    if(_waveform == "square"){
        sample = frac < _dutyCycle ? 1.0 : -1.0;
    }
    else if(_waveform == "triangle"){
        sample = 1.0 - 4.0 * std::abs(frac - 0.5);
    }
    else if(_waveform == "saw"){
        sample = 2.0 * frac - 1.0;
    }
    else{
        sample = std::sin(phase);
    }

    voltage = _offset + _amplitude * sample;
    VoltageSource::Stamp();
}

void FunctionGenerator::SetAmplitude(const double amplitude){
    _amplitude = amplitude;
}

void FunctionGenerator::SetFrequency(const double frequency){
    _frequency = frequency;
}

void FunctionGenerator::SetOffset(const double offset){
    _offset = offset;
}

void FunctionGenerator::SetPhase(const double phaseDegrees){
    _phaseDegrees = phaseDegrees;
}

void FunctionGenerator::SetDutyCycle(const double dutyCycle){
    _dutyCycle = dutyCycle;
}

void FunctionGenerator::SetWaveform(const std::string& waveform){
    _waveform = waveform;
}