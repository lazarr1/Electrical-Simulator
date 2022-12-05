#include "simulator/capacitor.h"
#include "simulator/node.h"


Capacitor::Capacitor(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, passiveDirection, sim) ,_eqCurrent(nameInput, sim), _eqRes(nameInput, sim)
{

}

Capacitor::~Capacitor(){

}


void Capacitor::SetCapacitance(const double capacitance){

    _capacitance = capacitance;


    _eqRes.resistance = _solver->GetTimestep()/(2 * _capacitance);
    // std::cout << "This is the cap" <<  _eqRes.resistance << std::endl;

    //initially 0
    _eqCurrent.current = 0;

}

void Capacitor::Stamp(){

    // std::cout << _eqRes.resistance << std::endl;
    _eqRes.connectedNodes = connectedNodes;
    _eqCurrent.connectedNodes = connectedNodes;


    Update();


    _eqRes.Stamp();
    _eqCurrent.Stamp();

}

void Capacitor::Update(){

    //Equivalent current source gets filled up
    // std::cout << connectedNodes[0] ->parent->voltage << std::endl;

    _eqCurrent.current -= (connectedNodes[0]->parent->voltage - connectedNodes[1]->parent->voltage) * (1/_eqRes.resistance);

}


