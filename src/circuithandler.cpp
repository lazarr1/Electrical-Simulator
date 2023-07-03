#include "simulator/circuithandler.h"

CircuitHandler::CircuitHandler(){ 
    
    _sim = new Simulator();

}
CircuitHandler::~CircuitHandler(){
    delete _sim;
}

void CircuitHandler::HandleAddComponent(std::string& message){

    
    std::string type,valueStr;
    std::size_t slash_pose = message.find('/');

    type = message.substr(0, slash_pose);
    valueStr = message.substr(slash_pose + 1);

    double value = std::stod(valueStr);
    std::cout << value << std::endl;

    if(type == "Resistor"){
        std::cout << "Creating Resistor" << std::endl;
        _sim->CreateResistor(value);
    }
    else if(type == "DCCurrent"){
        std::cout << "Creating DCCurrent" << std::endl;

        _sim->CreateCurrentSource(value);
    }
    else if(type == "Capacitor"){
        std::cout << "Creating Capacitor" << std::endl;
        _sim->CreateCapacitor(value);
    }
    else if(type == "Inductor"){
        std::cout << "Creating Inductor" << std::endl;
        _sim->CreateInductor(value);
    }
    else if(type == "VoltageSource"){
        std::cout << "Creating Voltage Source" << std::endl;
        _sim->CreateVoltageSource(value);
    }
    else{
        std::cout << "Unkown Command: " << message << std::endl;
    }

}

void CircuitHandler::GroundNode(std::string& message){
    std::cout << "grounding node " << message << std::endl;
    _sim->GroundNode(message);
}

void CircuitHandler::HandleAddConnection(std::string message){
    std::string node1,node2;
    std::size_t comma_pose = message.find(',');

    node1 = message.substr(0, comma_pose);
    node2 = message.substr(comma_pose + 1);

    std::cout << node2 << node1 << std::endl;

    _sim->CreateConnection(node1,node2);
}

void CircuitHandler::Run(){
    _sim->Simulate();
    _sim->PrintComponents();
}
void CircuitHandler::GetNodeVoltage(std::string& message){
    std::cout << _sim->GetNodeVoltage(message) << std::endl;
}

json CircuitHandler::GetNodeVoltagesJSON(){
    return _sim->GetNodeVoltagesJSON();
//    ws.write(net::buffer("voltages/" + circuitInfo));
}

void CircuitHandler::ClearCircuit(){
    delete _sim;
    _sim = new Simulator();

}
