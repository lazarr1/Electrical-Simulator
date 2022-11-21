#include "simulator/circuit.h"

#include <iostream>


Circuit::Circuit(){
}


// //A "component" is actually just a branch/edge with a component
void Circuit::AddComponent(std::shared_ptr<CircuitComponent> component){

    //store every component
    _components.insert(component);
    
    for(auto iNode : component->connectedNodes){

        // update the incidence matrix
        _incidenceMatrix[iNode][component] = iNode->direction;

        //store every node
        _nodes.insert(iNode);
    }


}




void Circuit::CreateConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    // _nodes.erase(node2);
    //O(logn + logm)
    _incidenceMatrix[node1][node2->connection] = node2->direction;
    _incidenceMatrix.erase(node2);

}

void Circuit::RemoveConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    if(_incidenceMatrix[node1].count(node2->connection)){
        _incidenceMatrix[node1].erase(node2->connection);
        _incidenceMatrix[node2][node2->connection] = node2->direction;    
    }
    else{
        std::cout << "No connection to remove" << std::endl;
    }
}




void Circuit::PrintIM(){

    for(auto i : _nodes){

        // std::cout << i->name;
        if(_incidenceMatrix.count(i) > 0){
            std::cout << i->name;
        }

        for(auto j : _components){
            if(_incidenceMatrix.count(i) > 0){

                if(_incidenceMatrix[i].count(j) > 0){
                    std::cout << " " << _incidenceMatrix[i][j];
                }
                else{
                    std::cout << " 0";
                }
            }
        }
        
        if(_incidenceMatrix.count(i) > 0)
            std::cout<<std::endl;
    }
}

