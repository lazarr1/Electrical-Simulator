#ifndef NODE_H
#define NODE_H


#include <memory>
#include <vector>

#include "circuit_element.h"



// A node is a network of edges 
class Node{

    public:



    private: 
        // int numAdjacentNodes;
        // std::vector<std::shared_ptr<Node>> _connectedNodes;

        // bool visited;
        int connectedComponents;
        std::vector<std::shared_ptr<CircuitElement>> _circuitComponents;

};


#endif