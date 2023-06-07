#ifndef CIRCUITHANDLER_H
#define CIRCUITHANDLER_H

#include "simulator.h"
#include <nlohmann/json.hpp>


class CircuitHandler{
    public:
        CircuitHandler();

        void HandleAddComponent(std::string& message );

        void HandleAddConnection(std::string message );

        void GetNodeVoltage(std::string& message);

        void GroundNode(std::string& message);
        
        void Run();

        void SendNodeInformation();

    private:
        Simulator _sim;

        const double defaultResistance = 100;

        const double defaultDCC = 1;
};


#endif
