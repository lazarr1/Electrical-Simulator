#include <iostream>
// #include "simulator/circuit_element.h"
// #include "simulator/circuit.h"
#include "simulator/simulator.h"
#include <string>


int main(){


    #ifdef __DEBUG__
    {    
        std::cout << "test case 1" << std::endl;
        Simulator test;

        for(int i = 0; i < 7; i++){
            test.CreateResistor(100.0);
        }

        //node1
        test.CreateConnection(std::string("N1"), std::string("N3"));

        //node2
        test.CreateConnection(std::string("N4"), std::string("N5"));
        test.CreateConnection(std::string("N4"), std::string("N7"));

        //node3
        test.CreateConnection(std::string("N8"), std::string("N11"));
        test.CreateConnection(std::string("N8"), std::string("N9"));

        //node4
        test.CreateConnection(std::string("N12"), std::string("N13"));


        //Ground nodes
        test.CreateConnection(std::string("N2"), std::string("N6"));
        test.CreateConnection(std::string("N2"), std::string("N10"));
        test.CreateConnection(std::string("N2"), std::string("N14"));

        test.GroundNode("N2");

        test.CreateCurrentSource(2);
        test.CreateCurrentSource(2);

        test.CreateConnection(std::string("N1"), std::string("N15"));
        test.CreateConnection(std::string("N12"), std::string("N17"));

        test.CreateConnection(std::string("N2"), std::string("N16"));
        test.CreateConnection(std::string("N2"), std::string("N18"));

        test.Simulate();


        test.PrintComponents();


      /*  Output should look like this  IN ANY ORDER
        IM:
        __ R7 R6 R4 R3 R2 R5 R1
        N2 1 0 0 1 0 1 1
        N4 0 0 -1 -1 1 0 0
        N8 0 -1 1 0 0 -1 0
        N12 -1 1 0 0 0 0 0
        N1 0 0 0 0 -1 0 -1

        Stamps:
        0.0200 0.0000 0.0000 -0.0100 0.0000 
        0.0000 0.0000 0.0000 0.0000 0.0000 
        0.0000 0.0000 0.0300 -0.0100 -0.0100 
        -0.0100 0.0000 -0.0100 0.0300 0.0000 
        0.0000 0.0000 -0.0100 0.0000 0.0200  */


    } 

    {
        std::cout << "test case 2: adding a inductor/capacitor in series" << std::endl;
        Simulator test;

        test.CreateCurrentSource(1);
        test.CreateResistor(100.0);
        test.CreateInductor(0.0001);
        // test.CreateCapacitor(0.0001);
        test.CreateResistor(100.0);

        test.CreateConnection(std::string("N1"), std::string("N3"));
        test.CreateConnection(std::string("N1"), std::string("N5"));
        
        
        // test.CreateConnection(std::string("N7"), std::string("N3"));
        test.CreateConnection(std::string("N6"), std::string("N7"));

        test.CreateConnection(std::string("N2"), std::string("N4"));
        test.CreateConnection(std::string("N2"), std::string("N8"));
        test.CreateConnection(std::string("N8"), std::string("N2"));

        
        // test.CreateConnection(std::string("N2"), std::string("N7"));
        // test.CreateConnection(std::string("N6"), std::string("N2"));




        test.GroundNode("N2");


        test.Simulate();

        test.PrintComponents();

 
      /*  Output should look like this  IN ANY ORDER
        IM:
        __ C3 R2 R4 I1
        N6 1 0 -1 0
        N2 0 1 1 1
        N1 -1 -1 0 -1

        Voltages:
        -0.000000000
        -100.000000000 
        */


    }

    {
        std::cout << "test case 3: adding a inductor/capacitor in parralell" << std::endl;
        Simulator test;

        test.CreateCurrentSource(1);
        test.CreateResistor(100.0);
        test.CreateInductor(0.0001);
        // test.CreateCapacitor(0.0001);
        test.CreateResistor(100.0);

        test.CreateConnection(std::string("N1"), std::string("N3"));
        test.CreateConnection(std::string("N1"), std::string("N5"));
        
        
        test.CreateConnection(std::string("N7"), std::string("N1"));
        // test.CreateConnection(std::string("N5"), std::string("N1"));

        test.CreateConnection(std::string("N2"), std::string("N4"));
        test.CreateConnection(std::string("N2"), std::string("N8"));


    
        test.CreateConnection(std::string("N6"), std::string("N2"));


        test.GroundNode("N2");


        test.Simulate();

        test.PrintComponents();

 
      /*  Output should look like this  IN ANY ORDER
        IM:
        __ C3 R2 R4 I1
        N6 1 0 -1 0
        N2 0 1 1 1
        N1 -1 -1 0 -1

        Voltages:
        -0.000000000
        -100.000000000 
        */


    }

    {        
        std::cout << "test case 4: VCCS" << std::endl;
        Simulator test;

        test.CreateCurrentSource(1);
        test.CreateResistor(100.0);
        test.CreateResistor(100.0);
        test.CreateVccs(1);


        test.CreateConnection(std::string("N1"), std::string("N3"));
        test.CreateConnection(std::string("N9"), std::string("N5"));
        
        
        test.CreateConnection(std::string("N1"), std::string("N7"));
        // test.CreateConnection(std::string("N5"), std::string("N1"));

        test.CreateConnection(std::string("N2"), std::string("N4"));
        test.CreateConnection(std::string("N2"), std::string("N8"));
    
        test.CreateConnection(std::string("N6"), std::string("N10"));

        test.CreateConnection(std::string("N2"), std::string("N10"));

        test.GroundNode("N2");

        // test.GroundNode("N6");



        test.Simulate();

        test.PrintComponents();

    }

    #endif





    return 0;

}