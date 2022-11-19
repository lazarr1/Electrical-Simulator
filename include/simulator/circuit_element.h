#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H

#include <string>
#include <vector>
#include <memory>
#include <iostream>
// #include "node.h"


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
            CircuitComponent(std::string nameInput);

            virtual ~CircuitComponent();

            virtual void Print() const = 0;

            std::string GetName() const;
            
            virtual Impedance GetImpedance() const = 0;

            virtual void SetResistance(double resistance) = 0;


        protected:
            std::string _name;

            // Impedance impedance;

            std::vector<std::shared_ptr<Node> > _terminals;


};


// TO be moved to PassiveElement.h

// class containing a passive component's properties
class PassiveComponent: public CircuitComponent{

    public:
        PassiveComponent(std::string nameInput);
        PassiveComponent(std::string nameInput, std::shared_ptr<Node> positiveNode, std::shared_ptr<Node> negativeNode);
        ~PassiveComponent();

        void Print() const;

        void SetResistance(double resistance);

        Impedance GetImpedance() const;


    private:
        const int _ioPins = 2;

        Impedance _impedance;

        const int _positiveTerminal = 0;
        const int _negativeTerminal = 1;

};




#endif