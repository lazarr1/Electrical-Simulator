#include "simulator/circuit.h"

#include <iostream>


Circuit::Circuit(){
}


// //A "component" is actually just a branch/edge with a component
void Circuit::AddComponent(std::shared_ptr<CircuitComponent> component){

//     //create the edge with the given component
//     std::shared_ptr<Edge> edge = std::make_shared<Edge>();
//     edge->elecComponent = component;

//     //create a new node for each IOPin
//     for(int iNewNodes = 0; iNewNodes < component->GetIOPinNum(); iNewNodes++){
//         std::shared_ptr<Node> node = std::make_shared<Node>();

//         //the node needs to know what edges it is connected to
//         node->connections.push_back(edge);

//         //the edge needs to know what nodes it connects
//         edge->connectedNodes.push_back(node);

//         //the circuit stores all nodes
//         _nodes.push_back(node);
//     }


//     //the circuit stores all edges
//     _edges.push_back(edge);


}

// std::shared_ptr<Edge> Circuit::FindEdge(std::string name){

//     // std::shared_ptr<Edge> edge = NULL;

//     for( std::shared_ptr<Edge>& iEdge : _edges){
//         if(iEdge->elecComponent->GetName() == name){
//             return iEdge;
//             break;
//         }
//     }

//     //Exception
//     //This stinks
//     std::cout <<"The object was found in the simulator, but wasn't listed as an edge, big error" << std::endl;
//     exit(1);



// }

// void Circuit::CreateConnection(std::string componentName1, std::string componentName2){

//     //Find the edges to connect
//     std::shared_ptr<Edge> edge1 = FindEdge(componentName1);
//     std::shared_ptr<Edge> edge2 = FindEdge(componentName2);

//     // //iterate through the nodes the edges connect
//     for(auto iNodes : edge1->connectedNodes){
//         iNodes->connections.push_back(edge2);

//         edge2->connectedNodes.push_back(iNodes);
//     }
    
//     for(auto iNodes : edge2->connectedNodes){
//         iNodes->connections.push_back(edge1);

//         edge1->connectedNodes.push_back(iNodes);

//     }

// }

// void Circuit::BeginBFS(){

//     std::cout << "There are " << _nodes.size() << " Nodes" << std::endl;
//     std::cout << "There are " << _edges.size() << " Edges" << std::endl;


//     PrintBFS(_nodes[0]);

//     for(auto & iNode : _nodes){
//         iNode->visited = false;
//     }
// }

// void Circuit::PrintBFS(std::shared_ptr<Node> node){

//     if(!node->visited){

//         //start on the first node
//         for(auto iEdge : node->connections){
//             std::cout << iEdge->elecComponent->GetName() << std::endl;
//         }
//         std::cout << "visited" << std::endl;
        
//         node->visited = true;

//         for(auto iEdge : node->connections){
//             for(auto iNode : iEdge->connectedNodes){
//                 PrintBFS(iNode);
//             }
//         }

//     }

// }

