#ifndef EDGE_H
#define EDGE_H

#include <memory>
#include <vector>

#include "circuit_element.h"


struct Node;

//An edge contains a single component and allows other nodes to connect to it
struct Edge{
  
        //The component connecting the nodes
        std::shared_ptr<CircuitElement> elecComponent; 


        //Connected nodes
        std::vector<std::shared_ptr<Node>> connectedNodes;


};

#endif