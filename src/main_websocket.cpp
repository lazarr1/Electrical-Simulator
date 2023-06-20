#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <iostream>
#include "simulator/router.h"

namespace beast = boost::beast;             // from <boost/beast.hpp>
namespace http = beast::http;               // from <boost/beast/http.hpp>
namespace websocket = beast::websocket;     // from <boost/beast/websocket.hpp>
namespace net = boost::asio;                // from <boost/asio.hpp>
using tcp = boost::asio::ip::tcp;           // from <boost/asio/ip/tcp.hpp>

int main(){

    Router router;
    // The io_context is required for all I/O
    net::io_context ioc;

    // Create and bind the acceptor to listen on TCP port 8080
    tcp::acceptor acceptor(ioc, {tcp::v4(), 8080});
    std::cout << "Listening on port " << acceptor.local_endpoint().port() << std::endl;

    while (true) {
        // Wait for a new client connection
        tcp::socket socket(ioc);
        acceptor.accept(socket);

        try {
            // Create a WebSocket session
            websocket::stream<tcp::socket> ws(std::move(socket));

            // Accept the WebSocket handshake
            ws.accept();

            while(ws.is_open()){
                // Receive a message
                beast::flat_buffer buffer;
                ws.read(buffer);

                std::cout << "Received message: " << beast::make_printable(buffer.data()) << std::endl;

                
                std::string message = beast::buffers_to_string(buffer.data());

                router.RouteMessage(message);

                ws.write(net::buffer(router.GetResponse()));

                if(router.GetFinishedStatus()){
                    ws.close(websocket::close_code::normal);
                }


            }


        } catch (const std::exception& e) {
            std::cerr << "Error: " << e.what() << std::endl;
        }
    }

    return 0;
}
