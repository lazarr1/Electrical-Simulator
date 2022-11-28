#include "simulator/circuit_solver.h"

#include "simulator/node.h"

void CircuitSolver::Resize(const int size, const bool keepOld){
    
    _circuitMatrix.resize(size,size, keepOld);

}

void CircuitSolver::StampMatrix(const int i, const int j, const double x){
    if((_parentNodes[i]->parent->grounded == false) &&  (_parentNodes[j]->parent->grounded == false)){
        _circuitMatrix(i,j) += x;
    }

}

void CircuitSolver::SetParentNodes(std::vector<std::shared_ptr<Node>> parentNodes){
    _parentNodes = parentNodes;
}


void CircuitSolver::Print() const{
    std::cout << std::endl;

    std::cout << _circuitMatrix.size1() << std::endl;
    std::cout << _circuitMatrix.size2() << std::endl;

    for(int i = 0; i < _circuitMatrix.size1(); i ++){
        for(int j = 0; j < _circuitMatrix.size2(); j++){
            std::cout << std::setprecision(4) << std::fixed;
            std::cout << _circuitMatrix(i,j)<< " "; 
        }
        std::cout << std::endl;
    }
}