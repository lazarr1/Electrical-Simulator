#ifndef NODE_MANAGER_H
#define NODE_MANAGER_H

#include <unordered_set>

#include "node.h"

//This class manages the nodes.
// It uses a disjoint-set data structure to quickly union nodes
// Once a node is a part of a bigger node, either the entire union of nodes on the branch must be deleted
// Or a sinlge node can be removed.
class NodeManager{

    public:

        void AddNode(std::shared_ptr<Node> node);
        
        void RemoveNode(std::shared_ptr<Node> node);

        void Union(std::shared_ptr<Node> node1, std::shared_ptr<Node> node2);

        std::shared_ptr<Node> FindParent(std::shared_ptr<Node> node);

        //can only remove a single node
        void Disjoin(std::shared_ptr<Node>node1);

        //all members of the union are removed
        void removeUnion(std::shared_ptr<Node> node1);

    private:

        

        std::unordered_set<std::shared_ptr<Node>> _set;


};


#endif 