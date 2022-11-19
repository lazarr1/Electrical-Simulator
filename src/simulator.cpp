#include "simulator/simulator.h"

#include <string>
#include <iostream>

#ifdef ___DEBUG__
    #include <assert>
#endif


Simulator::Simulator()
 : _numComponents(0)
{

}

void Simulator::CreateResistor(const double resistanceInput){


    //Increment the count of current components;
    _numComponents++;

    //create a name for the resistor
    std::string name("R" + std::to_string(_numComponents));

    //create a resistor with the given name
    std::shared_ptr<PassiveComponent> resistor = std::make_shared<PassiveComponent>(name);

    resistor->SetResistance(resistanceInput);

    //update the circuit to include the new component
    _circuit.AddComponent(resistor);

    //update the simulator to store the new component
    _presentComponents[resistor->GetName()] = resistor;
    
    

}


void Simulator::CreateConnection(std::string ComponentName1, std::string ComponentName2){

    // if(_presentComponents.count(ComponentName1) && _presentComponents.count(ComponentName2)){

    //     _circuit.CreateConnection(ComponentName1, ComponentName2);

    // }
    // else{
    //     std::cout << "Component does not exist" << std::endl;
    // }


}


#ifdef __DEBUG__
void Simulator::PrintComponents(){

    std::cout << "Checking number of components stored" << std::endl;
    assert(_numComponents == _presentComponents.size());

    std::cout << "Correct number of parts in simulator!@@@@@@@@@@@@@@@@@@@" << std::endl;



    std::cout << "I have " << _numComponents << " components with values: " << std::endl;

    for( auto& iComponent : _presentComponents){
        iComponent.second->Print();
    }

}


#endif