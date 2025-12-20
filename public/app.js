import Circuit from './components/circuit.js'; 
import {fillComponentBox} from './components/componentTable.js';
import createInstructionBox from './components/instructionBox.js';

window.onload = function() {
    const circuit = new Circuit();
    fillComponentBox(circuit);
    // Add help button handler
    const helpBtn = document.querySelector('.link');
    if (helpBtn) {
        helpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createInstructionBox();
        });
    }
//    setInterval(circuit.simulate.bind(circuit), 5000);
}
