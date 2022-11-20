#include "simulator/node.h"


Node::Node(std::shared_ptr<CircuitComponent> component){
    connection = component;
}