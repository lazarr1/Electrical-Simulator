#ifndef NODE_H
#define NODE_H


#include <memory>
#include <vector>


#include "edge.h"

// A node is a network of edges 
class Node{

    public:



    private: 
        int numAdjacentNodes;
        std::vector<std::shared_ptr<Node>> _connectedNodes;

        // bool visited;
        int connectedEdges;
        //connected edges
        std::vector<std::shared_ptr<Edge>> _circuitComponents;

};


#endif