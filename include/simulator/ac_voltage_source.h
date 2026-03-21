#ifndef AC_VOLTAGE_SOURCE_H
#define AC_VOLTAGE_SOURCE_H

#include "voltage_source.h"
#include <cmath>

class ACVoltageSource : public VoltageSource {

    public:
        ACVoltageSource(std::string nameInput, CircuitSolver* sim);
        ~ACVoltageSource();

        void Stamp() override;

        void SetAmplitude(const double amplitude);
        void SetFrequency(const double frequency);

    private:
        double _amplitude;
        double _frequency; // Hz
};

#endif
