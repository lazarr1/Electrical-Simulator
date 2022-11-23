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

        iNode->parent = iNode;

        //store every node
        _nodes.insert(iNode);
    }


}

void Circuit::CreateConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    //merge the bigger node group with the smaller node group
    if(node1->parent->children.size() > node2->parent->children.size()){
        Union(node1, node2);
    }
    else{
        Union(node2, node1);
    }
}

//Creating a connection combines the directions node2 flows with to the directions node1 flows
void Circuit::Union(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    //maybe rename this to union. have this function just check which one has less children and union those 
    // so that run time is quicker much like a disjoint set

    //Let parent node store their connections

    // _incidenceMatrix[node1][node2->parent->connection] = node2->parent->direction;

    //connect node1 with node2's encapsulating parent node
    AddNodeConnection(node1->parent, node2->parent);

    //erase the larger/parent node of node2
    _incidenceMatrix.erase(node2->parent);

    //add all the connections previously in node2 to node1
    for(auto iNode : node2->parent->children){
        // _incidenceMatrix[node1][iNode->connection] = iNode->direction;

        //connect all of node2's children
        AddNodeConnection(node1->parent, iNode);
        
        //update node1's encapsulating/parent node children list
        iNode->parent = node1->parent;
        node1->parent->children.push_back(iNode);
    }
    
    //add node2's encapsulating node to node1
    node1->parent->children.push_back(node2->parent);

    //all of node2's children become node1's
    node2->parent->children.clear();
    node2->parent = node1->parent;

    //node2's parent is now consumed by node1's parent
    // node2->parent = node1->parent;

}

//Deletes all the nodes at a junction
void Circuit::RemoveConnection(std::shared_ptr<Node> node){

    //erase the parent node from the matrix
    _incidenceMatrix.erase(node->parent);
    _incidenceMatrix[node->parent][node->parent->connection] = node->parent->direction;

    //store the parent so that it can later have its children after the for loop
    std::shared_ptr<Node> tempParentPtr = node->parent;


    //Do the same for the children
    for(auto iNode : node->parent->children){
        std::cout <<"name: " << iNode->name << std::endl;
        // _incidenceMatrix.erase(iNode->parent);

        _incidenceMatrix[iNode][iNode->connection] = iNode->direction;
        iNode->parent = iNode;

    }

    //clear the children
    tempParentPtr->parent->children.clear();


}

void Circuit::AddNodeConnection(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    if(_incidenceMatrix[node1].count(node2->connection)){

        //The component has been short circuited as the positive node has been connected to the negative
        if(_incidenceMatrix[node1][node2->connection] != node2->direction){
            #ifdef __DEBUG__
                std::cout << "Short circuit" << std::endl;
            #endif
            _incidenceMatrix[node1][node2->connection] = Direction::NoFlow;
        }

    }
    else{
        _incidenceMatrix[node1][node2->connection] = node2->direction;
    }

    // node2->parent = node1->parent;
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

