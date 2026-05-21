const TRACE_COLORS = [
    '#00FF00', '#FF4444', '#44AAFF', '#FFFF00',
    '#FF44FF', '#44FFFF', '#FF8800', '#88FF44'
];

class Oscilloscope {
    constructor() {
        this.wrapper = document.createElement('div');
        this.wrapper.id = 'oscilloscope';
        this.wrapper.classList.add('oscilloscope-hidden');

        this.header = document.createElement('div');
        this.header.className = 'scope-header';

        this.title = document.createElement('span');
        this.title.textContent = 'Oscilloscope';
        this.title.className = 'scope-title';
        this.header.appendChild(this.title);

        this.nodePicker = document.createElement('div');
        this.nodePicker.className = 'scope-picker';

        this.nodePickerButton = document.createElement('button');
        this.nodePickerButton.type = 'button';
        this.nodePickerButton.className = 'scope-picker-button';
        this.nodePickerButton.textContent = 'Choose nodes';
        this.nodePickerButton.addEventListener('click', () => this.togglePicker());

        this.nodePickerPanel = document.createElement('div');
        this.nodePickerPanel.className = 'scope-picker-panel';

        this.nodePicker.appendChild(this.nodePickerButton);
        this.nodePicker.appendChild(this.nodePickerPanel);
        this.header.appendChild(this.nodePicker);

        this.closeBtn = document.createElement('button');
        this.closeBtn.textContent = '✕';
        this.closeBtn.className = 'scope-close';
        this.closeBtn.addEventListener('click', () => this.hide());
        this.header.appendChild(this.closeBtn);

        this.wrapper.appendChild(this.header);

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'scope-canvas';
        this.wrapper.appendChild(this.canvas);

        this.legend = document.createElement('div');
        this.legend.className = 'scope-legend';
        this.wrapper.appendChild(this.legend);

        document.body.appendChild(this.wrapper);

        this.ctx = this.canvas.getContext('2d');
        this.data = null;
        this.selectedNodes = [];
        this.availableNodes = [];
        this.selectionChangeHandler = null;
        this.visibilityChangeHandler = null;

        this._resizeBound = this._onResize.bind(this);
        this._outsideClickBound = this._handleOutsideClick.bind(this);
        window.addEventListener('resize', this._resizeBound);
        document.addEventListener('mousedown', this._outsideClickBound);
    }

    setSelectionChangeHandler(handler) {
        this.selectionChangeHandler = handler;
    }

    setVisibilityChangeHandler(handler) {
        this.visibilityChangeHandler = handler;
    }

    show() {
        this.wrapper.classList.remove('oscilloscope-hidden');
        this._notifyVisibility(true);
        this._onResize();
        this.render();
    }

    hide() {
        this.wrapper.classList.add('oscilloscope-hidden');
        this.closePicker();
        this._notifyVisibility(false);
        this._notifySelection({});
    }

    isVisible() {
        return !this.wrapper.classList.contains('oscilloscope-hidden');
    }

