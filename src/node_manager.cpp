
#include "simulator/node_manager.h"


void NodeManager::AddNode(std::shared_ptr<Node> node){
    node->parent = -1;

    _set.insert(node);
}


void NodeManager::RemoveNode(std::shared_ptr<Node> node){
    _set.erase(node);
}


std::shared_ptr<Node> FindParent(std::shared_ptr<Node> node){


    if(node->parent < 0){

        return node;

    }
    else{
    }


}
