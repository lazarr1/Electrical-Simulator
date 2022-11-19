#ifndef CIRCUIT_H
#define CIRCUIT_H

#include "circuit_element.h"

#include "edge.h"



#include <memory>
#include <utility>
#include <unordered_set>
#include <string>
#include <vector>

#include <map>

#include "node.h"



// A circuit manages nodes and their components(edges), it is just a graph
class Circuit{

    public:

        Circuit();

        void AddComponent(std::shared_ptr<CircuitElement> component);

        void CreateIncidenceMatrix();

        void CreateConnection(std::string componentName1, std::string componentName2);

        void BeginBFS();

    private:
        //Incidence matrx storing node and edges and their connection. A simple DC-Resistor circuit would look like
        /*
                [DC SUPPLY ] [RESISTOR]
        [Node 1]     -1          1  
        [Node 2]     1          -1
        */
        std::map< std::shared_ptr<Node>, std::map< std::shared_ptr<Edge>, int > > _incidenceMatrix;

        std::vector<std::shared_ptr<Node>> _nodes;
        std::vector<std::shared_ptr<Edge>> _edges;


        // std::vector<std::vector<int> > _incidenceMatrix;


        //===========Functions
        std::shared_ptr<Edge> FindEdge(std::string name);


        void PrintBFS(std::shared_ptr<Node> node);


};

#endif