    toggle() {
        if (this.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    }

    setData(tsData) {
        this.data = tsData;
        this._populateNodePicker();
        if (this.isVisible()) {
            this.render();
        }
    }

    _populateNodePicker() {
        this.nodePickerPanel.innerHTML = '';
        this.availableNodes = [];

        if (!this.data || !this.data.data) {
            this.selectedNodes = [];
            this._updatePickerButton();
            return;
        }

        this.availableNodes = Object.keys(this.data.data).sort((a, b) => {
            const na = parseInt(a.replace(/\D/g, ''), 10);
            const nb = parseInt(b.replace(/\D/g, ''), 10);
            return na - nb;
        });

        this.selectedNodes = this.selectedNodes.filter((name) => this.availableNodes.includes(name));
        if (this.selectedNodes.length === 0) {
            this.selectedNodes = this.availableNodes.slice(0, 4);
        }

        for (const name of this.availableNodes) {
            const row = document.createElement('label');
            row.className = 'scope-picker-row';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = this.selectedNodes.includes(name);
            checkbox.addEventListener('change', () => this._handleNodeToggle(name, checkbox.checked));

            const label = document.createElement('span');
            label.className = 'scope-picker-label';
            label.textContent = name;

            row.appendChild(checkbox);
            row.appendChild(label);
            this.nodePickerPanel.appendChild(row);
        }

        this._updatePickerButton();
    }

    _handleNodeToggle(name, selected) {
        if (selected) {
            if (!this.selectedNodes.includes(name)) {
                this.selectedNodes.push(name);
            }
        } else {
            this.selectedNodes = this.selectedNodes.filter((nodeName) => nodeName !== name);
        }

        this._updatePickerButton();
        this.render();
    }

    _updatePickerButton() {
        if (this.selectedNodes.length === 0) {
            this.nodePickerButton.textContent = 'Choose nodes';
            return;
        }

        const preview = this.selectedNodes.slice(0, 3).join(', ');
        const suffix = this.selectedNodes.length > 3 ? ` +${this.selectedNodes.length - 3}` : '';
        this.nodePickerButton.textContent = `${preview}${suffix}`;
    }

    togglePicker() {
        this.nodePicker.classList.toggle('is-open');
    }

    closePicker() {
        this.nodePicker.classList.remove('is-open');
    }

    _handleOutsideClick(event) {
        if (!this.nodePicker.contains(event.target)) {
            this.closePicker();
        }
    }

    _getSelectedNodes() {
        return [...this.selectedNodes];
    }

    _notifySelection(selectionMap) {
        if (this.selectionChangeHandler) {
            this.selectionChangeHandler(selectionMap);
        }
    }

    _notifyVisibility(visible) {
        if (this.visibilityChangeHandler) {
            this.visibilityChangeHandler(visible);
        }
    }

    _onResize() {
        if (!this.isVisible()) {
            return;
        }
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const w = Math.max(300, rect.width - 20);
        const h = Math.max(150, Math.min(400, window.innerHeight * 0.3));
        this.canvas.width = w * devicePixelRatio;
        this.canvas.height = h * devicePixelRatio;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        this.render();
    }

    render() {
        const ctx = this.ctx;
        const w = this.canvas.width / devicePixelRatio;
        const h = this.canvas.height / devicePixelRatio;
        const pad = { top: 20, right: 20, bottom: 35, left: 55 };
        const plotW = w - pad.left - pad.right;
        const plotH = h - pad.top - pad.bottom;

        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, w, h);

        if (!this.data || !this.data.times || this.data.times.length === 0) {
            ctx.fillStyle = '#888';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('No data - run a simulation', w / 2, h / 2);
            this._notifySelection({});
            return;
        }

        const times = this.data.times;
        const selectedNodes = this._getSelectedNodes();
        if (selectedNodes.length === 0) {
            this._notifySelection({});
            return;
        }

        let yMin = Infinity;
        let yMax = -Infinity;
        for (const name of selectedNodes) {
            const vals = this.data.data[name];
            if (!vals) {
                continue;
            }
            for (const value of vals) {
                if (value < yMin) {
                    yMin = value;
                }
                if (value > yMax) {
                    yMax = value;
                }
            }
        }

        if (yMax - yMin < 1e-9) {
            const center = (yMax + yMin) / 2;
            const margin = Math.abs(center) * 0.2 || 1;
            yMin = center - margin;
            yMax = center + margin;
        } else {
            const yRange = yMax - yMin;
            yMin -= yRange * 0.1;
            yMax += yRange * 0.1;
        }

        const tMin = times[0];
        const tMax = times[times.length - 1];
        const tRange = tMax - tMin || 1;

        this._drawGrid(ctx, pad, plotW, plotH, tMin, tMax, yMin, yMax);

        this.legend.innerHTML = '';
        const selectionMap = {};

        selectedNodes.forEach((name, idx) => {
            const vals = this.data.data[name];
            if (!vals) {
                return;
            }

            const color = TRACE_COLORS[idx % TRACE_COLORS.length];
            selectionMap[name] = color;

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;

            for (let i = 0; i < times.length && i < vals.length; i++) {
                const x = pad.left + ((times[i] - tMin) / tRange) * plotW;
                const y = pad.top + plotH - ((vals[i] - yMin) / (yMax - yMin)) * plotH;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            const entry = document.createElement('span');
            entry.className = 'scope-legend-entry';
            entry.innerHTML = `<span class="scope-legend-color" style="background:${color}"></span>${name}`;
            this.legend.appendChild(entry);
        });

        this._notifySelection(selectionMap);
    }

    _drawGrid(ctx, pad, plotW, plotH, tMin, tMax, yMin, yMax) {
        ctx.strokeStyle = '#333355';
        ctx.lineWidth = 0.5;
        ctx.fillStyle = '#888';
        ctx.font = '10px monospace';

        const ySteps = 6;
        for (let i = 0; i <= ySteps; i++) {
            const y = pad.top + (i / ySteps) * plotH;
            const val = yMax - (i / ySteps) * (yMax - yMin);
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(pad.left + plotW, y);
            ctx.stroke();

            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(val.toFixed(2) + 'V', pad.left - 5, y);
        }

        const tSteps = 8;
        for (let i = 0; i <= tSteps; i++) {
            const x = pad.left + (i / tSteps) * plotW;
            const val = tMin + (i / tSteps) * (tMax - tMin);
            ctx.beginPath();
            ctx.moveTo(x, pad.top);
            ctx.lineTo(x, pad.top + plotH);
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(val.toFixed(2) + 's', x, pad.top + plotH + 5);
        }

        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1;
        ctx.strokeRect(pad.left, pad.top, plotW, plotH);

        ctx.fillStyle = '#aaa';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Time (s)', pad.left + plotW / 2, pad.top + plotH + 25);

        ctx.save();
        ctx.translate(12, pad.top + plotH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Voltage (V)', 0, 0);
        ctx.restore();
    }

    destroy() {
        window.removeEventListener('resize', this._resizeBound);
        document.removeEventListener('mousedown', this._outsideClickBound);
        this.wrapper.remove();
    }
}

export default Oscilloscope;