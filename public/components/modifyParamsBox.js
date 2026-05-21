class modifyBox {
    constructor(component) {
        this.component = component;
        this.open = false;
        this.fields = new Map();

        if (component.type === 'Ground') {
            return;
        }

        this.overlay = document.createElement('div');
        this.overlay.className = 'param-editor-overlay';

        this.panel = document.createElement('div');
        this.panel.className = 'param-editor';

        this.header = document.createElement('div');
        this.header.className = 'param-editor-header';

        const heading = document.createElement('div');

        this.title = document.createElement('div');
        this.title.className = 'param-editor-title';
        this.title.textContent = this.component.displayName || this.component.type;

        this.subtitle = document.createElement('div');
        this.subtitle.className = 'param-editor-subtitle';
        this.subtitle.textContent = 'Edit component parameters';

        heading.appendChild(this.title);
        heading.appendChild(this.subtitle);

        this.closeButton = document.createElement('button');
        this.closeButton.type = 'button';
        this.closeButton.className = 'param-editor-close';
        this.closeButton.textContent = 'Close';

        this.header.appendChild(heading);
        this.header.appendChild(this.closeButton);

        this.form = document.createElement('form');
        this.form.className = 'param-editor-form';

        this.footer = document.createElement('div');
        this.footer.className = 'param-editor-footer';

        this.resetButton = document.createElement('button');
        this.resetButton.type = 'button';
        this.resetButton.className = 'param-editor-reset';
        this.resetButton.textContent = 'Reset';

        this.saveButton = document.createElement('button');
        this.saveButton.type = 'submit';
        this.saveButton.className = 'param-editor-save';
        this.saveButton.textContent = 'Apply';

        this.footer.appendChild(this.resetButton);
        this.footer.appendChild(this.saveButton);

        this.panel.appendChild(this.header);
        this.panel.appendChild(this.form);
        this.panel.appendChild(this.footer);
        this.overlay.appendChild(this.panel);
        document.body.appendChild(this.overlay);

        this.onDblClickBind = this.openEditor.bind(this);
        this.onOverlayMouseDownBind = this.closeEditor.bind(this);
        this.onPanelMouseDownBind = this.onPanelMouseDown.bind(this);
        this.onSubmitBind = this.onSubmit.bind(this);
        this.onCloseBind = this.closeEditor.bind(this);
        this.onResetBind = this.resetDefaults.bind(this);
        this.onDocumentKeyDownBind = this.onDocumentKeyDown.bind(this);

        this.component.element.addEventListener('dblclick', this.onDblClickBind);
        this.overlay.addEventListener('mousedown', this.onOverlayMouseDownBind);
        this.panel.addEventListener('mousedown', this.onPanelMouseDownBind);
        this.form.addEventListener('submit', this.onSubmitBind);
        this.closeButton.addEventListener('click', this.onCloseBind);
        this.resetButton.addEventListener('click', this.onResetBind);

        this.renderFields();
    }

    getOpenStatus() {
        return this.open;
    }

    rotate() {
    }

    renderFields() {
        this.fields.clear();
        this.form.innerHTML = '';

        for (const field of this.component.paramSchema) {
            const row = document.createElement('label');
            row.className = 'param-editor-row';

            const top = document.createElement('span');
            top.className = 'param-editor-row-top';

            const label = document.createElement('span');
            label.className = 'param-editor-label';
            label.textContent = field.label;

            top.appendChild(label);

            if (field.unit) {
                const unit = document.createElement('span');
                unit.className = 'param-editor-unit';
                unit.textContent = field.unit;
                top.appendChild(unit);
            }

            const input = document.createElement(field.input === 'select' ? 'select' : 'input');
            input.className = 'param-editor-input';
            input.name = field.key;

            if (field.input === 'select') {
                for (const option of field.options || []) {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    input.appendChild(optionElement);
                }
            } else {
                input.type = field.input || 'number';
                input.step = field.step ?? 'any';
                if (field.min !== undefined) {
                    input.min = field.min;
                }
                if (field.max !== undefined) {
                    input.max = field.max;
                }
            }

            input.value = this.component.params[field.key];

            row.appendChild(top);
            row.appendChild(input);

            if (field.help) {
                const help = document.createElement('span');
                help.className = 'param-editor-help';
                help.textContent = field.help;
                row.appendChild(help);
            }

            this.fields.set(field.key, { field, input });
            this.form.appendChild(row);
        }
    }

    openEditor() {
        this.renderFields();
        this.overlay.classList.add('is-open');
        document.addEventListener('keydown', this.onDocumentKeyDownBind, true);
        const firstInput = this.form.querySelector('.param-editor-input');
        firstInput && firstInput.focus();
        this.open = true;
    }

    closeEditor() {
        if (!this.overlay) {
            return;
        }
        this.overlay.classList.remove('is-open');
        document.removeEventListener('keydown', this.onDocumentKeyDownBind, true);
        this.open = false;
    }

    onPanelMouseDown(event) {
        event.stopPropagation();
    }

    onDocumentKeyDown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeEditor();
            return;
        }

        if ((event.key === 'Backspace' || event.key === 'Delete') && !(event.metaKey || event.ctrlKey)) {
            event.stopPropagation();
        }
    }

    readValues() {
        const values = {};

        for (const [key, { field, input }] of this.fields.entries()) {
            if (field.input === 'select') {
                values[key] = input.value;
                continue;
            }

            const numeric = Number(input.value);
            values[key] = Number.isNaN(numeric) ? this.component.params[key] : numeric;
        }

        return values;
    }

    onSubmit(event) {
        event.preventDefault();
        this.component.setParams(this.readValues());
        this.closeEditor();
    }

    resetDefaults() {
        this.component.resetParams();
        this.renderFields();
    }

    delete() {
        if (this.component.type === 'Ground') {
            return;
        }

        this.component.element.removeEventListener('dblclick', this.onDblClickBind);
        this.overlay.removeEventListener('mousedown', this.onOverlayMouseDownBind);
        this.panel.removeEventListener('mousedown', this.onPanelMouseDownBind);
        this.form.removeEventListener('submit', this.onSubmitBind);
        this.closeButton.removeEventListener('click', this.onCloseBind);
        this.resetButton.removeEventListener('click', this.onResetBind);
        document.removeEventListener('keydown', this.onDocumentKeyDownBind, true);
        this.overlay.remove();
    }
}

