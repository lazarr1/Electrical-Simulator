#ifndef CIRCUIT_ELEMENT_H
#define CIRCUIT_ELEMENT_H

#include <string>
#include <vector>
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
class CircuitElement{

    public:

        //Requires a name for every element
        CircuitElement(std::string nameInput);

        std::string GetName() const;

        
        virtual ~CircuitElement();

        virtual Impedance& GetImpedance() = 0;

        virtual const int GetIOPinNum() const = 0;


        // virtual void AddNode(std::shared_ptr<Node> node) = 0;

        //All classes have access to the connected nodes to make functionality clearer
        // std::vector <std::shared_ptr<Node> > _connectedNodes;




    protected:

        std::string _name;



};


// TO be moved to PassiveElement.h

// class containing a passive component's properties
class PassiveElement: public CircuitElement{

    public: 

        PassiveElement(std::string nameInput);
        ~PassiveElement();

        Impedance& GetImpedance();

        void SetResistance(const double resistanceInput);

        // void AddNode(std::shared_ptr<Node> node);

        const int GetIOPinNum() const;

    
    
    private:

        //might be a base class functionality?
        const int ioPins = 2;

        Impedance _impedance;




};




#endif