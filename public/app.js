import  {Resistor, DCurrent} from './components/staticComponent.js';
import Circuit from './components/circuit.js'; 
import Client from './client/client.js';

const client = new Client()
const circuit = new Circuit(client);

const component = new Resistor(1, circuit);
const DCurrentTool = new DCurrent(2, circuit);