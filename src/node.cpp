#include "simulator/node.h"


Node::Node(std::string nameInput, std::shared_ptr<CircuitComponent> component)
  :  name(nameInput)
{
    connection = component;
}