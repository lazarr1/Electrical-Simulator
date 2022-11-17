#ifndef CIRCUIT_H
#define CIRCUIT_H

#include "circuit_element.h"

#include <vector>
#include <list>
#include <memory>
#include <utility>

#include "node.h"
#include "edge.h"


// A circuit manages nodes and edges, it is just a graph
class Circuit{

    public:

        void AddComponent(std::shared_ptr<CircuitElement> component);


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




