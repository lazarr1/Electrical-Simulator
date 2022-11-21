#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H

#include <string>
#include <vector>
#include <memory>
#include <iostream>
// #include "node.h"


enum Direction{
    In = -1,
    NotFlowing = 0,
    Out = 1
};

struct Node;

//Struct defining the impedance of a component
struct Impedance{    

    //default all values to 0
    Impedance();


    double resistance;
    double capacitance;
    double inductance;
};




//A abstract class for all circuit components to store all types of circuit elements in a circuit
//All circuit components derive from this class
struct CircuitComponent{


    //Requires a name for every element
    CircuitComponent(std::string nameInput, int numioPins, const Direction * connectionDirections);

    virtual ~CircuitComponent();

    virtual void Print() const;

    std::string name;


    const int ioPins;
    Impedance impedance;


    const Direction * connectionDirection;
    std::vector<std::shared_ptr<Node>> connectedNodes;



};


// TO be moved to PassiveElement.h

// class containing a passive component's properties
struct PassiveComponent: public CircuitComponent{


    PassiveComponent(std::string nameInput);
    PassiveComponent(std::string nameInput, std::shared_ptr<Node> positiveNode, std::shared_ptr<Node> negativeNode);
    ~PassiveComponent();

    const int passiveIoPins = 2;

    void Print() const;
    
    //A node flows in a node flows out
    const Direction passiveDirection[2] {In, Out};


    // Impedance impedance;

    // const int positiveTerminal = 0;
    // const int negativeTerminal = 1;

};




#endif