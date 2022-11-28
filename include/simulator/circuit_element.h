#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H

#include <string>
#include <vector>
#include <memory>
#include <iostream>
// #include "node.h"

#include "circuit_solver.h"


enum Direction{
    In = -1,
    NoFlow = 0,
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
class CircuitComponent{

    public:
        //Requires a name for every element
        CircuitComponent(std::string nameInput, int numioPins, const Direction * connectionDirections, CircuitSolver* sim);

        virtual ~CircuitComponent();
        virtual void Stamp() = 0;

        virtual void Print() const;

        std::string GetName() const;


        //each component has a constant number of pins
        const int ioPins;

        //This porvides the interface for external classes like the nodes to know
        //What direction things flow in the component and to know what nodes are connected.
        const Direction * connectionDirection;
        std::vector<std::shared_ptr<Node>> connectedNodes;

    protected:

        std::string name;

        CircuitSolver* _sim;

};


// TO be moved to PassiveElement.h

// class containing a passive component's properties
class PassiveComponent: public CircuitComponent{

    public:
        PassiveComponent(std::string nameInput, CircuitSolver* sim);
        ~PassiveComponent();

        void Stamp();

        Impedance impedance;


        const int passiveIoPins = 2;

        // void Print() const;
        
    private:
        //A node flows in a node flows out
        const Direction passiveDirection[2] {In, Out};

};




#endif