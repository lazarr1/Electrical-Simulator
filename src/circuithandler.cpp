#include "simulator/circuithandler.h"

CircuitHandler::CircuitHandler(){ 

}

void CircuitHandler::HandleAddComponent(std::string& message){
    // _sim.CreateResistor()
    std::cout << "Circuit Handler: " << std::endl;

    std::string message_type, message_data;

    //Message will be formated as
    //message:data
    //or: message
    std::size_t colon_pos = message.find(':');
    
    if (colon_pos != std::string::npos) {
        message_type = message.substr(0, colon_pos);
        message_data = message.substr(colon_pos + 1);
    }
    
    if(message == "Resistor"){
        std::cout << "Creating Resistor" << std::endl;
        _sim.CreateResistor(defaultResistance);
    }
    else if(message == "DCCurrent"){
        std::cout << "Creating DCCurrent" << std::endl;

        _sim.CreateCurrentSource(defaultDCC);
    }
    else if (message_type == "CONNECT"){
        //Message will be formated as
        //"CONNECT"N1,N2"
        HandleAddConnection(message_data);
    }
    else if(message_type == "GROUND"){
        _sim.GroundNode(message_data);

        std::cout << "grounding " << message_data << std::endl;
    }
    else{
        std::cout << "Unkown Command: " << message << std::endl;
    }

}

void CircuitHandler::GroundNode(std::string& message){
    _sim.GroundNode(message);
}

void CircuitHandler::HandleAddConnection(std::string message){
    std::string node1,node2;
    std::cout << node2 << node1 << std::endl;
    std::size_t comma_pose = message.find(',');


    node1 = message.substr(0, comma_pose);
    node2 = message.substr(comma_pose + 1);

    _sim.CreateConnection(node1,node2);
}

void CircuitHandler::GetNodeVoltage(std::string& message){
    std::cout << _sim.GetNodeVoltage(message) << std::endl;
}
