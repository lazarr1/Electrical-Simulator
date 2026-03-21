/**
 * Oscilloscope — canvas-based time-series waveform viewer.
 *
 * Usage:
 *   const scope = new Oscilloscope();
 *   scope.setData(timeseriesObj);   // { times: [...], data: { N1: [...], N2: [...] } }
 *   scope.show();
 *   scope.hide();
 */

const TRACE_COLORS = [
    '#00FF00', '#FF4444', '#44AAFF', '#FFFF00',
    '#FF44FF', '#44FFFF', '#FF8800', '#88FF44'
];

class Oscilloscope {
    constructor() {
        // Outer wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.id = 'oscilloscope';
        this.wrapper.classList.add('oscilloscope-hidden');

        // Header bar
        this.header = document.createElement('div');
        this.header.className = 'scope-header';

        this.title = document.createElement('span');
        this.title.textContent = 'Oscilloscope';
        this.title.className = 'scope-title';
        this.header.appendChild(this.title);

        // Node selector
        this.nodeSelect = document.createElement('select');
        this.nodeSelect.className = 'scope-select';
        this.nodeSelect.multiple = true;
        this.nodeSelect.title = 'Select nodes (Ctrl/Cmd+click for multiple)';
        this.nodeSelect.addEventListener('change', () => this.render());
        this.header.appendChild(this.nodeSelect);

        // Close button
        this.closeBtn = document.createElement('button');
        this.closeBtn.textContent = '✕';
        this.closeBtn.className = 'scope-close';
        this.closeBtn.addEventListener('click', () => this.hide());
        this.header.appendChild(this.closeBtn);

        this.wrapper.appendChild(this.header);

        // Canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'scope-canvas';
        this.wrapper.appendChild(this.canvas);

        // Legend
        this.legend = document.createElement('div');
        this.legend.className = 'scope-legend';
        this.wrapper.appendChild(this.legend);

        document.body.appendChild(this.wrapper);

        this.ctx = this.canvas.getContext('2d');
        this.data = null;

        // Handle resize
        this._resizeBound = this._onResize.bind(this);
        window.addEventListener('resize', this._resizeBound);
    }

    show() {
        this.wrapper.classList.remove('oscilloscope-hidden');
        this._onResize();
        this.render();
    }

    hide() {
        this.wrapper.classList.add('oscilloscope-hidden');
    }

    isVisible() {
        return !this.wrapper.classList.contains('oscilloscope-hidden');
    }

    toggle() {
        if (this.isVisible()) this.hide();
        else this.show();
    }

    /**
     * @param {Object} tsData  { times: number[], data: { [nodeName]: number[] }, timestep: number }
     */
    setData(tsData) {
        this.data = tsData;
        this._populateNodeSelect();
        if (this.isVisible()) this.render();
    }

    _populateNodeSelect() {
        this.nodeSelect.innerHTML = '';
        if (!this.data || !this.data.data) return;

        // Sort node names naturally (N1, N2, ... N10)
        const names = Object.keys(this.data.data).sort((a, b) => {
            const na = parseInt(a.replace(/\D/g, ''), 10);
            const nb = parseInt(b.replace(/\D/g, ''), 10);
            return na - nb;
        });

        names.forEach((name, idx) => {
            const opt = document.createElement('option');
            opt.value = name;
            opt.textContent = name;
            // Select first 4 by default
            if (idx < 4) opt.selected = true;
            this.nodeSelect.appendChild(opt);
        });
    }

    _getSelectedNodes() {
        const selected = [];
        for (const opt of this.nodeSelect.options) {
            if (opt.selected) selected.push(opt.value);
        }
        return selected;
    }

    _onResize() {
        if (!this.isVisible()) return;
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

        // Clear
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, w, h);

        if (!this.data || !this.data.times || this.data.times.length === 0) {
            ctx.fillStyle = '#888';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('No data — run a simulation', w / 2, h / 2);
            return;
        }

        const times = this.data.times;
        const selectedNodes = this._getSelectedNodes();
        if (selectedNodes.length === 0) return;

        // Determine Y range across selected nodes
        let yMin = Infinity, yMax = -Infinity;
        for (const name of selectedNodes) {
            const vals = this.data.data[name];
            if (!vals) continue;
            for (const v of vals) {
                if (v < yMin) yMin = v;
                if (v > yMax) yMax = v;
            }
        }

        // Add 10% padding
        const yRange = yMax - yMin || 1;
        yMin -= yRange * 0.1;
        yMax += yRange * 0.1;

        const tMin = times[0];
        const tMax = times[times.length - 1];
        const tRange = tMax - tMin || 1;

        // Draw grid
        this._drawGrid(ctx, pad, plotW, plotH, tMin, tMax, yMin, yMax);

        // Draw traces
        this.legend.innerHTML = '';
        selectedNodes.forEach((name, idx) => {
            const vals = this.data.data[name];
            if (!vals) return;
            const color = TRACE_COLORS[idx % TRACE_COLORS.length];

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;

            for (let i = 0; i < times.length && i < vals.length; i++) {
                const x = pad.left + ((times[i] - tMin) / tRange) * plotW;
                const y = pad.top + plotH - ((vals[i] - yMin) / (yMax - yMin)) * plotH;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Legend entry
            const entry = document.createElement('span');
            entry.className = 'scope-legend-entry';
            entry.innerHTML = `<span class="scope-legend-color" style="background:${color}"></span>${name}`;
            this.legend.appendChild(entry);
        });
    }

    _drawGrid(ctx, pad, plotW, plotH, tMin, tMax, yMin, yMax) {
        ctx.strokeStyle = '#333355';
        ctx.lineWidth = 0.5;
        ctx.fillStyle = '#888';
        ctx.font = '10px monospace';

        // Horizontal grid lines (voltage)
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

        // Vertical grid lines (time)
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

        // Border
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1;
        ctx.strokeRect(pad.left, pad.top, plotW, plotH);

        // Axis labels
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
        this.wrapper.remove();
    }
}

export default Oscilloscope;
