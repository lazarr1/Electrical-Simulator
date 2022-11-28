#ifndef CURRENT_SOURCE_H
#define CURRENT_SOURCE_H

#include "circuit_element.h"

class CurrentSource: public CircuitComponent{

    public:
        CurrentSource(std::string nameInput, CircuitSolver* sim);
        ~CurrentSource();

        void Stamp();

        double current;
        
        const int passiveIoPins = 2;

        // void Print() const;
        
    private:
        //A node flows in a node flows out
        const Direction currentDirection[2] {In, Out};

};


#endif