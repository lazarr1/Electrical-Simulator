#include "simulator/simulator.h"
#include "simulator/current_source.h"

#include <string>
#include <iostream>

#ifdef ___DEBUG__
    #include <assert>
#endif

#include "simulator/capacitor.h"
#include "simulator/inductor.h"
#include "simulator/vccs.h"
#include "simulator/voltage_source.h"
#include "simulator/ac_voltage_source.h"




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
    std::shared_ptr<Resistor> resistor = std::make_shared<Resistor>(name, &_solver);

    AllocateNodes(resistor);

    resistor->resistance = resistanceInput;

    //update the circuit to include the new component
    _circuit.AddComponent(resistor);

    //update the simulator to store the new component
    _presentComponents[resistor->GetName()] = resistor;

}

void Simulator::CreateCapacitor(const double capacitance){
    //Increment the count of current components;
    _numComponents++;

    //create a name for the resistor
    std::string name("C" + std::to_string(_numComponents));

    //create a resistor with the given name
    std::shared_ptr<Capacitor> capacitor = std::make_shared<Capacitor>(name, &_solver);

    AllocateNodes(capacitor);

    capacitor->SetCapacitance(capacitance);

    //update the circuit to include the new component
    _circuit.AddComponent(capacitor);

    //update the simulator to store the new component
    _presentComponents[capacitor->GetName()] = capacitor; 
}

void Simulator::CreateInductor(const double inductance){
    //Increment the count of current components;
    _numComponents++;

    //create a name for the resistor
    std::string name("IN" + std::to_string(_numComponents));

    //create a resistor with the given name
    std::shared_ptr<Inductor> inductor = std::make_shared<Inductor>(name, &_solver);

    AllocateNodes(inductor);

    inductor->SetInductance(inductance);

    //update the circuit to include the new component
    _circuit.AddComponent(inductor);

    //update the simulator to store the new component
    _presentComponents[inductor->GetName()] = inductor; 
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

    cs->SetCurrent(current);

    //update the circuit to include the new component
    _circuit.AddComponent(cs);

    //update the simulator to store the new component
    _presentComponents[cs->GetName()] = cs;

}

void Simulator::CreateVoltageSource(const double voltage){
   _numComponents++;

   std::string name("VS" + std::to_string(_numComponents));

   std::shared_ptr<VoltageSource> vs = std::make_shared<VoltageSource>(name, &_solver);

   AllocateNodes(vs);

   vs->voltage = voltage;

   _circuit.AddComponent(vs);

   _presentComponents[vs->GetName()] = vs;
}

void Simulator::CreateACVoltageSource(const double amplitude){

    _numComponents++;

    std::string name("AV" + std::to_string(_numComponents));

    std::shared_ptr<ACVoltageSource> avs = std::make_shared<ACVoltageSource>(name, &_solver);

    AllocateNodes(avs);

    avs->SetAmplitude(amplitude);

    _circuit.AddComponent(avs);

    _presentComponents[avs->GetName()] = avs;
}

void Simulator::CreateVccs(const double conductance){
    
    //Increment the count of current components;
    _numComponents++;

    //create a name for the resistor
    std::string name("vccs" + std::to_string(_numComponents));

    //create a resistor with the given name
    std::shared_ptr<VCCS> vccs = std::make_shared<VCCS>(name, &_solver);

    AllocateNodes(vccs);

    vccs->SetConductance(conductance);

    //update the circuit to include the new component
    _circuit.AddComponent(vccs);

    //update the simulator to store the new component
    _presentComponents[vccs->GetName()] = vccs;


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

double Simulator::GetNodeVoltage(std::string NodeName){
    if(_nodes.count(NodeName))
        return _nodes[NodeName]->parent->voltage;
    return 0;
}

void Simulator::Simulate(){
    //reset solver 
    _solver.ResetFinishedState();

    // Clear previous history
    _timeHistory.clear();
    _voltageHistory.clear();

    //Run simulation
    while(!_solver.GetFinishedState()){
        _circuit.BuildCircuitMatrix();
        _solver.Solve();

        // Record time-series data
        _timeHistory.push_back(_solver.GetTime());
        for(auto& [key, iNode] : _nodes){
            _voltageHistory[key].push_back(
                std::round(iNode->parent->voltage * 10000) / 10000
            );
        }
    }
}

void Simulator::GroundNode(std::string NodeName){
    if(_nodes.count(NodeName))
        _nodes[NodeName]->parent->grounded = true;
}

json Simulator::GetNodeVoltagesJSON(){
    json nodeInfo;
    for(auto [key,iNode] : _nodes){
        //round to 4 d.p.
        nodeInfo[key] = std::round(iNode->parent->voltage*10000) /10000;

    }
    return nodeInfo;
}

json Simulator::GetTimeSeriesJSON(){
    json ts;

    // Downsample to max ~3000 points
    const size_t maxPoints = 3000;
    size_t totalPoints = _timeHistory.size();
    size_t step = 1;
    if(totalPoints > maxPoints){
        step = totalPoints / maxPoints;
    }

    // Build downsampled time array
    std::vector<double> times;
    for(size_t i = 0; i < totalPoints; i += step){
        times.push_back(std::round(_timeHistory[i] * 10000) / 10000);
    }
    ts["times"] = times;

    // Build downsampled voltage arrays per node
    json data;
    for(auto& [key, voltages] : _voltageHistory){
        std::vector<double> sampled;
        for(size_t i = 0; i < voltages.size(); i += step){
            sampled.push_back(voltages[i]);
        }
        data[key] = sampled;
    }
    ts["data"] = data;
    ts["timestep"] = _solver.GetTimestep();

    return ts;
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
