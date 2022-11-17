#include "simulator/simulator.h"

#include <string>



void Simulator::CreateResistor(double resistance){

    //TODO:
        //Implement a counter of number of resistors present
            //Could do this in a static int counter 
            // just simulator counts how many things are created, use this as the key  
                //These createa a bit of overhead, elements now need to store partno
            // Or count how many resistors etc there are

    std::string name("resistor x");
    auto resistor = std::make_shared<PassiveElement>(name);

    _presentComponents[resistor->name] = resistor;

    
    



}