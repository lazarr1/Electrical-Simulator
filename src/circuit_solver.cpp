#include "simulator/circuit_solver.h"

#include "simulator/node.h"

#include <boost/numeric/ublas/vector_sparse.hpp>
#include <boost/numeric/ublas/lu.hpp>
#include <boost/numeric/ublas/io.hpp>

void CircuitSolver::Resize(const int size, const bool keepOld){

    _circuitMatrix.resize(size,size, keepOld);
    _currentVector.resize(size, keepOld);

    //This ensures having default zeros
    if(keepOld == false){
        _circuitMatrix.clear();
        _currentVector.clear();
    }
}

void CircuitSolver::StampMatrix(const int i, const int j, const double x){
    if((_parentNodes[i]->parent->grounded == false) &&  (_parentNodes[j]->parent->grounded == false)){
        _circuitMatrix(i,j) += x;
    }
}

void CircuitSolver::StampCurrentVector(const int i, const double x){


    if(_parentNodes[i]->parent->grounded == false){
        _currentVector(i) += x;
    }

}

void CircuitSolver::SetParentNodes(std::vector<std::shared_ptr<Node>> parentNodes){
    _parentNodes = parentNodes;
}

void CircuitSolver::Solve(){

    using namespace boost::numeric::ublas;

    permutation_matrix<size_t> pm(_circuitMatrix.size1());
    lu_factorize(_circuitMatrix, pm);
    lu_substitute(_circuitMatrix, pm, _currentVector);

    std::cout << _currentVector << std::endl;
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

    std::cout << "current vector" << std::endl;
    for(int i = 0; i < _currentVector.size(); i ++){
        std::cout << std::setprecision(4) << std::fixed;
        std::cout << _currentVector(i); 
        std::cout << std::endl;
    }
    
}