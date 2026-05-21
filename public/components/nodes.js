import WireManager from './wire.js';

class Node {
    constructor(x, y, component, wireManager, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.voltage = 0;
        this.scopeVisible = false;
        this.traceColor = null;

        this.element = document.createElement('div');
        this.element.classList.add('node');
        component.element.appendChild(this.element);

        this.labelElement = document.createElement('div');
        this.labelElement.className = 'node-label';
        document.body.appendChild(this.labelElement);

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;

        this.mouseDownBind = this.mouseDown.bind(this);
        this.element.addEventListener('mousedown', this.mouseDownBind);

        this.parent = component;
        this.wm = wireManager;
        this.connectedNodes = [];

        this.refreshVisualState();
    }

    resetConnectedNodes() {
        this.connectedNodes = [];
    }

    addConnectedNode(node) {
        this.connectedNodes.push(node);
    }

    setConnectedNodes(nodes) {
        this.connectedNodes = nodes;
    }

    getConnectedNodes() {
        return this.connectedNodes;
    }

    setVoltage(volts) {
        this.voltage = volts;
        this.refreshVisualState();
    }

    getVoltage() {
        return this.voltage;
    }

    setScopeVisible(visible) {
        this.scopeVisible = visible;
        this.refreshVisualState();
    }

    setTraceColor(color) {
        this.traceColor = color;
        this.refreshVisualState();
    }

    setLabel(label) {
        this.labelElement.textContent = label || '';
        this.refreshVisualState();
    }

    refreshVisualState() {
        const shouldShow = this.scopeVisible && this.labelElement.textContent;
        this.labelElement.classList.toggle('is-visible', !!shouldShow);
        this.element.classList.toggle('is-scoped', !!this.traceColor);
        if (this.traceColor) {
            this.element.style.boxShadow = `0 0 0 4px ${this.traceColor}55`;
            this.labelElement.style.borderColor = this.traceColor;
            this.labelElement.style.color = this.traceColor;
        } else {
            this.element.style.boxShadow = '';
            this.labelElement.style.borderColor = '';
            this.labelElement.style.color = '';
        }
        this.updateLabelPosition();
    }

    getPos() {
        this.updatePos();
        return [this.x, this.y];
    }

    updatePos() {
        const pos = this.element.getBoundingClientRect();
        this.x = Math.round(pos.x / 20) * 20;
        this.y = Math.round(pos.y / 20) * 20;
        this.updateLabelPosition();
    }

    updateLabelPosition() {
        const pos = this.element.getBoundingClientRect();
        this.labelElement.style.left = `${pos.left + 14}px`;
        this.labelElement.style.top = `${pos.top - 10}px`;
    }

    mouseDown(event) {
        event.stopPropagation();
        this.wm.Start(this);
    }

    delete() {
        this.element.removeEventListener('mousedown', this.mouseDownBind);
        this.element.remove();
        this.labelElement.remove();
        delete this.element;
        delete this.labelElement;
        delete this.parent;
        delete this.wm;
        delete this.x;
        delete this.y;
        delete this.mouseDownBind;
    }
}

export default Node;