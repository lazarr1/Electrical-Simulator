import Circuit from './components/circuit.js'; 
import fillComponentBox from './components/componentTable.js';

window.onload = function() {
    const circuit = new Circuit();
    fillComponentBox(circuit);
//    setInterval(circuit.simulate.bind(circuit), 5000);
}
