#ifndef CIRCUIT_SOLVER_H
#define CIRCUIT_SOLVER_H

#include <iomanip>


#include <boost/numeric/ublas/matrix.hpp>

struct Node;

class CircuitSolver{

    public:

        //The matrix must be a square matrix
        void Resize(const int size, const bool keepOld);

        void StampMatrix(const int i, const int j, const double x);

        void SetParentNodes(std::vector<std::shared_ptr<Node>> parentNodes);

        void Print() const;

    private:

        boost::numeric::ublas::matrix<double> _circuitMatrix;

        std::vector<std::shared_ptr<Node>> _parentNodes;


        //The components will stamp the circuit solver, it does not need to know them
        // std::vector<std::shared_ptr<Node>> _nodes;
        // std::vector<std::shared_ptr<CircuitComponent> > _components;

};

#endif