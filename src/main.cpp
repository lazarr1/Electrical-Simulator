#include <iostream>
#include "simulator/circuit_element.h"
#include "simulator/circuit.h"
#include "simulator/simulator.h"



int main(){

    std::cout << "hio" << std::endl;

    #ifdef __DEBUG__
        Simulator test;

        //cannot do this yet gonna comment the rest of the code first.
        test.CreateResistor(100.0);
        test.CreateResistor(200.0);


        test.PrintComponents();
    #endif

    // Circuit _test;




    return 0;

}