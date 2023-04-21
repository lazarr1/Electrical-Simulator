#ifndef CIRCUITHANDLER_H
#define CIRCUITHANDLER_H

#include "simulator.h"

class CircuitHandler{
    public:
        CircuitHandler();

        void HandleAddComponent(std::string& message );

        void HandleAddConnection(std::string& message );



    private:
        Simulator _sim;
};


#endif