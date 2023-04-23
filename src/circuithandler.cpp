#include "simulator/circuithandler.h"


CircuitHandler::CircuitHandler(){

}

void CircuitHandler::HandleAddComponent(std::string& message){
    // _sim.CreateResistor()
    std::cout << "Circuit Handler: " << std::endl;
    if(message == "Resistor"){
        std::cout << "Creating Resistor" << std::endl;
        _sim.CreateResistor(defaultResistance);
    }
    if(message == "DCCurrent"){
        std::cout << "Creating DCCurrent" << std::endl;

        _sim.CreateCurrentSource(defaultDCC);
    }
    else{
        std::cout << "Unkown Component: " << message << std::endl;
    }


}

void CircuitHandler::GroundNode(std::string& message){
    _sim.GroundNode(message);
}

void CircuitHandler::HandleAddConnection(std::string& message){
    std::string node1,node2;

    std::size_t comma_pose = message.find(',');


    node1 = message.substr(0, comma_pose);
    node2 = message.substr(comma_pose + 1);

    _sim.CreateConnection(node1,node2);
}

void CircuitHandler::GetNodeVoltage(std::string& message){
    std::cout << _sim.GetNodeVoltage(message) << std::endl;

    
}
