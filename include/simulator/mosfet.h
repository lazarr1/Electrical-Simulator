#ifndef MOSFET_H
#define MOSFET_H

#include "circuit_element.h"

class MOSFET : public CircuitComponent {

    public:
        MOSFET(std::string nameInput, CircuitSolver* sim, bool pType);
        ~MOSFET();

        void Stamp() override;

        void SetThreshold(const double threshold);
        void SetOnResistance(const double onResistance);
        void SetOffResistance(const double offResistance);

        const int ioPins = 3;

    private:
        const Direction _direction[3] {NoFlow, In, Out};

        bool _pType;
        double _threshold;
        double _onResistance;
        double _offResistance;
};

#endif