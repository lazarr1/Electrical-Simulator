#ifndef CIRCUIT_H
#define CIRCUIT_H

#include "circuit_element.h"




#include <memory>
#include <utility>
#include <unordered_map>
#include <string>

#include "node.h"



// A circuit manages nodes and their components(edges), it is just a graph
class Circuit{

    public:

        Circuit();

        void AddComponent(std::shared_ptr<CircuitElement> component);

        void CreateIncidenceMatrix();

        void CreateConnection(std::string ComponentName1, ConnectionSite Connection1, std::string ComponentName2, ConnectionSite Connection2);



    private:
        std::vector<std::vector<int> > _incidenceMatrix;
        
        //unique nodes x deges; 
        std::pair<int,int> _matrixSize;

        //To avoid using _matrixSize.first/second
        int& GetEdgeCount();
        int& GetPrincipalNodeCount();

        //Full Map of nodes


        //Stores all nodes and all edges
        
        //key is the unique node number
        std::unordered_map<int, std::shared_ptr<Node>> _nodes;

        //key is the component at an edge's name an edge is only created by a component
        std::unordered_map<std::string, std::shared_ptr<CircuitElement>> _components;

};

#endif




