# Electrical-Simulator


## Build

### Prerequisites
- CMake 3.10+
- A C++ compiler with C++20 support
- Make
- Boost with `program_options`
- Git

On Ubuntu/Debian, you can install the required tools with:

```bash
sudo apt update
sudo apt install build-essential cmake git libboost-program-options-dev
```

The project also downloads `nlohmann/json` and `WsDispatcher` during CMake configure, so an internet connection is required the first time you build.

### Build locally

From the project root, run:

```bash
cmake -S . -B build
cmake --build build
```

This produces the backend executable at:

```text
build/websocket
```

To install the executable into the repository's `bin/` folder, run:

```bash
cmake --install build
```

That installs the binary here:

```text
bin/websocket
```

### Run locally

After building, start the backend with:

```bash
./build/websocket
```

Or, if you ran the install step:

```bash
./bin/websocket
```

Bring up the websocket then bring up a webserver displaying the web content.

### Build and run with Docker

To build and start both the backend and frontend containers:

```bash
docker compose up --build
```

If your Docker installation does not support the `docker compose` subcommand, use:

```bash
docker-compose up --build
```

By default:
- Frontend: `http://localhost`
- Backend: `http://localhost:8080`


# Guide
- Click on a component in the toolbox to create a component
- Drag the component to the desired spot
- Click on the nodes (top and bottom circles) on the component to start drawing a wire
- Build a valid circuit, and run.

# Tips
- Hover over a wire to see the node voltage
- Double click a component to edit its stored parameters
- Hover over a component and press R to rotate it
- Ensure the circuit is grounded
- Hover over a component and press delete to delete it