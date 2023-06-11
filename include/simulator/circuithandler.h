#ifndef CIRCUITHANDLER_H
#define CIRCUITHANDLER_H

#include "simulator.h"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

class CircuitHandler{
    public:
        CircuitHandler();

        ~CircuitHandler();

        void HandleAddComponent(std::string& message );

        void HandleAddConnection(std::string message );

        void GetNodeVoltage(std::string& message);

        void GroundNode(std::string& message);
        
        void Run();

        json GetNodeVoltagesJSON();

        void ClearCircuit();

    private:
        Simulator* _sim;

        const double defaultResistance = 100;

        const double defaultDCC = 1;

//        json circuitInfo;
};


#endif
