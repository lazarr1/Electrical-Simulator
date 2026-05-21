#include "simulator/circuithandler.h"

#include <stdexcept>

namespace {
json ParseParams(const std::string& payload) {
    if (payload.empty()) {
        return json::object();
    }

    if (payload.front() == '{') {
        return json::parse(payload);
    }

    return json{{"value", std::stod(payload)}};
}
}

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
    json params = ParseParams(valueStr);

    if(type == "Resistor"){
        std::cout << "Creating Resistor" << std::endl;
        _sim->CreateResistor(params);
    }
    else if(type == "DCCurrent"){
        std::cout << "Creating DCCurrent" << std::endl;
        _sim->CreateCurrentSource(params);
    }
    else if(type == "Capacitor"){
        std::cout << "Creating Capacitor" << std::endl;
        _sim->CreateCapacitor(params);
    }
    else if(type == "Inductor"){
        std::cout << "Creating Inductor" << std::endl;
        _sim->CreateInductor(params);
    }
    else if(type == "VoltageSource"){
        std::cout << "Creating Voltage Source" << std::endl;
        _sim->CreateVoltageSource(params);
    }
    else if(type == "VCCS"){
        std::cout << "Creating VCCS" << std::endl;
        _sim->CreateVccs(params);
    }
    else if(type == "VCVS"){
        std::cout << "Creating VCVS" << std::endl;
        _sim->CreateVcvs(params);
    }
    else if(type == "ACVoltageSource"){
        std::cout << "Creating AC Voltage Source" << std::endl;
        _sim->CreateACVoltageSource(params);
    }
    else if(type == "FunctionGenerator"){
        std::cout << "Creating Function Generator" << std::endl;
        _sim->CreateFunctionGenerator(params);
    }
    else if(type == "Diode"){
        std::cout << "Creating Diode" << std::endl;
        _sim->CreateDiode(params);
    }
    else if(type == "NMOS"){
        std::cout << "Creating NMOS" << std::endl;
        _sim->CreateMosfet(params, false);
    }
    else if(type == "PMOS"){
        std::cout << "Creating PMOS" << std::endl;
        _sim->CreateMosfet(params, true);
    }
    else if(type == "NPN"){
        std::cout << "Creating NPN" << std::endl;
        _sim->CreateBjt(params, false);
    }
    else if(type == "PNP"){
        std::cout << "Creating PNP" << std::endl;
        _sim->CreateBjt(params, true);
    }
    else if(type == "NotGate"){
        std::cout << "Creating Not Gate" << std::endl;
        _sim->CreateDigitalGate("not", params);
    }
    else if(type == "AndGate"){
        std::cout << "Creating And Gate" << std::endl;
        _sim->CreateDigitalGate("and", params);
    }
    else if(type == "OrGate"){
        std::cout << "Creating Or Gate" << std::endl;
        _sim->CreateDigitalGate("or", params);
    }
    else if(type == "NandGate"){
        std::cout << "Creating Nand Gate" << std::endl;
        _sim->CreateDigitalGate("nand", params);
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
}

json CircuitHandler::GetTimeSeriesJSON(){
    return _sim->GetTimeSeriesJSON();
}

void CircuitHandler::ClearCircuit(){
    delete _sim;
    _sim = new Simulator();

}
