#ifndef NODE_H
#define NODE_H


#include <memory>
#include <map>
#include <string>

#include "circuit_element.h"



// An electric node is implemented in a disjoint set. It connects a component.
typedef struct Node{

    Node(std::shared_ptr<CircuitComponent> component);

    double voltage;

    //A node flows in this direction to its connection
    //One node only connects to one thing
    Direction direction;
    std::shared_ptr<CircuitComponent> connection;

}Node;



#endif