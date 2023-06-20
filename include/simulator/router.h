#ifndef ROUTER_H
#define ROUTER_H
#include "circuithandler.h"

class Router{
    public:
        Router();

        void RouteMessage(std::string& message );
        std::string GetResponse();
        bool GetFinishedStatus();

    private:
        CircuitHandler _circuit;
        bool _simComplete;
};

#endif
