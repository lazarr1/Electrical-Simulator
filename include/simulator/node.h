#ifndef NODE_H
#define NODE_H


#include <memory>
#include <vector>
#include <string>

#include "edge.h"
#include "circuit_element.h"



// An electric node is implemented in a disjoint set. It connects a component.
typedef struct Node{

    int rank;
    int parent;

    std::vector<Node> children;

    Node(int rankInput, std::shared_ptr<CircuitComponent> );


    //All nodes a component they are connected to
    std::shared_ptr<CircuitComponent>> connection;

}Node;


//nodes are stored as a disjoint set, where each node stores 
class NodeManager{
    public:

        void AddNode(Node);

        Node& Find(Node node);

        void ConnectNodes(Node a, Node b);

        void DisconnectNode(Node a);


    private:

        std::vector<Node> set;
};

#endif