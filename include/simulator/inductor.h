#ifndef INDUCTOR_H
#define INDUCTOR_H

#include "circuit_element.h"
#include "circuit_solver.h"
#include "current_source.h"


class Inductor : public CircuitComponent{

    public:
        Inductor(std::string nameInput, CircuitSolver* sim);
        ~Inductor();

        void Stamp();

        void SetInductance(const double inductance);

        const int ioPins = 2;

        void Update();

        // void Print() const;
        
    private:
        //A node flows in a node flows out
        const Direction passiveDirection[2] {In, Out};

        double _inductance;

        //I think this logic will have to be implemented when AC stuff is added?
        // bool _isTrapizodal;

        //Equvalient resistance and current when transformed to norton 
        // capacitance companion model 
        CurrentSource _eqCurrent;
        Resistor _eqRes;

};

#endif