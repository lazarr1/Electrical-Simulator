#include "simulator/circuit.h"




Circuit::Circuit(){
    _matrixSize.first = 0;
    _matrixSize.second = 0;
}

int & Circuit::GetEdgeCount(){
    return _matrixSize.first;
}

int & Circuit::GetNodeCount(){
    return _matrixSize.second;
}

//A "component" is actually just a branch/edge with a component
void Circuit::AddComponent(std::shared_ptr<CircuitElement> component){

    //create an edge with the component
    std::shared_ptr<Edge> edge = std::make_shared<Edge>(component);

    //increment the edge count of the circuit's size
    int & edgeCount = GetEdgeCount();
    edgeCount++;


}