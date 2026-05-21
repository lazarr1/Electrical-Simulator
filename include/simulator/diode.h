#ifndef DIODE_H
#define DIODE_H

#include "circuit_element.h"

class Diode : public CircuitComponent {

    public:
        Diode(std::string nameInput, CircuitSolver* sim);
        ~Diode();

        void Stamp() override;

        void SetForwardVoltage(const double forwardVoltage);
        void SetOnResistance(const double onResistance);
        void SetOffResistance(const double offResistance);

        const int ioPins = 2;

    private:
        const Direction _direction[2] {In, Out};

        double _forwardVoltage;
        double _onResistance;
        double _offResistance;
};

#endif