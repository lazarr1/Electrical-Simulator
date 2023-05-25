//import  {Resistor, DCurrent, Ground} from './components/staticComponent.js';
import Circuit from './components/circuit.js'; 
import Client from './client/client.js';
import fillComponentBox from './components/componentTable.js';

window.onload = function() {
    const client = new Client()
    const circuit = new Circuit(client);
    fillComponentBox(circuit);
}

// const component = new Resistor(1, circuit);
// const DCurrentTool = new DCurrent(2, circuit);
// const grnd = new Ground(3, circuit);
