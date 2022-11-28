#include "simulator/simulator.h"
#include "simulator/current_source.h"

#include <string>
#include <iostream>

#ifdef ___DEBUG__
    #include <assert>
#endif



Simulator::Simulator()
 : _numComponents(0), _numNodes(0), _solver(), _circuit(&_solver)
{

}

void Simulator::CreateResistor(const double resistanceInput){
    //Increment the count of current components;
    _numComponents++;

    //create a name for the resistor
    std::string name("R" + std::to_string(_numComponents));

    //create a resistor with the given name
    std::shared_ptr<PassiveComponent> resistor = std::make_shared<PassiveComponent>(name, &_solver);

    AllocateNodes(resistor);

    resistor->impedance.resistance = resistanceInput;

    //update the circuit to include the new component
    _circuit.AddComponent(resistor);

    //update the simulator to store the new component
    _presentComponents[resistor->GetName()] = resistor;

}

void Simulator::AllocateNodes(std::shared_ptr<CircuitComponent> component){
    for(int iNewNodes = 0; iNewNodes < component->ioPins; iNewNodes++){

        _numNodes++;

        std::string name("N" + std::to_string(_numNodes));

        std::shared_ptr<Node> node = std::make_shared<Node>(name, component);

        node->direction = component->connectionDirection[iNewNodes];
        component->connectedNodes.push_back(node);

        _nodes[node->name] = node;
    }
}

void Simulator::CreateCurrentSource(const double current){

    //Increment the count of current components;
    _numComponents++;

    //create a name for the resistor
    std::string name("I" + std::to_string(_numComponents));

    //create a resistor with the given name
    std::shared_ptr<CurrentSource> cs = std::make_shared<CurrentSource>(name, &_solver);

    AllocateNodes(cs);

    cs->current = current;

    //update the circuit to include the new component
    _circuit.AddComponent(cs);

    //update the simulator to store the new component
    _presentComponents[cs->GetName()] = cs;

}



void Simulator::CreateConnection(std::string NodeName1, std::string NodeName2){

    if(_nodes.count(NodeName1) && _nodes.count(NodeName2)){

        _circuit.CreateConnection(_nodes[NodeName1], _nodes[NodeName2] );

    }
    else{
        std::cout << "Node does not exist" << std::endl;
    }


}

void Simulator::RemoveConnection(std::string NodeName){

    if(_nodes.count(NodeName)){

        _circuit.RemoveConnection(_nodes[NodeName]);

    }
    else{
        std::cout << "Node does not exist" << std::endl;
    }


}

void Simulator::Simulate(){
    _circuit.BuildCircuitMatrix();
    _solver.Solve();
}

void Simulator::GroundNode(std::string NodeName){
    if(_nodes.count(NodeName))
        _nodes[NodeName]->parent->grounded = true;
}


#ifdef __DEBUG__
void Simulator::PrintComponents(){

    std::cout << "Checking number of components stored" << std::endl;
    assert(_numComponents == _presentComponents.size());

    std::cout << "Correct number of parts in simulator" << std::endl;

    std::cout << "I have " << _numNodes << " Nodes" << std::endl;

    std::cout << "I have " << _numComponents << " components with values: " << std::endl;

    for( auto& iComponent : _presentComponents){
        iComponent.second->Print();
    }

    _circuit.PrintIM();

}
#endif