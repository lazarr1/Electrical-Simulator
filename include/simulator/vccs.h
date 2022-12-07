#ifndef VCCS_H
#define VCCS_H

#include "circuit_element.h"
#include "current_source.h"


// A four pin device
class VCCS : public CircuitComponent{

    public:
        VCCS(std::string nameInput, CircuitSolver* sim);
        ~VCCS();

        void Stamp();

        void SetConductance(const double conductance);

        const int ioPins = 4;
        
    private:
        //A node flows in a node flows out
        const Direction _direction[4] {In, Out, In, Out};

        double _conductance;

        // //The voltage reader current source has a value of 0, so it has no effect on the circuit, it is just for 
        // // reading the voltage
        // CurrentSource _voltageReader;
        // CurrentSource _Current;

};


#endif