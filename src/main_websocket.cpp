#include "simulator/service_handler.hpp"

#include <wsdispatcher/dispatcher.hpp>
#include <boost/asio/io_context.hpp>
#include <boost/asio/thread_pool.hpp>
#include <boost/beast/http/parser.hpp>
#include <boost/beast/core.hpp>
#include <boost/beast/http/read.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <memory>

//TODO: move out of src
namespace net = boost::asio;                // from <boost/asio.hpp>
using tcp = boost::asio::ip::tcp;           // from <boost/asio/ip/tcp.hpp>

net::io_context ioc;
net::thread_pool tp(5);
tcp::endpoint ep(tcp::v4(), 8080);

int main(){
    auto dispatcher = std::make_shared<Dispatcher<CircuitApplication>>(tp, ioc, ep);
    std::cout << "Listening on port " << ep.port() << std::endl;
    dispatcher->do_accept();
}
