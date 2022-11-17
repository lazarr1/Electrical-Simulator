#include "simulator/simulator.h"

#include <string>
#include <iostream>


void Simulator::CreateResistor(double resistanceInput){

    //TODO:
        //Implement a counter of number of resistors present
            //Could do this in a static int counter 
            // just simulator counts how many things are created, use this as the key  
                //These createa a bit of overhead, elements now need to store partno
            // Or count how many resistors etc there are
    std::string name("resistor x");

    //create a shared ptr
    std::shared_ptr<PassiveElement> resistor = std::make_shared<PassiveElement>(name);

    resistor->SetResistance(resistanceInput);

    //update the circuit to include the new component
    _circuit.AddComponent(resistor);

    //update the simulator to store the new component
    _presentComponents[resistor->GetName()] = resistor;
    
    

}


// #ifdef debug
void Simulator::PrintComponents(){

    std::cout << "I have " << _presentComponents.size() << " components with values: " << std::endl;

    for( auto& iComponent : _presentComponents){
        std::cout << iComponent.second->GetName() << std::endl;
        std::cout << iComponent.second->GetImpedance().resistance << std::endl;
    }
}
// #endif