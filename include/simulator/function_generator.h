#ifndef FUNCTION_GENERATOR_H
#define FUNCTION_GENERATOR_H

#include "voltage_source.h"

class FunctionGenerator : public VoltageSource {

    public:
        FunctionGenerator(std::string nameInput, CircuitSolver* sim);
        ~FunctionGenerator();

        void Stamp() override;

        void SetAmplitude(const double amplitude);
        void SetFrequency(const double frequency);
        void SetOffset(const double offset);
        void SetPhase(const double phaseDegrees);
        void SetDutyCycle(const double dutyCycle);
        void SetWaveform(const std::string& waveform);

    private:
        double _amplitude;
        double _frequency;
        double _offset;
        double _phaseDegrees;
        double _dutyCycle;
        std::string _waveform;
};

#endif