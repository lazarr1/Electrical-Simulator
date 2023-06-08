import Circuit from './components/circuit.js'; 
import fillComponentBox from './components/componentTable.js';

window.onload = function() {
    const circuit = new Circuit();
    fillComponentBox(circuit);
}
