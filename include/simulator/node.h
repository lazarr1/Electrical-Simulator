#ifndef NODE_H
#define NODE_H


#include <memory>
#include <map>
#include <string>
#include <unordered_set>

#include "circuit_element.h"




struct Node{

    int rank;
    int parent;

    std::string name;



    Node(std::string nameInput, std::shared_ptr<CircuitComponent> component);

    double voltage;

    // bool operator<(const Node& x) const
    // {
    //     return (name < x.name);
    // }

    
    // bool operator>(const Node& x) const
    // {
    //     return (name > x.name);
    // }

    // bool operator==(const Node& x) const
    // {
    //     return(name == x.name);
    // }


    // struct HashFunction
    // {
    //     size_t operator()(const Node& node) const
    //     {
    //     size_t nameHash = std::hash<std::string>()(node.name);
    //     return nameHash;
    //     }
    // };

    std::unordered_set<std::shared_ptr<Node>> shortCircuits;
    //A node flows in this direction to its connection
    //One node only connects to one thing
    Direction direction;
    std::shared_ptr<CircuitComponent> connection;

};



#endif