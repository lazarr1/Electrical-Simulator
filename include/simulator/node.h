#ifndef NODE_H
#define NODE_H


#include <memory>
#include <vector>
#include <string>

#include "edge.h"
#include "circuit_element.h"



// A node is a network of edges 
typedef struct Node{


    std::string nodeName;
    // int numAdjacentNodes;
    // std::vector<std::shared_ptr<Node>> _connectedNodes;

    // bool visited;
    int connectedComponents;

    //Maps all components to their respective nodes 
    std::
    vector<std::shared_ptr<Edge>> connections;

}Node;


#endif