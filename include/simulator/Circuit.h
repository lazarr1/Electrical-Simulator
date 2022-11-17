#ifndef CIRCUIT_H
#define CIRCUIT_H

#include "circuit_element.h"

#include <vector>
#include <list>
#include <memory>
#include <utility>

//A circuit is just a graph

class Node;

//An edge connects two nodes
struct Edge{

    Edge(CircuitElement elementType);

    std::shared_ptr<CircuitElement> elecComponent; 

    //There can only ever be one entry node and one exit node into a component
    std::shared_ptr<Node> _connectedNodes[2];


};


// A node is a network of edges 
struct Node{


    int numAdjacentNodes;
    std::vector<std::shared_ptr<Node>> _connectedNodes;

    // bool visited;
    int connectedEdges;
    //connected edges
    std::vector<std::shared_ptr<Edge>> _circuitComponents;

};



// A circuit manages nodes and edges, it is just a graph
class Circuit{

    public:

        void CreateIncidenceMatrix();


    private:



        std::vector<std::vector<int> > _incidenceMatrix;

        //Full Map of nodes

        //nodes x vertices; 
        std::pair<int,int> _size;

        std::vector<std::vector< std::shared_ptr<Node>>> _nodes;
        std::vector<std::vector< std::shared_ptr<Edge>>> _edges;

    

};

#endif




