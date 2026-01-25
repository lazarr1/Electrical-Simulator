#pragma once
#ifndef SERVICE_HANDLER_H
#define SERVICE_HANDLER_H

#include <wsdispatcher/service_handler.hpp>
#include "router.h"


class CircuitApplication: public IServiceHandler{
public:
    ServiceResult onMessage(std::string msg);

private:
    Router sh_;
};

#endif