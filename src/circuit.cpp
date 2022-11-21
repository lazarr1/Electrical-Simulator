#include "simulator/circuit.h"

#include <iostream>


Circuit::Circuit(){
}



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



//Creating a connection combines the directions node2 flows with to the directions node1 flows
void Circuit::CreateConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    // _nodes.erase(node2);
    //Let nodes store their connections
    node1->shortCircuits.insert(node2);

    //represent the nodes as node1 in the incidence matrix
    _incidenceMatrix[node1][node2->connection] = node2->direction;
    _incidenceMatrix.erase(node2);

    //add all the connections previously in node2 to node1
    for(auto iNode : node2->shortCircuits){
        _incidenceMatrix[node1][iNode->connection] = iNode->direction;
        // _incidenceMatrix.erase(iNode);
    }
    
    //all of node2's short circuit become node1's
    node2->shortCircuits.clear();

}

void Circuit::RemoveConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    //remove 
    node1->shortCircuits.erase(node2);
    node2->shortCircuits.erase(node1);


    if(_incidenceMatrix.count(node1)){
        if(_incidenceMatrix[node1].count(node2->connection)){

            _incidenceMatrix[node1].erase(node2->connection);
            _incidenceMatrix[node2][node2->connection] = node2->direction;    

            for(auto iNode : node1->shortCircuits){
                _incidenceMatrix[node2][iNode->connection] = iNode->direction;
                node2->shortCircuits.insert(iNode);
                _incidenceMatrix[node1].erase(iNode->connection);
            }
            node1->shortCircuits.clear();
        }
    }
    else if(_incidenceMatrix.count(node2)){
        if(_incidenceMatrix[node2].count(node1->connection)){

            _incidenceMatrix[node2].erase(node1->connection);
            _incidenceMatrix[node1][node1->connection] = node1->direction;    

            // for(auto iNode : node1->shortCircuits){
            //     if(node1->shortCircuits.count(iNode) == 0){
            //         _incidenceMatrix[node1][iNode->connection] = iNode->direction;
            //         _incidenceMatrix[node2].erase(iNode->connection);
            //     }   
            // }

        }

    }
    else{
        std::cout << "No connection to remove" << std::endl;
    }
}




void Circuit::PrintIM(){

    std::cout << "__" ;
    for(auto j : _components){
        std::cout <<" "<< j->name;
    }
    std::cout << std::endl;
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

