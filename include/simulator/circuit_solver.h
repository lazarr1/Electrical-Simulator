#ifndef CIRCUIT_SOLVER_H
#define CIRCUIT_SOLVER_H

#include <iomanip>
#include <boost/numeric/ublas/matrix.hpp>
#include <list>
#include <iostream>
#include <boost/numeric/ublas/vector.hpp>
#include <boost/numeric/ublas/matrix_sparse.hpp>


struct Node;

class CircuitSolver{

    public:
        CircuitSolver();
        ~CircuitSolver();
        //The matrix must be a square matrix
        void Resize(const int size, const bool keepOld);

        void StampMatrix(const int i, const int j, const double x);

        void SetParentNodes(std::vector<std::shared_ptr<Node>> parentNodes);

        void StampCurrentVector(const int i, const double x);

        const double GetTimestep() const;

        bool GetFinishedState() const;
        
        void Solve();
        
        void ResetFinishedState();

        std::pair<int,int> GetSize() const;

        void StampVSCurrent(const int i, const double x);

        void StampVSMatrix(const int i, const int j, const double x);

        void Print() const;

    private:

        void IncrementTime();

        //Timestep of simulation
        const double _timestep = 0.01;

        //duration of simulation, will be able to be set
        const double _runtime = 1000;

        double _time;

        bool _finished;

        boost::numeric::ublas::compressed_matrix<double, boost::numeric::ublas::column_major, 0> _circuitMatrix;

        boost::numeric::ublas::vector<double> _currentVector;

        //Used for building graphs
        std::list<boost::numeric::ublas::vector<double>> _historyVector;
        
        //This vector MUST BE ORDERED by the ids of the nodes
        std::vector<std::shared_ptr<Node>> _parentNodes;

};

#endif
