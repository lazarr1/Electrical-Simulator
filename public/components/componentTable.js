import  {VoltageSource, Inductor, Capacitor, Resistor, DCurrent, Ground} from './staticComponent.js';

function fillComponentBox(circuit){
// Define an array of image URLs or class objects
const components = [
    { name: Resistor, id : 1 },
    { name: DCurrent, id: 2 },
    { name: Ground, id: 3},
    { name: Capacitor, id: 4},
    { name: Inductor, id:5},
    { name: VoltageSource, id:6}
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

export default fillComponentBox; 
