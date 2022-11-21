#include <iostream>
#include "simulator/circuit_element.h"
#include "simulator/circuit.h"
#include "simulator/simulator.h"



int main(){


    #ifdef __DEBUG__
        
        std::cout << "Debugging" << std::endl;

        Simulator test;

        test.CreateResistor(100.0);
        test.CreateResistor(200.0);
        test.CreateResistor(100.0);


        test.CreateConnection(std::string("N1"), std::string("N3"));
        test.CreateConnection(std::string("N5"), std::string("N1"));
        test.RemoveConnection(std::string("N5"), std::string("N3"));

        test.CreateConnection(std::string("N1"), std::string("N2"));

        test.PrintComponents();

        //can add a bunch of asserts here etc
    #endif

    // Circuit _test;




    return 0;

}