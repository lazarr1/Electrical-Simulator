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


enum ConnectionSite{
    negative = 0,
    positive = 1

    //might have more sites for more complex components, for now this will suffice
};


//A abstract class for all circuit components to store all types of circuit elements in a circuit
//All circuit components derive from this class
class CircuitElement{

    public:

        //Requires a name for every element
        CircuitElement(std::string nameInput);

        std::string GetName() const;

        
        virtual ~CircuitElement();

        virtual Impedance& GetImpedance() = 0;

        virtual const int GetIOPinNum() const = 0;




    private:

        std::string _name;



};


// TO be moved to PassiveElement.h

// class containing a passive component's properties
class PassiveElement: public CircuitElement{

    public: 
        //Use the same constructors and destructors as the base circuit element class
        using CircuitElement::CircuitElement;
        ~PassiveElement();

        Impedance& GetImpedance();

        void SetResistance(const double resistanceInput);

        const int GetIOPinNum() const;

    
    
    private:

        const int ioPins = 2;
        Impedance _impedance;

        std::string _name;


};




#endif