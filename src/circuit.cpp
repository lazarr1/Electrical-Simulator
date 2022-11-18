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


    //update the circuit's incidence matrix size
    int edgeCount = GetEdgeCount();
    edgeCount++;

    //update the circuit's number of principal nodes
    int principalNodes = GetPrincipalNodeCount();
    principalNodes += component->GetIOPinNum();


    //store the edges in the circuit
    _components[component->GetName()] = component;

}


void Circuit::CreateConnection(std::string ComponentName1, ConnectionSite Connection1, std::string ComponentName2, ConnectionSite Connection2){
    // if(){

    // }
    // else if(){

    // }
    // else if(){

    // }

}
