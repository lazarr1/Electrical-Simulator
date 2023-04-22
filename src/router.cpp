#include "simulator/router.h"
#include <string>


Router::Router(){

}

void Router::RouteMessage(std::string& message ){

    
    std::string message_type, message_data;

    //Message will be formated as
    //message_type:data
    std::size_t colon_pos = message.find(':');

    if (colon_pos != std::string::npos) {
        message_type = message.substr(0, colon_pos);
        message_data = message.substr(colon_pos + 1);

        if(message_type == "add component"){
            _circuit.HandleAddComponent(message_data);
        }
        if(message_type == "add connection"){
            _circuit.HandleAddConnection(message_data);
        }
        else{
            std::cout << "Received invalid message: " << message << std::endl; 
        }

    } 
    else {
        // Handle invalid messages
        std::cerr << "Received invalid message: " << message << std::endl;
    }
}