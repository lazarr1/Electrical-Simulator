#ifndef SIMULATOR_H
#define SIMULATOR_H


#include <unordered_map>
#include <memory>
#include "circuit_element.h"
#include "circuit.h"

#include "circuit_solver.h"



/*  Class: Simulator
 *      This class manages all the components, manages any changes to the components and 
 *      forwards any changes made to the circuit 
 *
 * 
 * 
 *      Member functions:
 *          - CreateResistor: takes in a resistance to make a resistor
 *          - GroundNode: grounds a node
 *          - CreateConnection: creates a connection between two nodes
 *          - RemoveConnection: removes all nodes at a junction
 *          - PrintComponents: prints all components, and tells 
 *             circuit to print its information  only avliable in debug mode
 *          - Simulate: Runs the simulation
 * 
 *  
 *     TOBE implemented:
 *          - Remove connection, without destroying entire junction
 *          - Adding other components
 * 
 */
class Simulator{

    public:


        Simulator();

        void CreateResistor(const double resistanceInput);

        void CreateCurrentSource(const double current);

        void CreateCapacitor(const double capacitance);

        void CreateInductor(const double inductance);

        void CreateVccs(const double conductance);

        void GroundNode(std::string NodeName);

        void CreateConnection(std::string NodeName1, std::string NodeName2);

        void RemoveConnection(std::string NodeName);

        void PrintComponents();

        void Simulate();

    private:

        void AllocateNodes(std::shared_ptr<CircuitComponent> component);


        //The simulator keeps track of all its components
        int _numComponents;
        int _numNodes;
        std::unordered_map<std::string, std::shared_ptr<CircuitComponent>> _presentComponents;
        std::unordered_map<std::string, std::shared_ptr<Node>> _nodes;

        CircuitSolver _solver;

        
        Circuit _circuit;


};

#endif