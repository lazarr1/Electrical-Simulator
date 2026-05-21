#ifndef BJT_H
#define BJT_H

#include "circuit_element.h"

class BJT : public CircuitComponent {

    public:
        BJT(std::string nameInput, CircuitSolver* sim, bool pnp);
        ~BJT();

        void Stamp() override;

        void SetBaseTurnOn(const double baseTurnOn);
        void SetTransconductance(const double transconductance);
        void SetOnResistance(const double onResistance);
        void SetOffResistance(const double offResistance);
        void SetBaseResistance(const double baseResistance);

        const int ioPins = 3;

    private:
        const Direction _direction[3] {NoFlow, In, Out};

        bool _pnp;
        double _baseTurnOn;
        double _transconductance;
        double _onResistance;
        double _offResistance;
        double _baseResistance;
};

#endif