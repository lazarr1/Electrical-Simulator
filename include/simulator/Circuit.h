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

        Circuit();

        void AddComponent(std::shared_ptr<CircuitElement> component);


        void CreateIncidenceMatrix();

        int& GetEdgeCount();
        int& GetNodeCount();



    private:



        std::vector<std::vector<int> > _incidenceMatrix;
        
        //nodes x deges; 
        std::pair<int,int> _matrixSize;

        //Full Map of nodes



        std::vector<std::vector< std::shared_ptr<Node>>> _nodes;
        std::vector<std::vector< std::shared_ptr<Edge>>> _edges;

    

};

#endif




