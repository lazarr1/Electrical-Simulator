#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H





// struct PassiveImpedance{
//     double _resistance;
//     double _capacitance;
//     double _inductance;
// };


// A struct that allows a node to store all types of circuit elements
struct CircuitElement{




};


// TO be moved to PassiveElement.h
// truct defining the basic properties of a circuit element
struct CPassiveElement: public CircuitElement{

    double _resistance;
    double _capacitance;
    double _inductance;

};




#endif