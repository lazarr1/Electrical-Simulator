import  {Resistor, DCurrent} from './components/CircuitComponent.js';
import Circuit from './components/circuit.js'; 


const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

socket.addEventListener('message', function (event) {
  console.log('Message from server: ', event.data);
});

socket.addEventListener('close', function (event) {
  console.log('Connection closed.');
});

socket.addEventListener('error', function (event) {
  console.error('WebSocket error:', event);
});

// socket.send("Hello")

const circuit = new Circuit();

const component = new Resistor(1, circuit);
const DCurrentTool = new DCurrent(1, circuit);


