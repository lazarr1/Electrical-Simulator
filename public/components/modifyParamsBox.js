const componentParams = {
    "Resistor": "Resistance: ",
    "Capacitor" : "Capacitance: ",
    "DCCurrent" : "Amps: ",
    "Inductor" : "Inductance: ",
    "VoltageSource" : "Volts: "
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
