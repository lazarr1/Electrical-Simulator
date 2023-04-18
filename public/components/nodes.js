import WireManager from "./wire.js";

class Node {
    constructor(x, y, component, wireManager, id) {

      this.id = id
      // this.x = x;
      // this.y = y;

      this.element = document.createElement("div");
      this.element.classList.add('node');
      component.element.appendChild(this.element);


      this.element.style.left = `${x}px`;
      this.element.style.top = `${y}px`;
  
      this.element.addEventListener("mousedown", this.mouseDown.bind(this));
      this.element.addEventListener("mouseup", this.mouseUp.bind(this));

      this.parent = component;
      this.wm = wireManager;

    }

    getPos(){

      let x = parseInt(this.parent.element.style.left);
      let y = parseInt(this.parent.element.style.top);

      return [x,y];
    }

    updatePos(){
      //Tell any wires attatched, that the node has moved
      const nodeMove = new CustomEvent("node_move", {detail:{ pos: this.getPos() }});
      this.element.dispatchEvent(nodeMove);
    }

    mouseDown(event){
      event.stopPropagation();
      //Send node location to the wire Manager
      this.wm.Start(this);
    }

    // rotateNodes(){
      
    //   // let temp = this.xoffset;
    //   // this.xoffset = this.yoffset;
    //   // this.yoffset = temp;
      
    // }

    listenNodeMove(wire){

      //Attach a wire to the node
      this.element.addEventListener("node_move", wire.handleMove.bind(wire));

    }

    mouseUp(event) {
      event.stopPropagation();
      //Tell the wire manager the location of the wire
      this.wm.End(this);
    }
}

export default Node