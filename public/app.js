import  {Resistor, DCurrent} from './components/staticComponent.js';
import Circuit from './components/circuit.js'; 

const circuit = new Circuit();

const component = new Resistor(1, circuit);
const DCurrentTool = new DCurrent(2, circuit);


