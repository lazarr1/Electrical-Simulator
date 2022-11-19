#include "simulator/circuit.h"




Circuit::Circuit(){
    _matrixSize.first = 0;
    _matrixSize.second = 0;
}

int & Circuit::GetEdgeCount(){
    return _matrixSize.first;
}

int & Circuit::GetPrincipalNodeCount(){
    return _matrixSize.second;
}

//A "component" is actually just a branch/edge with a component
void Circuit::AddComponent(std::shared_ptr<CircuitElement> component){


    //update the circuit's number of edges
    int edgeCount = GetEdgeCount();
    edgeCount++;

    //update the circuit's number of principal nodes
    int principalNodes = GetPrincipalNodeCount();
    principalNodes += component->GetIOPinNum();

    
    //create the edge with the given component
    std::shared_ptr<Edge> edge = std::make_shared<Edge>();
    edge->elecComponent = component;


    for(int iNewNodes = 0; iNewNodes < component->GetIOPinNum(); iNewNodes++){
        std::shared_ptr<Node> node = std::make_shared<Node>();

        //the node needs to know what edges it is connected to
        node->connections.push_back(edge);

        //the edge needs to know what nodes it connects
        edge->connectedNodes.push_back(node);

        //the circuit stores all nodes
        _nodes.push_back(node);
    }


    //the circuit stores all edges
    _edges.push_back(edge);


}


void Circuit::CreateConnection(std::string ComponentName1, ConnectionSite Connection1, std::string ComponentName2, ConnectionSite Connection2){
    // if(){

    // }
    // else if(){

    // }
    // else if(){

    // }

}
