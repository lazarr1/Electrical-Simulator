#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <atomic>
#include <array>
#include "simulator/router.h"

namespace beast = boost::beast;             // from <boost/beast.hpp>
namespace http = beast::http;               // from <boost/beast/http.hpp>
namespace websocket = beast::websocket;     // from <boost/beast/websocket.hpp>
namespace net = boost::asio;                // from <boost/asio.hpp>
using tcp = boost::asio::ip::tcp;           // from <boost/asio/ip/tcp.hpp>

constexpr int MAX_SIM_THREADS = 5;
std::mutex thread_mutex;
std::condition_variable thread_cv;
std::atomic<int> active_threads(0);

void handle_websocket_session(tcp::socket socket, Router router) {
    try {
        beast::flat_buffer buffer;
        http::request<http::string_body> req;
        http::read(socket, buffer, req);

        if (websocket::is_upgrade(req)) {
            websocket::stream<tcp::socket> ws(std::move(socket));
            ws.accept(req);

            while (ws.is_open()) {
                beast::flat_buffer buffer;
                ws.read(buffer);
                std::cout << "Received message: " << beast::make_printable(buffer.data()) << std::endl;
                std::string message = beast::buffers_to_string(buffer.data());
                router.RouteMessage(message);
                if (router.GetFinishedStatus()) {
                    ws.write(net::buffer(router.GetResponse()));
                    ws.close(websocket::close_code::normal);
                }
            }
        }
    } catch (const std::exception& e) {
        std::cerr << "Error in thread: " << e.what() << std::endl;
    }
    active_threads--;
    thread_cv.notify_one();
}

int main(){
    Router router;
    net::io_context ioc;
    tcp::acceptor acceptor(ioc, {tcp::v4(), 8080});
    std::cout << "Listening on port " << acceptor.local_endpoint().port() << std::endl;

    while (true) {
        try {
            tcp::socket socket(ioc);
            acceptor.accept(socket);

            std::unique_lock<std::mutex> lock(thread_mutex);
            if (active_threads >= MAX_SIM_THREADS) {
                // Too many threads, respond with busy message
                http::response<http::string_body> busy_resp{
                    http::status::service_unavailable, 11};
                busy_resp.set(http::field::content_type, "text/plain");
                busy_resp.body() = "Busy too much traffi";
                busy_resp.prepare_payload();
                http::write(socket, busy_resp);
                continue;
            }
            active_threads++;
            std::thread(handle_websocket_session, std::move(socket), router).detach();
        } catch (const std::exception& e) {
            std::cerr << "Error: " << e.what() << std::endl;
        }
    }
    return 0;
}
