import WireManager from "./wire.js";

class Node {
    constructor(x, y, component, wireManager, id) {

      this.id = id
      this.xoffset = x;
      this.yoffset = y;

      this.element = document.createElement("div");
      this.element.classList.add('node');
      document.body.appendChild(this.element);


      this.element.style.left = `${x}px`;
      this.element.style.top = `${y}px`;
  
      this.element.addEventListener("mousedown", this.mouseDown.bind(this));
      this.element.addEventListener("mouseup", this.mouseUp.bind(this));

      this.parent = component;
      this.wm = wireManager;



    }

    getPos(){
      return [parseInt(this.element.style.left),parseInt(this.element.style.top)];
    }

    updatePos(x,y){
      //Keep the position relative to the component constant
      this.element.style.left = `${x  + this.xoffset}px`;
      this.element.style.top = `${y  + this.yoffset}px`;

      //Tell any wires attatched, that the node has moved
      const nodeMove = new CustomEvent("node_move", {detail:{ pos: this.getPos() }});
      this.element.dispatchEvent(nodeMove);
    }

    mouseDown(event){
      //Send node location to the wire Manager
      this.wm.Start(this);
        
    }

    rotateNodes(){
      let temp = this.xoffset;
      this.xoffset = this.yoffset;
      this.yoffset = temp;

      // this.updatePos(0,0);

    }

    listenNodeMove(wire){

      //Attach a wire to the node
      this.element.addEventListener("node_move", wire.handleMove.bind(wire));

    }

    mouseUp(event) {
      //Tell the wire manager the location of the wire
      this.wm.End(this);
    }
}

export default Node