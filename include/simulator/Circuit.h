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

        void AddComponent(std::shared_ptr<CircuitComponent> component);

        void PrintIM();

        // void CreateIncidenceMatrix();

        // void CreateConnection(std::string componentName1, std::string componentName2);

    private:
        //Incidence matrx storing node and edges and their connection. A simple DC-Resistor circuit would look like
        /*
                [DC SUPPLY ] [RESISTOR]
        [Node 1]    -1          1  
        [Node 2]     1         -1

        Here if a component is not found, it is not stored rather than having a zero
        */

        std::map< std::shared_ptr<Node>, std::map< std::shared_ptr<CircuitComponent>, Direction > > _incidenceMatrix;

        //store all the nodes and components
        std::unordered_set<std::shared_ptr<Node>> _nodes;
        std::unordered_set<std::shared_ptr<CircuitComponent>> _components;


        // std::vector<std::vector<int> > _incidenceMatrix;



};

#endif