export default modifyBox;const componentParams = {
    "Resistor": "Resistance (Ω): ",
    "Capacitor" : "Capacitance (F): ",
    "DCCurrent" : "Current (A): ",
    "Inductor" : "Inductance (H): ",
    "VoltageSource" : "Voltage (V): ",
    "ACVoltageSource" : "Amplitude (V): ",
    "VCCS" : "Transconductance (S): "
};

class modifyBox{
    
    constructor(component){
        this.component = component;
        if(component.type == "Ground"){
            return;
        }

        this.box = document.createElement("div"); 
        this.form = document.createElement("form");
        this.input = document.createElement("input");
        this.input.value = this.component.defaultVal;

        this.form.innerHTML = componentParams[this.component.type];
        this.form.appendChild(this.input);

        this.box.classList.add('modifyBox');
        this.form.classList.add('modifyBoxText');

        this.box.appendChild(this.form);
        this.component.element.appendChild(this.box);

        // Hide the box completely on creation
        this.box.style.display = "none";

        this.onDblClickBind = this.onDblClick.bind(this);
        this.onMouseDownBind = this.onMouseDown.bind(this);
        this.onDocumentMouseDownBind = this.onDocumentMouseDown.bind(this);
        this.onParamSubmitBind = this.onParamSubmit.bind(this);
        this.onKeyDownBind = this.onKeyDown.bind(this);

        this.component.element.addEventListener("dblclick", this.onDblClickBind)
        this.box.addEventListener("mousedown", this.onMouseDownBind);
        this.form.addEventListener("submit", this.onParamSubmitBind);
        this.box.addEventListener("keydown", this.onKeyDownBind);

        this.open = false;
    }

    getOpenStatus(){
        return this.open;
    }

    rotate(rotation){
        this.box.style.transform = `rotate(${-rotation}deg)`;
    }

    onDblClick(){
        this.form.classList.add("show");
        this.box.style.display = ""; // Show the box again
        document.addEventListener("mousedown", this.onDocumentMouseDownBind);
        document.addEventListener("keydown", this.onKeyDownBind, true); // use capture phase
        this.input.focus();
        this.open = true;
    }

    onDocumentMouseDown(){
        this.form.classList.remove("show");
        this.box.style.display = "none"; // Hide the box completely
        document.removeEventListener("mousedown", this.onDocumentMouseDownBind);
        document.removeEventListener("keydown", this.onKeyDownBind);
        this.box.removeEventListener("keydown", this.onKeyDownBind);
        this.open = false;
    }

    onMouseDown(event){
        event.stopPropagation();
    }

    onKeyDown(event){
        // Prevent propagation if input is focused (so component doesn't get deleted)
        if (document.activeElement === this.input) {
            // Only allow delete if cmd/ctrl + delete is pressed
            if ((event.key === "Backspace" || event.key === "Delete") && (event.metaKey || event.ctrlKey)) {
                // Allow component deletion
            } else {
                event.stopPropagation();
                return;
            }
        }
        //escape key
        if(event.keyCode === 27){
            this.onDocumentMouseDown();
        }
    }

    onParamSubmit(event){
        event.preventDefault(); // Prevent the default form submission
 //       const value = this.input.value;
//        this.component.setValue(value);

    }

    getValue(){
        return this.input.value;
    }

    setInput(input){
        this.input.value = input;
    }

    delete(){
        if(this.component.type == "Ground"){
            return;
        }
        this.component.element.removeEventListener("dblclick", this.onDblClickBind);
        this.box.removeEventListener("mousedown", this.onMouseDownBind);
        this.onDocumentMouseDown();
        delete this.onDocumentMouseDownBind;
        delete this.onMouseDownBind;
        delete this.onDblClickBind;
        delete this.onKeyDownBind;
        delete this.component;

        this.input.remove();
        this.form.remove();
        this.box.remove();
    }
    
}


export default modifyBox;
