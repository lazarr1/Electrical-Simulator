#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H

#include <string>



struct Impedance{    

    Impedance();

    double resistance;
    double capacitance;
    double inductance;
};


// A base struct for all circuit components to store all types of circuit elements
class CircuitElement{

    public:
        CircuitElement(std::string nameInput);

        virtual Impedance GetImpedance() = 0;

        std::string GetName();


    private:

        std::string _name;



};


// TO be moved to PassiveElement.h

// struct containing a passive circuit component's properties
class PassiveElement: public CircuitElement{

    public: 
        //Use the same constructors as the base circuit element class
        using CircuitElement::CircuitElement;

        Impedance GetImpedance();

        void SetResistance(double resistanceInput);
    
    // PassiveElement(std::string nameInput);
    
    private:
        Impedance _impedance;

        std::string _name;


};




#endif