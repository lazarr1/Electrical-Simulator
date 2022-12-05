#include "simulator/inductor.h"
#include "simulator/node.h"


Inductor::Inductor(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, passiveDirection, sim) ,_eqCurrent(nameInput, sim), _eqRes(nameInput, sim)
{

}

Inductor::~Inductor(){

}


void Inductor::SetInductance(const double inductance){

    _inductance = inductance;


    _eqRes.resistance = _solver->GetTimestep()/(2 * _inductance);
    // std::cout << "This is the cap" <<  _eqRes.resistance << std::endl;

    //initially 0
    _eqCurrent.current = 0.001;

}

void Inductor::Stamp(){

    // std::cout << _eqRes.resistance << std::endl;
    _eqRes.connectedNodes = connectedNodes;
    _eqCurrent.connectedNodes = connectedNodes;

    Update();


    _eqRes.Stamp();
    _eqCurrent.Stamp();

}

void Inductor::Update(){

    //Equivalent current source gets filled up
    double voltdiff = connectedNodes[0]->parent->voltage - connectedNodes[1]->parent->voltage;

    _eqCurrent.current += voltdiff/_eqRes.resistance;


}


