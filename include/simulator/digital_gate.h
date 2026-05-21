#ifndef DIGITAL_GATE_H
#define DIGITAL_GATE_H

#include "circuit_element.h"

class DigitalGate : public CircuitComponent {

    public:
        DigitalGate(std::string nameInput, int pins, const Direction* directions, const std::string& kind, CircuitSolver* sim);
        ~DigitalGate();

        void PrepareSolver() override;
        void Stamp() override;

        void SetThreshold(const double threshold);
        void SetHighLevel(const double highLevel);
        void SetLowLevel(const double lowLevel);

    private:
        bool Evaluate() const;

        std::string _kind;
        double _threshold;
        double _highLevel;
        double _lowLevel;
        int _newRow;
};

#endif