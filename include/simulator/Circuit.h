#ifndef CIRCUIT_H
#define CIRCUIT_H

#include "CircuitElement.h"

#include <vector>
#include <list>
#include <memory>
#include <utility>

//A circuit is just a graph

class Node;

class Edge{

    public:
        
        
    private:



        CircuitElement _elecComponent; 

        //There can only ever be one entry node and one exit node into a component
        std::shared_ptr<Node> _connectedNodes[2];


};

class Node{

    public:


        //void KVL();
        //void KCL();


    private:

        int _numAdjacentNodes;

        //connected nodes unsure if needed rn
        std::vector<std::shared_ptr<Node>> _connectedNodes;

        bool visited;
        int connected;

        //connected edges
        std::vector<std::shared_ptr<Edge>> _circuitComponents;

};




class Circuit{

    public:


    private:

        //Full Map of nodes

        //nodes x vertices; 
        std::pair<int,int> _size;

        std::vector<std::vector< std::shared_ptr<Node>>> _nodes;
        std::vector<std::vector< std::shared_ptr<Edge>>> _edges;

    

};

#endif




