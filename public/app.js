import Circuit from './components/circuit.js'; 
import Client from './client/client.js';
import fillComponentBox from './components/componentTable.js';

window.onload = function() {
    const client = new Client()
    const circuit = new Circuit(client);
    fillComponentBox(circuit);
}
