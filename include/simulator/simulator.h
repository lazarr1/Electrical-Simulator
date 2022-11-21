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



        void CreateConnection(std::string NodeName1, std::string NodeName2);

        //Removes a connection between two components
        void RemoveConnection(std::string NodeName1, std::string NodeName2);

        //default reistance of 100 ohms
        // void CreateResistor();

        void PrintComponents();

    private:

        //The simulator keeps track of all its components
        int _numComponents;
        int _numNodes;
        std::unordered_map<std::string, std::shared_ptr<CircuitComponent>> _presentComponents;
        std::unordered_map<std::string, std::shared_ptr<Node>> _nodes;

        
        Circuit _circuit;


};

#endif