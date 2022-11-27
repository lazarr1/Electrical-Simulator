#include "simulator/circuit.h"

#include <iostream>
#include <iomanip>

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

    //If they are not already connected
    if(node1->parent != node2->parent){

        //merge the bigger node group with the smaller node group
        if(node1->parent->children.size() > node2->parent->children.size()){
            Union(node1, node2);
        }
        else{
            Union(node2, node1);
        }
    }

}

//Creating a connection combines the directions node2 flows with to the directions node1 flows
void Circuit::Union(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2){

    //connect node1 with node2's encapsulating parent node
    AddNodeConnection(node1->parent, node2->parent);

    //erase the larger/parent node of node2
    _incidenceMatrix.erase(node2->parent);

    //add all the connections previously in node2 to node1
    for(auto iNode : node2->parent->children){

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


void Circuit::BuildCircuitMatrix(){

    //map each node in a consecutively numbered way to build the stamp matrix
    int idGenerator = 0;
    for(std::shared_ptr<Node> iNode : _nodes){
        if(iNode->parent == iNode){
            iNode->id = idGenerator++;
        }
    }
    
    //resize square matrix, do not keep the previous values
    _circuitMatrix.resize(idGenerator,idGenerator, false);


    for(std::shared_ptr<CircuitComponent> iComponent : _components){ 
            //if the component is a resistor
            if(iComponent->name[0] == 'R'){
                StampResistor(*iComponent);
            }
    }

    // std::cout << _circuitMatrix(0,0) << std::endl;

}

void Circuit::StampResistor(const CircuitComponent resistor){

    if(resistor.impedance.resistance == 0){
        std::cout << "bad resistance" << std::endl;
    }
    else{
        double addmittance = 1/resistor.impedance.resistance;

        StampMatrix(resistor.connectedNodes[0]->parent->id, resistor.connectedNodes[0]->parent->id ,addmittance);
        StampMatrix(resistor.connectedNodes[0]->parent->id, resistor.connectedNodes[1]->parent->id ,-addmittance);
        StampMatrix(resistor.connectedNodes[1]->parent->id, resistor.connectedNodes[0]->parent->id ,-addmittance);
        StampMatrix(resistor.connectedNodes[1]->parent->id, resistor.connectedNodes[1]->parent->id ,addmittance);



    }


}

void Circuit::StampMatrix(const int i, const int j, const double x){

    _circuitMatrix(i,j) += x;

}

void Circuit::PrintIM(){

    // std::cout << "__" ;
    // for(auto j : _components){
    //     std::cout <<" "<< j->name;
    // }
    // std::cout << std::endl;
    // for(auto i : _nodes){

    //     // std::cout << i->name;
    //     if(_incidenceMatrix.count(i) > 0){
    //         std::cout << i->name;
    //     }

    //     for(auto j : _components){
    //         if(_incidenceMatrix.count(i) > 0){

    //             if(_incidenceMatrix[i].count(j) > 0){
    //                 std::cout << " " << _incidenceMatrix[i][j];
    //             }
    //             else{
    //                 std::cout << " 0";
    //             }
    //         }
    //     }
        
    //     if(_incidenceMatrix.count(i) > 0)
    //         std::cout<<std::endl;
    // }

    std::cout << _circuitMatrix.size1() << std::endl;
    std::cout << _circuitMatrix.size2() << std::endl;

    for(int i = 0; i < _circuitMatrix.size1(); i ++){
        for(int j = 0; j < _circuitMatrix.size2(); j++){
            std::cout << std::setprecision(4) << std::fixed;
            std::cout << _circuitMatrix(i,j)<< " "; 
        }
        std::cout << std::endl;
    }
}

