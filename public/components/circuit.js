import WireManager from './wire.js';
import CircuitComponent from './components.js';
import Node from './nodes.js';
import Client from '../client/client.js';
import Oscilloscope from './oscilloscope.js';
import { cloneDefinition } from './componentSchemas.js';

class Circuit {
    constructor() {
        this.client = new Client(this);

        this.inSim = false;
        this.Components = [];
        this.nodes = [];
        this.grounds = [];

        this.playbutton = document.getElementById('playbutton');
        this.playbutton.onclick = () => {
            if (!this.inSim) {
                this.run();
            }
        };

        this.wireManager = new WireManager();
        this.oscilloscope = new Oscilloscope();
        this.scopeSelection = {};
        this.scopeVisible = false;

        this.oscilloscope.setSelectionChangeHandler((selectionMap) => {
            this.scopeSelection = selectionMap;
            this.updateScopeNodeDecorations();
        });
        this.oscilloscope.setVisibilityChangeHandler((visible) => {
            this.scopeVisible = visible;
            this.updateScopeNodeDecorations();
        });

        this.scopeButton = document.getElementById('scopebutton');
        if (this.scopeButton) {
            this.scopeButton.addEventListener('click', () => this.oscilloscope.toggle());
        }
    }

    run() {
        console.log('Simulating circuit');
        this.simulate();
    }

    clearInSimFlag() {
        console.log('Clearing inSim flag');
        this.inSim = false;
        this.playbutton.style.backgroundImage = "url('components/images/play.png')";
    }

    okButtonOff() {
        this.okDiv.classList.add('notOk');
    }

    okButtonOn() {
        this.okDiv.classList.remove('notOk');
    }

    ErrorMsg() {
    }

    setTimeSeries(tsData) {
        this.oscilloscope.setData(tsData);
        this.oscilloscope.show();
    }

    setNodes(nodeVoltages) {
        for (const nodeName in nodeVoltages) {
            const nodeID = nodeName.split('N')[1] - 1;
            if (nodeID < this.nodes.length && this.nodes[nodeID] !== undefined) {
                this.nodes[nodeID].setVoltage(nodeVoltages[nodeName]);
                this.wireManager.setWireVoltage(this.nodes[nodeID]);
            } else {
                console.error('Massive Bug, server thinks there are more nodes than actually exist');
            }
        }

        this.updateScopeNodeDecorations();
    }

    updateScopeNodeDecorations() {
        for (const node of this.nodes) {
            if (!node) {
                continue;
            }

            const nodeName = node.id ? `N${node.id}` : '';
            node.setLabel(nodeName);
            node.setScopeVisible(!!this.scopeVisible);
            node.setTraceColor(this.scopeSelection[nodeName] || null);
        }
    }

    createComponent(type, options = {}) {
        const definition = cloneDefinition(type);
        const component = new CircuitComponent({
            terminals: definition.terminals,
            type: definition.type,
            displayName: definition.displayName,
            circuit: this,
            params: { ...definition.params, ...(options.params || {}) },
            paramSchema: definition.schema,
            gridAnchor: definition.gridAnchor
        });

        for (const nodeConfig of definition.nodeLayout) {
            const node = new Node(nodeConfig.x, nodeConfig.y, component, this.wireManager, options.nodeId);
            component.nodes.push(node);
        }

        return component;
    }

