// instructionBox.js

function createInstructionBox() {
    // Remove any existing instruction box
    const existing = document.getElementById('instruction-box');
    if (existing) existing.remove();

    // Create the box
    const box = document.createElement('div');
    box.id = 'instruction-box';

    // Instructions content
    box.innerHTML += `
      <h2>How to use the Circuit Simulator</h2>
      <ul>
        <li>Click a component button to create a component.</li>
        <li>Move your mouse to position the component, then click to place it.</li>
        <li>Click and drag on a node (small black circle) to start drawing a wire.</li>
        <li>Connect all components with wires. </li>
        <li>Ensure your circuit is grounded (add a ground component).</li>
        <li>Click the <b>Play</b> button (bottom left) to run the simulation.</li>
        <li>Hover over a component and press <b>R</b> to rotate it.</li>
        <li>Hover over a component and press <b>Delete</b> to remove it.</li>
        <li>Double click on a component to edit its value.</li>
        <li>For more help, see the project <a href="https://github.com/lazarr1/Electrical-Simulator" target="_blank" rel="noopener">README</a>.</li>
      </ul>
      <h2>Thank you for visiting!!!</h2>
    `;

    // ESC key closes the box
    const escHandler = (e) => {
		console.log(e);
        if ((e.key === 'Escape') || (e.type === 'mouseup')) {
            box.remove();
            document.removeEventListener('keydown', escHandler, true);
			document.removeEventListener('mouseup', escHandler, true);
			document.removeEventListener('mouseenter', mouseOverHandler, true);
			document.removeEventListener('mouseleave', mouseLeaveHanlder, true);
        }
    };
	const mouseOverHandler = (e) => {
		document.removeEventListener('mouseup', escHandler, true);
	}
	const mouseLeaveHanlder = (e) => {
		document.addEventListener('mouseup', escHandler, true);
	}
    setTimeout(() => {
        document.addEventListener('keydown', escHandler, true);
		document.addEventListener('mouseenter', mouseOverHandler, true);
		document.addEventListener('mouseleave', mouseLeaveHanlder, true);
		document.body.appendChild(box);
	});
}

export default createInstructionBox;
