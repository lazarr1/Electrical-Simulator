#include "simulator/circuit_element.h"

#include "simulator/node.h"


Impedance::Impedance(){
    resistance = 0.0;
    capacitance = 0.0 ;
    inductance = 0.0;
}

CircuitComponent::CircuitComponent(std::string nameInput, int numioPins, const Direction * connectionDirections, CircuitSolver* sim)
    : name(nameInput), ioPins(numioPins), connectionDirection(connectionDirections), _sim(sim)
{

}

CircuitComponent::~CircuitComponent(){
}



// void CircuitComponent::Print() const{
//     std::cout << name << std::endl;
// }




PassiveComponent::PassiveComponent(std::string nameInput, CircuitSolver* sim)
    : CircuitComponent::CircuitComponent(nameInput, 2, passiveDirection, sim)  
{

}


PassiveComponent::~PassiveComponent(){
    
}
void CircuitComponent::Print() const{
    std::cout << "Name: " << name << std::endl;
    std::cout << "Resistance: " << impedance.resistance << std::endl;
    std::cout << "Capacitance: " << impedance.capacitance << std::endl;
    std::cout << "Inductance: " << impedance.inductance << std::endl;

}

void PassiveComponent::Stamp(){

    if(impedance.resistance == 0){
        std::cout << "bad resistance" << std::endl;
    }
    else{
        double addmittance = 1/impedance.resistance;

        // if(connectedNodes[0]->parent->grounded ==false &&  connectedNodes[1]->parent->grounded == false){
        _sim->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[0]->parent->id ,addmittance);
        _sim->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[1]->parent->id ,-addmittance);
        _sim->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[0]->parent->id ,-addmittance);
        _sim->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id ,addmittance);
        // }
        // else if(connectedNodes[0]->parent->grounded == false){
        //     _sim->StampMatrix(connectedNodes[0]->parent->id, connectedNodes[0]->parent->id ,addmittance);
        // }
        // else if(connectedNodes[1]->parent->grounded ==false){
        //     _sim->StampMatrix(connectedNodes[1]->parent->id, connectedNodes[1]->parent->id ,addmittance);
        // }
    }

}


// void Circuit::StampMatrix(const int i, const int j, const double x){


//     //Make sure that the node is not grounded:
//     if((_parentNodes[i]->parent->grounded == false) &&  (_parentNodes[j]->parent->grounded == false)){
//         _circuitMatrix(i,j) += x;
//     }

// }
