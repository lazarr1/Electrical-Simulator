import  {Resistor, DCurrent} from './components/CircuitComponent.js';
import Circuit from './components/circuit.js'; 

const circuit = new Circuit();

const component = new Resistor(1, circuit);
const DCurrentTool = new DCurrent(1, circuit);


