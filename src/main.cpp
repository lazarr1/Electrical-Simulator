#include <iostream>
#include "simulator/circuit_element.h"
#include "simulator/circuit.h"
#include "simulator/simulator.h"
#include <string>



int main(){


    #ifdef __DEBUG__
    {    
        std::cout << "Debugging" << std::endl;

        Simulator test;

        test.CreateResistor(100.0);
        test.CreateResistor(200.0);
        test.CreateResistor(100.0);


        test.CreateConnection(std::string("N1"), std::string("N3"));
        test.CreateConnection(std::string("N5"), std::string("N1"));
        test.RemoveConnection(std::string("N5"));



        test.CreateConnection(std::string("N1"), std::string("N3"));
        // test.CreateConnection(std::string("N1"), std::string("N3"));

        test.CreateConnection(std::string("N5"), std::string("N1"));
        // test.RemoveConnection(std::string("N5"));

        test.CreateConnection(std::string("N1"), std::string("N2"));

        // test.RemoveConnection(std::string("N5"));
        test.Simulate();


        test.PrintComponents();

        test.Simulate();

        //can add a bunch of asserts here etc
    }
    #endif





    
    // #ifdef true

    Simulator test;
    char x[100];

    while(std::cin >> x){
        if(x[0]== 'r'){
            test.CreateResistor(100.0);
        }
        else if(x[0] == 'c'){
            test.CreateConnection(std::string("N" + std::to_string( x[1]-48 )), std::string("N" + std::to_string( x[2]-48 )));
        }
        else if(x[0] == 'p'){
            test.PrintComponents();
        }
        else if(x[0] == 'd'){
            test.RemoveConnection(std::string("N" + std::to_string(x[1] - 48)));
        }
        
        test.Simulate();
        
    }
    // #endif





    return 0;

}