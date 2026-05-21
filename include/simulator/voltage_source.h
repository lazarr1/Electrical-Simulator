#ifndef VOLTAGE_SOURCE_H 
#define VOLTAGE_SOURCE_H

#include "circuit_element.h"

class VoltageSource: public CircuitComponent{

    public:
        VoltageSource(std::string nameInput, CircuitSolver* sim);
        ~VoltageSource();

        void PrepareSolver() override;
        void Stamp();

        void ResizeSolver();
        
        const int ioPins = 2;

        double voltage;
        // void Print() const;
        
    protected:
        int _newRow;

    private:
        //A node flows in a node flows out
        const Direction currentDirection[2] {In, Out};

};


#endif
