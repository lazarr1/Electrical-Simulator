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

        
        virtual void Update() = 0;


        //each component has a constant number of pins
        const int ioPins;

        //This porvides the interface for external classes like the nodes to know
        //What direction things flow in the component and to know what nodes are connected.
        const Direction * connectionDirection;
        std::vector<std::shared_ptr<Node>> connectedNodes;

    protected:

        std::string name;

        CircuitSolver* _solver;

};


// TO be moved to resistor.h

// class containing a resitor  properties
class Resistor: public CircuitComponent{

    public:
        Resistor(std::string nameInput, CircuitSolver* sim);
        ~Resistor();

        void Stamp();

        double resistance;

        void Update();


        const int passiveIoPins = 2;

        // void Print() const;
        
    private:
        //A node flows in a node flows out
        const Direction passiveDirection[2] {In, Out};

};




#endif