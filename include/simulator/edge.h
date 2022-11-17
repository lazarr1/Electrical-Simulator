#ifndef EDGE_H
#define EDGE_H

#include <memory>

#include "circuit_element.h"


class Node;

//An edge connects two nodes
class Edge{

    public:
        Edge(std::shared_ptr<CircuitElement> elementType);

        //In the destructor, all connected edges remove their reference to this class
        ~Edge();



    private:

        std::shared_ptr<CircuitElement> elecComponent; 

        //There can only ever be one entry node and one exit node into a component
        std::shared_ptr<Node> _connectedNodes[2];


};

#endif