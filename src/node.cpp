#include "simulator/node.h"


Node::Node(std::string nameInput, std::shared_ptr<CircuitComponent> component)
  :  name(nameInput), grounded(false)
{
    connection = component;
    voltage = 0;
}