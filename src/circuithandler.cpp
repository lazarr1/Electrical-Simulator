#include "simulator/circuithandler.h"


CircuitHandler::CircuitHandler(){

}

void CircuitHandler::HandleAddComponent(std::string& message){
    // _sim.CreateResistor()

    if(message == "CreateResistor"){
        _sim.CreateResistor(defaultResistance);
    }
    if(message == "CreateDCCurrent"){
        _sim.CreateCurrentSource(defaultDCC);
    }


}

void CircuitHandler::HandleAddConnection(std::string& message){

}

void CircuitHandler::GetVoltage(std::string& message){

}