#ifndef ROUTER_H
#define ROUTER_H
#include "circuithandler.h"

class Router{
    public:
        Router();

        void RouteMessage(std::string& message );

    private:
        CircuitHandler _circuit;
};

#endif