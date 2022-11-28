#ifndef CIRCUIT_H
#define CIRCUIT_H


#include "circuit_element.h"

#include <memory>
#include <unordered_set>
#include <string>
#include <vector>

#include <map>

#include "node.h"

#include <boost/numeric/ublas/matrix.hpp>

/*  Class: Circuit
 *      This class manages all the connections, it is a graph. It also builds the stamp matrices that must be solved
 *      to solve the circuit.
 *
 * 
 * 
 *      Member functions:
 *          -
 * 
 *  
 *     TOBE implemented:
 *          - Split into a circuit solver? this should just manage the connections maybe?
 * 
 */
class Circuit{

    public:

        Circuit(CircuitSolver* solver);

        void AddComponent(std::shared_ptr<CircuitComponent> component);

        void PrintIM();

        void CreateConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2);

        void RemoveConnection(std::shared_ptr<Node> node);

        void BuildCircuitMatrix();

        // void StampMatrix(const int i, const int j, const double x);


    private:



        void AddNodeConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2);
        void Union(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2);

        //Incidence matrx storing node and edges and their connection. A simple DC-Resistor circuit would look like
        /*
                [DC SUPPLY]  [RESISTOR]
        [Node 1]    -1          1  
        [Node 2]     1         -1

        Here if a component is not found, it is not stored rather than having a zero

        This exists just for testing purposes
        */
        std::map< std::shared_ptr<Node>, std::map< std::shared_ptr<CircuitComponent>, Direction > > _incidenceMatrix;


        //This is the stamp matrix
        /*
            Addmittance matrix
        */

       CircuitSolver * _solver;
        // boost::numeric::ublas::matrix<double> _circuitMatrix;

        //store all the nodes and components
        std::unordered_set<std::shared_ptr<Node>> _nodes;
        std::unordered_set<std::shared_ptr<CircuitComponent>> _components;

        // std::vector<std::shared_ptr<Node>> _parentNodes;


};

#endif