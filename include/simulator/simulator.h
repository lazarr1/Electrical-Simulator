#ifndef SIMULATOR_H
#define SIMULATOR_H


#include <unordered_map>
#include <memory>
#include "circuit_element.h"
#include "circuit.h"


//Simulator class 
class Simulator{

    public:


        Simulator();

        void CreateResistor(double resistanceInput);

        //default reistance of 100 ohms
        void CreateResistor();

        void PrintComponents();

    private:

        //The simulator keeps track of all its components
        int _numComponents;
        std::unordered_map<std::string, std::shared_ptr<CircuitElement>> _presentComponents;

        
        Circuit _circuit;


};

#endif