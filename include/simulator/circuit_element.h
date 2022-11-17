#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H

#include <string>


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
class CircuitElement{

    public:

        //Requires a name for every element
        CircuitElement(std::string nameInput);

        virtual Impedance GetImpedance() = 0;

        std::string GetName();


    private:

        std::string _name;



};


// TO be moved to PassiveElement.h

// class containing a passive component's properties
class PassiveElement: public CircuitElement{

    public: 
        //Use the same constructors as the base circuit element class
        using CircuitElement::CircuitElement;

        Impedance GetImpedance();

        void SetResistance(double resistanceInput);
    
    
    private:
        Impedance _impedance;

        std::string _name;


};




#endif