#include "simulator/circuithandler.h"

CircuitHandler::CircuitHandler()
    :_sim()
{ 

}

void CircuitHandler::HandleAddComponent(std::string& message){
    if(message == "Resistor"){
        std::cout << "Creating Resistor" << std::endl;
        _sim.CreateResistor(defaultResistance);
    }
    else if(message == "DCCurrent"){
        std::cout << "Creating DCCurrent" << std::endl;

        _sim.CreateCurrentSource(defaultDCC);
    }
    else{
        std::cout << "Unkown Command: " << message << std::endl;
    }

}

void CircuitHandler::GroundNode(std::string& message){
    std::cout << "grounding node " << message << std::endl;
    _sim.GroundNode(message);
}

void CircuitHandler::HandleAddConnection(std::string message){
    std::string node1,node2;
    std::size_t comma_pose = message.find(',');

    node1 = message.substr(0, comma_pose);
    node2 = message.substr(comma_pose + 1);

    std::cout << node2 << node1 << std::endl;

    _sim.CreateConnection(node1,node2);
}

void CircuitHandler::Run(){
    _sim.Simulate();
    _sim.PrintComponents();
}
void CircuitHandler::GetNodeVoltage(std::string& message){
    std::cout << _sim.GetNodeVoltage(message) << std::endl;
}
