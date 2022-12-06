#ifndef DC_SUPPLY_H
#define DC_SUPPLY_H

#include "circuit_element.h"


struct DCSupply: public CircuitComponent{


    // Resistor(std::string nameInput);
    // Resistor(std::string nameInput, std::shared_ptr<Node> positiveNode, std::shared_ptr<Node> negativeNode);
    // ~Resistor();

    const int ioPins = 2;

    void Print() const;
    
    //A node flows in a node flows out
    const Direction passiveDirection[2] {In, Out};


    // Impedance impedance;

    // const int positiveTerminal = 0;
    // const int negativeTerminal = 1;

};


#endif