    createNewResistor() {
        const component = this.createComponent('Resistor');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewDCurrent() {
        const component = this.createComponent('DCCurrent');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewVoltageSource() {
        const component = this.createComponent('VoltageSource');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewCapacitor() {
        const component = this.createComponent('Capacitor');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewInductor() {
        const component = this.createComponent('Inductor');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewACVoltageSource() {
        const component = this.createComponent('ACVoltageSource');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewVCCS() {
        const component = this.createComponent('VCCS');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewVCVS() {
        const component = this.createComponent('VCVS');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewFunctionGenerator() {
        const component = this.createComponent('FunctionGenerator');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewDiode() {
        const component = this.createComponent('Diode');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewNMOS() {
        const component = this.createComponent('NMOS');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewPMOS() {
        const component = this.createComponent('PMOS');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewNPN() {
        const component = this.createComponent('NPN');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewPNP() {
        const component = this.createComponent('PNP');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewNotGate() {
        const component = this.createComponent('NotGate');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewAndGate() {
        const component = this.createComponent('AndGate');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewOrGate() {
        const component = this.createComponent('OrGate');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createNewNandGate() {
        const component = this.createComponent('NandGate');
        this.Components.push(component);
        this.enableComponentDragToPlace(component);
    }

    createGroundNode() {
        const component = this.createComponent('Ground', { nodeId: 'G' });
        this.grounds.push(component);
        this.enableComponentDragToPlace(component);
    }

    getConnections() {
        this.wireManager.getConnections();
        this.parentNodes = [];
        this.childNodes = [];

        for (let iNode = 0; iNode < this.nodes.length; iNode++) {
            if (this.childNodes.indexOf(this.nodes[iNode]) <= -1) {
                this.parentNodes.push(this.nodes[iNode]);
                this.childNodes.push(this.wireManager.findConnectedNodesDFS(this.nodes[iNode]));
            }
        }
    }

    sendNodeConnections() {
        for (const iNode in this.parentNodes) {
            const node = this.parentNodes[iNode];
            const [baseNode, ...toConnectNodes] = node.getConnectedNodes();

            toConnectNodes.forEach((n) => this.client.SendConnectNodesMSG('N' + baseNode.id, 'N' + n.id));
        }

        for (const ground in this.grounds) {
            const node = this.grounds[ground].nodes[0];
            const grounded = this.wireManager.findConnectedNodesDFS(node);

            if (grounded.length > 0) {
                const nodeToGround = grounded[0];
                nodeToGround && this.client.SendGroundNodeMSG('N' + nodeToGround.id);
            }
        }

        const nodeLocs = {};
        for (const component of this.Components) {
            for (const node of component.nodes) {
                if (!([node.x, node.y] in nodeLocs)) {
                    nodeLocs[[node.x, node.y]] = 'N' + node.id;
                } else {
                    this.client.SendConnectNodesMSG(nodeLocs[[node.x, node.y]], 'N' + node.id);
                }
            }
        }
    }

    UpdateNodes() {
        let newNodeID = 1;
        this.nodes = [];
        for (const component of this.Components) {
            for (const node of component.nodes) {
                node.id = newNodeID++;
                this.nodes.push(node);
            }
        }
        this.wireManager.setNodes(this.nodes);
        this.updateScopeNodeDecorations();
    }

    sendComponents() {
        this.UpdateNodes();
        for (const component of this.Components) {
            this.client.SendCreateMessage(component.type, component.getSerializableParams());
        }
    }

    DeleteComponent(component) {
        const index = this.Components.indexOf(component);
        if (index > -1) {
            this.Components.splice(index, 1);
        } else {
            console.error('A COMPONENT WAS NOT DELETED CORRECTLY!!!');
        }
    }

    DeleteGround(ground) {
        const index = this.grounds.indexOf(ground);
        if (index > -1) {
            this.grounds.splice(index, 1);
        } else {
            console.error('A GROUND COMPONENT WAS NOT DELETED CORRECTLY!!!');
        }
    }

    simulate() {
        if (!this.inSim) {
            this.inSim = true;
            this.playbutton.style.backgroundImage = "url('components/images/play_running.png')";
            this.sendComponents();
            this.getConnections();
            this.sendNodeConnections();
            this.client.SendRunMSG();
        }
    }

    enableComponentDragToPlace(component) {
        if (this._draggingComponent) {
            return;
        }

        this._draggingComponent = component;
        const elem = component.element;
        elem.style.position = 'absolute';
        elem.style.pointerEvents = 'none';
        elem.style.zIndex = 10000;
        elem.style.display = 'none';
        let shown = false;

        const moveHandler = (e) => {
            if (!shown) {
                elem.style.display = '';
                shown = true;
            }

            const rootRect = document.getElementById('root').getBoundingClientRect();
            const mx = e.clientX - rootRect.left;
            const my = e.clientY - rootRect.top;
            const gx = Math.round(mx / 20) * 20;
            const gy = Math.round(my / 20) * 20;
            const anchor = component.getPlacementAnchor();

            elem.style.left = gx - anchor.x + 'px';
            elem.style.top = gy - anchor.y + 'px';
        };

        const dropHandler = (e) => {
            if (shown !== true) {
                escHandler({ key: 'Escape' });
            }

            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mousedown', dropHandler, true);
            document.removeEventListener('keydown', escHandler, true);

            const rootRect = document.getElementById('root').getBoundingClientRect();
            const mx = e.clientX - rootRect.left;
            const my = e.clientY - rootRect.top;
            const gx = Math.round(mx / 20) * 20;
            const gy = Math.round(my / 20) * 20;
            const anchor = component.getPlacementAnchor();

            elem.style.left = gx - anchor.x + 'px';
            elem.style.top = gy - anchor.y + 'px';
            elem.style.pointerEvents = '';
            elem.style.zIndex = '';
            this._draggingComponent = null;
        };

        const escHandler = (e) => {
            if (e.key === 'Escape' || e.key === 'Delete' || e.key === 'Backspace') {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mousedown', dropHandler, true);
                document.removeEventListener('keydown', escHandler, true);
                if (elem && elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                }
                const idx = this.Components.indexOf(component);
                if (idx > -1) {
                    this.Components.splice(idx, 1);
                }
                this._draggingComponent = null;
            }
        };

        document.addEventListener('mousemove', moveHandler);
        setTimeout(() => {
            document.addEventListener('mousedown', dropHandler, true);
            document.addEventListener('keydown', escHandler, true);
        }, 0);
    }
}

export default Circuit;