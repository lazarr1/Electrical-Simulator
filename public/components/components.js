import modifyBox from './modifyParamsBox.js';

class CircuitComponent {
    constructor(config) {
        this.terminals = config.terminals;
        this.type = config.type;
        this.displayName = config.displayName || config.type;
        this.circuit = config.circuit;
        this.paramSchema = config.paramSchema || [];
        this.defaultParams = { ...(config.params || {}) };
        this.params = { ...(config.params || {}) };
        this.gridAnchor = config.gridAnchor || null;
        this.nodes = [];

        this.element = document.createElement('div');
        this.element.classList.add('CircuitComponent');
        this.element.classList.add(this.type);
        this.rotation = 0;

        this.keyDownBind = this.handleKeyDown.bind(this);
        this.mouseDownBind = this.onMouseDown.bind(this);
        this.mouseOverBind = this.onMouseOver.bind(this);

        document.body.appendChild(this.element);
        this.element.addEventListener('mouseover', this.mouseOverBind);
        this.element.addEventListener('mousedown', this.mouseDownBind);

        this.element.style.left = `${Math.round(this.element.offsetLeft / 20) * 20}px`;
        this.element.style.top = `${Math.round(this.element.offsetTop / 20) * 20}px`;

        this.modifyBox = new modifyBox(this);
    }

    onMouseOver() {
        document.addEventListener('keydown', this.keyDownBind);
        this.mouseLeaveBind = this.onMouseLeave.bind(this);
        this.element.addEventListener('mouseleave', this.mouseLeaveBind);
    }

    onMouseLeave() {
        document.removeEventListener('keydown', this.keyDownBind);
        this.element.removeEventListener('mouseleave', this.mouseLeaveBind);
    }

    handleKeyDown(event) {
        if (event.keyCode === 82) {
            if (this.rotation === 360) {
                this.rotation = 0;
            } else {
                this.rotation += 90;
            }

            this.element.style.transform = `rotate(${this.rotation}deg)`;
            this.modifyBox.rotate(this.rotation);
            this.updateNodePos();
        } else if (event.keyCode === 8) {
            this.onMouseLeave();
            this.onMouseUp();
            this.delete();
        }
    }

    onMouseDown(event) {
        this.initialX = event.clientX - this.element.offsetLeft;
        this.initialY = event.clientY - this.element.offsetTop;

        this.mouseUpListener = this.onMouseUp.bind(this);
        this.mouseMoveListener = this.onMouseMove.bind(this);

        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('mousemove', this.mouseMoveListener);
    }

    onMouseUp() {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
    }

    onMouseMove(event) {
        this.element.style.left = `${Math.round((event.clientX - this.initialX) / 20) * 20}px`;
        this.element.style.top = `${Math.round((event.clientY - this.initialY) / 20) * 20}px`;
        this.updateNodePos();
    }

    updateNodePos() {
        for (let i = 0; i < this.terminals; i++) {
            this.nodes[i].updatePos();
        }
    }

    getPlacementAnchor() {
        if (this.gridAnchor) {
            return this.gridAnchor;
        }

        return {
            x: this.element.offsetWidth / 2,
            y: this.element.offsetHeight / 2
        };
    }

    setParams(params) {
        this.params = { ...this.params, ...params };
    }

    resetParams() {
        this.params = { ...this.defaultParams };
    }

    getSerializableParams() {
        return { ...this.params };
    }

    delete() {
        this.element.remove();
        this.element.removeEventListener('mousedown', this.mouseDownBind);
        this.element.removeEventListener('mouseover', this.mouseOverBind);

        delete this.mouseMoveListener;
        delete this.mouseOverBind;
        delete this.mouseDownBind;
        delete this.mouseUpListener;
        delete this.keyDownBind;
        delete this.mouseLeaveBind;

        this.modifyBox.delete();
        delete this.modifyBox;

        if (this.type !== 'Ground') {
            this.circuit.DeleteComponent(this);
        } else {
            this.circuit.DeleteGround(this);
        }

        for (const node of this.nodes) {
            node.delete();
        }

        this.nodes = [];
        delete this;
    }
}

export default CircuitComponent;
