#include "simulator/router.h"
#include <string>


Router::Router(){
   _simComplete = false;
   _finished = false;
}

void Router::RouteMessage(std::string& message ){

    _finished = false;
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
       else if(message_type == "CONNECT"){
            _circuit.HandleAddConnection(message_data);
        }
        else if(message_type == "GROUND"){
            _circuit.GroundNode(message_data);
        }
        else if(message_type == "SIMULATE"){
            _circuit.Run();
            _simComplete = true;
        }
        else{
            std::cout << "Received invalid message, unkown command: " << message << std::endl; 
        }

    } 
    else {
        // Handle invalid messages
        std::cerr << "Received invalid message, missing colon: " << message << std::endl;
    }
}

std::string Router::GetResponse(){
    if(_simComplete == true){
        _simComplete = false;

        _finished = true;
        std::string response = std::string("voltages/") + _circuit.GetNodeVoltagesJSON().dump();

        _circuit.ClearCircuit();

        return response;

    }
    else{
        return std::string("Error/simNotComplete");
    }

}

bool Router::GetFinishedStatus(){
    return _finished;
}
