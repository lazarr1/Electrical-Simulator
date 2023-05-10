import WireManager from "./wire.js";

class Node {
    constructor(x, y, component, wireManager, id) {

      this.id = id
      this.x = x;
      this.y = y;

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
      return [this.x,this.y];
    }

    updatePos(){
      let pos = this.element.getBoundingClientRect();

      //Tell any wires attatched, that the node has moved
      this.x = Math.round(pos.x/20) * 20;
      this.y = Math.round(pos.y/20) * 20;
      const nodeMove = new CustomEvent("node_move", {detail:{ pos: this.getPos() }});
      this.element.dispatchEvent(nodeMove);
    }

    mouseDown(event){
      event.stopPropagation();

      //Send node location to the wire Manager
      this.wm.Start(this);
    }

    rotateNodes(){
      //update stored x and y position
      let pos = this.element.getBoundingClientRect();

      this.x = Math.round(pos.x/20) * 20; 
      this.y = Math.round(pos.y/20) * 20;

    }

    listenNodeMove(wire){
      //Attach a wire to the node
      this.element.addEventListener("node_move", wire.handleMove.bind(wire));

    }

    mouseUp(event) {
      event.stopPropagation();
      // Tell the wire manager the location of the node
      this.wm.End(this);
    }
}

export default Node