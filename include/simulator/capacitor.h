#ifndef CAPACITOR_H
#define CAPACITOR_H

#include "circuit_element.h"
#include "circuit_solver.h"
#include "current_source.h"


class Capacitor : public CircuitComponent{

    public:
        Capacitor(std::string nameInput, CircuitSolver* sim);
        ~Capacitor();

        void Stamp();

        void SetCapacitance(const double capacitance);

        const int passiveIoPins = 2;

        void Update();

        // void Print() const;
        
    private:
        //A node flows in a node flows out
        const Direction passiveDirection[2] {In, Out};

        double _capacitance;

        bool _isTrapizodal;

        //Equvalient resistance and current when transformed to norton 
        // capacitance companion model 
        CurrentSource _eqCurrent;
        Resistor _eqRes;

};

#endif