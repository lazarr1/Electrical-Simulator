// #include <boost/beast/core.hpp>
// #include <boost/beast/websocket.hpp>
// #include <boost/asio/connect.hpp>
// #include <boost/asio/ip/tcp.hpp>
// #include <cstdlib>
// #include <iostream>
// #include <string>

// namespace beast = boost::beast;         // from <boost/beast.hpp>
// namespace http = beast::http;           // from <boost/beast/http.hpp>
// namespace websocket = beast::websocket; // from <boost/beast/websocket.hpp>
// namespace net = boost::asio;            // from <boost/asio.hpp>
// using tcp = boost::asio::ip::tcp;       // from <boost/asio/ip/tcp.hpp>

// // Sends a WebSocket message and prints the response
// int main(int argc, char** argv)
// {
//     try
//     {
//         // Check command line arguments.
//         if(argc != 4)
//         {
//             std::cerr <<
//                 "Usage: websocket-client-sync <host> <port> <text>\n" <<
//                 "Example:\n" <<
//                 "    websocket-client-sync echo.websocket.org 80 \"Hello, world!\"\n";
//             return EXIT_FAILURE;
//         }
//         std::string host = argv[1];
//         auto const  port = argv[2];
//         auto const  text = argv[3];

//         // The io_context is required for all I/O
//         net::io_context ioc;

//         // These objects perform our I/O
//         tcp::resolver resolver{ioc};
//         websocket::stream<tcp::socket> ws{ioc};

//         // Look up the domain name
//         auto const results = resolver.resolve(host, port);

//         // Make the connection on the IP address we get from a lookup
//         auto ep = net::connect(ws.next_layer(), results);

//         // Update the host_ string. This will provide the value of the
//         // Host HTTP header during the WebSocket handshake.
//         // See https://tools.ietf.org/html/rfc7230#section-5.4
//         host += ':' + std::to_string(ep.port());

//         // Set a decorator to change the User-Agent of the handshake
//         ws.set_option(websocket::stream_base::decorator(
//             [](websocket::request_type& req)
//             {
//                 req.set(http::field::user_agent,
//                     std::string(BOOST_BEAST_VERSION_STRING) +
//                         " websocket-client-coro");
//             }));

//         // Perform the websocket handshake
//         ws.handshake(host, "/");

//         // Send the message
//         ws.write(net::buffer(std::string(text)));

//         // This buffer will hold the incoming message
//         beast::flat_buffer buffer;

//         // Read a message into our buffer
//         ws.read(buffer);

//         // Close the WebSocket connection
//         ws.close(websocket::close_code::normal);

//         // If we get here then the connection is closed gracefully

//         // The make_printable() function helps print a ConstBufferSequence
//         std::cout << beast::make_printable(buffer.data()) << std::endl;
//     }
//     catch(std::exception const& e)
//     {
//         std::cerr << "Error: " << e.what() << std::endl;
//         return EXIT_FAILURE;
//     }
//     return EXIT_SUCCESS;
// }

#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <iostream>

namespace beast = boost::beast;             // from <boost/beast.hpp>
namespace http = beast::http;               // from <boost/beast/http.hpp>
namespace websocket = beast::websocket;     // from <boost/beast/websocket.hpp>
namespace net = boost::asio;                // from <boost/asio.hpp>
using tcp = boost::asio::ip::tcp;           // from <boost/asio/ip/tcp.hpp>

int main()
{
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

            // Receive a message
            beast::flat_buffer buffer;
            ws.read(buffer);
            std::cout << "Received message: " << beast::make_printable(buffer.data()) << std::endl;

            // Send a message back to the client
            ws.write(net::buffer("Hello, world!"));

            // Close the WebSocket session
            ws.close(websocket::close_code::normal);
        } catch (const std::exception& e) {
            std::cerr << "Error: " << e.what() << std::endl;
        }
    }

    return 0;
}