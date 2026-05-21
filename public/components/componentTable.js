import  {VoltageSource, Inductor, Capacitor, Resistor, DCurrent, Ground, VCCSComponent, VCVSComponent, ACVoltageSourceComponent, FunctionGeneratorComponent, DiodeComponent, NMOSComponent, PMOSComponent, NPNComponent, PNPComponent, NotGateComponent, AndGateComponent, OrGateComponent, NandGateComponent} from './staticComponent.js';

function fillComponentBox(circuit){
// Define an array of image URLs or class objects
const components = [
    { name: Resistor, id : 1 },
    { name: DCurrent, id: 2 },
    { name: Ground, id: 3},
    { name: Capacitor, id: 4},
    { name: Inductor, id:5},
    { name: VoltageSource, id:6},
    { name: VCCSComponent, id:7},
    { name: VCVSComponent, id:8},
    { name: ACVoltageSourceComponent, id:9},
    { name: FunctionGeneratorComponent, id:10},
    { name: DiodeComponent, id:11},
    { name: NMOSComponent, id:12},
    { name: PMOSComponent, id:13},
    { name: NPNComponent, id:14},
    { name: PNPComponent, id:15},
    { name: NotGateComponent, id:16},
    { name: AndGateComponent, id:17},
    { name: OrGateComponent, id:18},
    { name: NandGateComponent, id:19}
];

    const componentBox = document.createElement("div");
    componentBox.classList = "grid-container";
    document.body.appendChild(componentBox);

    function generateClassImages() {
        // Generate and append the image elements
        for (const component of components) {
            new component.name(component.id, circuit, componentBox);  
        }
    }

    // Function to open or close the box
 //   function toggleBox() {
 //       componentBox.classList.toggle("hidden"); // Apply a CSS class for hiding/showing the box
 //   }
    
    // Call the function to generate initial class images
    generateClassImages();

    //Give the x button the toggle close function
//    componentBox.children.item(0).onclick = toggleBox;
    //Closures are cool
//    return toggleBox;
}

export {fillComponentBox}; 
