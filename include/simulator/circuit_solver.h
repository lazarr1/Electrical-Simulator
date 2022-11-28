#ifndef CIRCUIT_SOLVER_H
#define CIRCUIT_SOLVER_H

#include <iomanip>


#include <boost/numeric/ublas/matrix.hpp>



#include <iostream>
#include <boost/numeric/ublas/vector.hpp>
#include <boost/numeric/ublas/matrix_sparse.hpp>


struct Node;

class CircuitSolver{

    public:

        //The matrix must be a square matrix
        void Resize(const int size, const bool keepOld);

        void StampMatrix(const int i, const int j, const double x);

        void SetParentNodes(std::vector<std::shared_ptr<Node>> parentNodes);

        void StampCurrentVector(const int i, const double x);

        void Solve();

        void Print() const;

    private:

        boost::numeric::ublas::compressed_matrix<double, boost::numeric::ublas::column_major, 0> _circuitMatrix;

        boost::numeric::ublas::vector<double> _currentVector;
        
        //This vector MUST BE ORDERED by the ids of the nodes
        std::vector<std::shared_ptr<Node>> _parentNodes;

};

#endif