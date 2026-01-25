#include "simulator/service_handler.hpp"
#include <stdexcept>

ServiceResult CircuitApplication::onMessage(std::string msg){

    ServiceResult result;
    this->sh_.RouteMessage(msg);
    if (this->sh_.GetFinishedStatus()){
        result.outgoing_msgs.push_back(this->sh_.GetResponse());
        std::cout << "added msg: " << result.outgoing_msgs[0] << std::endl;
    }

    return result;

}