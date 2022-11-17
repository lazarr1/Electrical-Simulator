#ifndef SIMULATOR_H
#define SIMULATOR_H


#include <unordered_map>
#include <memory>
#include "circuit_element.h"
#include "circuit.h"


class Simulator{



        void CreateResistor(double resistance);

        //default reistance of 100 ohms
        void CreateResistor();


    private:
        
        Circuit _circuit;

        std::unordered_map<std::string, std::shared_ptr<CircuitElement>> _presentComponents;

};

#endif