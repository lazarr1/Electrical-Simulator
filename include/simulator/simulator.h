#ifndef SIMULATOR_H
#define SIMULATOR_H


#include <unordered_map>
#include <memory>
#include "circuit_element.h"
#include "circuit.h"

// class Circuit;




//Simulator class 
class Simulator{

    public:


        Simulator();

        void CreateResistor(const double resistanceInput);


        //Connects component 1's positive or negative side to component 2's positive or negative side
        //TOBE overloaded for more complex components or maybe not
        void CreateConnection(std::string ComponentName1, ConnectionSite Connection1, std::string ComponentName2, ConnectionSite Connection2);

        //Removes a connection between two components
        void RemoveConnection(std::string ComponentName1, std::string ComponentName2);

        //default reistance of 100 ohms
        // void CreateResistor();

        void PrintComponents() const;

    private:

        //The simulator keeps track of all its components
        int _numComponents;
        std::unordered_map<std::string, std::shared_ptr<CircuitElement>> _presentComponents;

        //This class may need a component manager to update old components
        //ComponentManager(_presentComponents); <-- contructor like that

        
        Circuit _circuit;


};

#endif