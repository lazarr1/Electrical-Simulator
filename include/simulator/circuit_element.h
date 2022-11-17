#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H

#include <string>




// struct PassiveImpedance{
//     double _resistance;
//     double _capacitance;
//     double _inductance;
// };


// A struct that allows a node to store all types of circuit elements
struct CircuitElement{

    CircuitElement(std::string nameInput);

    std::string name;

};


// TO be moved to PassiveElement.h
// truct defining the basic properties of a circuit element
struct PassiveElement: public CircuitElement{

    //Use the same constructors as the base circuit element class
    using CircuitElement::CircuitElement;
    
    // PassiveElement(std::string nameInput);
    
    double _resistance;
    double _capacitance;
    double _inductance;

};




#endif