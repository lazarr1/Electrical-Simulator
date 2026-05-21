#ifndef VCVS_H
#define VCVS_H

#include "circuit_element.h"

class VCVS : public CircuitComponent {

    public:
        VCVS(std::string nameInput, CircuitSolver* sim);
        ~VCVS();

        void PrepareSolver() override;
        void Stamp() override;

        void SetGain(const double gain);

        const int ioPins = 4;

    private:
        const Direction _direction[4] {In, Out, In, Out};

        double _gain;
        int _newRow;
};

#endif