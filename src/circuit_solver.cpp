#include "simulator/circuit_solver.h"

#include "simulator/node.h"

#include <boost/numeric/ublas/vector_sparse.hpp>
#include <boost/numeric/ublas/lu.hpp>
#include <boost/numeric/ublas/io.hpp>

#include <algorithm>

#ifdef __TIMER__
    #include <chrono>
#endif

CircuitSolver::CircuitSolver(){
    _finished = false;
    _time = 0;
}
CircuitSolver::~CircuitSolver(){

}

void CircuitSolver::Resize(const int size, const bool keepOld){

    _circuitMatrix.resize(size,size, keepOld);
    _currentVector.resize(size, keepOld);

    //This ensures having default zeros
    if(keepOld == false){
        _circuitMatrix.clear();
        _currentVector.clear();
    }
}

//ith row, jth coloumn
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

    #ifdef __TIMER__
        static double time = 0.0;
        auto start = std::chrono::steady_clock::now();
    #endif

    using namespace boost::numeric::ublas;

    permutation_matrix<size_t> pm(_circuitMatrix.size1());
    lu_factorize(_circuitMatrix, pm);
    lu_substitute(_circuitMatrix, pm, _currentVector);

    int i = 0;
    for(std::shared_ptr<Node> iNodes : _parentNodes){
        if(iNodes->grounded == false){
            iNodes->parent->voltage = _currentVector[i++];
            // std::cout << iNodes->parent->voltage << std::endl;

        }
        else{
            iNodes->parent->voltage = 0;
            i++;
        }
    } 

    IncrementTime();

    #ifdef __TIMER__

        auto end = std::chrono::steady_clock::now();
        auto timediff = start-end;
        
        time += std::chrono::duration <double, std::milli> (timediff).count();
        std::cout << time << std::endl;
    #endif
}

const double CircuitSolver::GetTimestep() const{
    return _timestep;
}

bool CircuitSolver::GetFinishedState() const{
    return _finished;
}

void CircuitSolver::IncrementTime(){
    _time += _timestep;
    if(_time >= _runtime){
        _finished = true;
    }
}

void CircuitSolver::Print() const{
    std::cout << std::endl;

    std::cout << _circuitMatrix.size1() << std::endl;
    std::cout << _circuitMatrix.size2() << std::endl;

    for(int i = 0; i < _circuitMatrix.size1(); i ++){
        for(int j = 0; j < _circuitMatrix.size2(); j++){
            std::cout << std::setprecision(9) << std::fixed;
            std::cout << _circuitMatrix(i,j)<< " "; 
        }
        std::cout << std::endl;
    }

    std::cout << "voltage vector" << std::endl;
    for(int i = 0; i < _currentVector.size(); i ++){
        std::cout << std::setprecision(9) << std::fixed;
        std::cout << _currentVector(i); 
        std::cout << std::endl;
    }
    
}

