#ifndef VOLTAGE_SOURCE_H 
#define VOLTAGE_SOURCE_H

#include "circuit_element.h"

class VoltageSource: public CircuitComponent{

    public:
        VoltageSource(std::string nameInput, CircuitSolver* sim);
        ~VoltageSource();

        void Stamp();

        void ResizeSolver();
        
        const int ioPins = 2;

        double voltage;
        // void Print() const;
        
    private:
        //A node flows in a node flows out
        const Direction currentDirection[2] {In, Out};

        int _newRow;

};


#endif
