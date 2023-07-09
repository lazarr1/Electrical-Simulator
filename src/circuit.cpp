#include "simulator/circuit.h"
#include <iostream>
#include <iomanip>
#include <algorithm>
#include "simulator/voltage_source.h"

#ifdef __TIMER__
    // #include <time.h>
    #include <chrono>
#endif

Circuit::Circuit(CircuitSolver* solver)
{
    _solver = solver;
}

void Circuit::AddComponent(std::shared_ptr<CircuitComponent> component){
    //store every component
    _components.insert(component);

    if(component->GetName().substr(0,2) == "VS"){
        _voltageSources.insert(std::dynamic_pointer_cast<VoltageSource>(component));
    }
    
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
        if(node1->parent->children.size() < node2->parent->children.size()){
            Union(node2, node1);
        }
        else{
            Union(node1, node2);
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

}


void Circuit::BuildCircuitMatrix(){


    #ifdef __TIMER__
        static double time = 0.0;
        auto start = std::chrono::steady_clock::now();
    #endif

    //map each parent node in a consecutively numbered way to build the stamp matrix
    int idGenerator = 0;

    bool grounded = false;
    std::vector<std::shared_ptr<Node>> parentNodes;

    std::vector<std::shared_ptr<Node>> groundedNodes;

    for(std::shared_ptr<Node> iNode : _nodes){

        //only add parents and non-grounded nodes
        if(iNode->parent == iNode && iNode->parent->grounded == false){
            iNode->id = idGenerator++;
            parentNodes.push_back(iNode);
        }

        //find the grounded node
        if(iNode->parent->grounded){
            groundedNodes.push_back(iNode->parent);
            grounded = true;
        }
    }
    //If the circuit has not been grounded, then the simualtion cannot run
    if(grounded){
        //add grounded node to the end

        for(int iGrounded = 0; iGrounded < groundedNodes.size(); iGrounded++)
        {
            parentNodes.push_back(groundedNodes[iGrounded]);
            groundedNodes[iGrounded]->id = idGenerator + iGrounded;
        }


        //resize square matrix, do not keep the previous values
        _solver->Resize(idGenerator, false);
        _solver->SetParentNodes(parentNodes);

        
        for(std::shared_ptr<VoltageSource> iVs : _voltageSources){
            iVs->ResizeSolver();
        }

        for(std::shared_ptr<CircuitComponent> iComponent : _components){ 
            iComponent->Stamp();
        }


    }
    #ifdef __TIMER__

        auto end = std::chrono::steady_clock::now();
        auto timediff = start-end;
        
        time += std::chrono::duration <double, std::milli> (timediff).count();
        // std::cout << time << std::endl;
    #endif



}



void Circuit::PrintIM(){

    std::cout << "__" ;
    for(auto j : _components){
        std::cout <<" "<< j->GetName();
    }

    for(auto j : _voltageSources){
        std::cout << " " << j->GetName();
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
        
        for(auto j : _voltageSources){
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

    _solver->Print();
}

