import WireManager from "./wire.js";

class Node {
    constructor(x, y, component, wireManager) {


      this.xoffset = x;
      this.yoffset = y;
      // this.elementId = `my-class-element-${Math.random().toString(36).substr(2, 9)}`;
      this.element = document.createElement("div");
      this.element.classList.add('node');
      document.body.appendChild(this.element);


      this.element.style.left = `${this.xoffset}px`;
      this.element.style.top = `${this.yoffset}px`;
  
      this.element.addEventListener("mousedown", this.mouseDown.bind(this));
      this.element.addEventListener("mouseup", this.mouseUp.bind(this));
      // this.element.addEventListener("draw", this.handleDraw.bind(this));

      this.parent = component;
      this.wm = wireManager;

      // this.canvas = document.getElementById("canvas");

      // this.ctx = this.canvas.getContext('2d');

    }

    getPos(){
      return [parseInt(this.element.style.left),parseInt(this.element.style.top)];
    }

    updatePos(x,y){
      //Keep the position relative to the component constant
      this.element.style.left = `${x  + this.xoffset}px`;
      this.element.style.top = `${y  + this.yoffset}px`;

      // this.startX = this.element.style.left;
      // this.startY = this.element.style.top;

        const nodeMove = new CustomEvent("node_move", {detail:{ pos: this.getPos() }});
        this.element.dispatchEvent(nodeMove);
    }

    mouseDown(event){
      this.wm.Start(this);
        // console.log("click");
        // const StartDrawing = new CustomEvent("draw", {detail:{ startX: this.startX, startY : this.startY }});
        // this.element.dispatchEvent(StartDrawing);
        // console.log(this);
        
    }

    listenNodeMove(wire){
      this.element.addEventListener("node_move", wire.handleMove.bind(wire));

    }
    // handleDraw(event){
    //   // console.log("drawing");
    //   // console.log(event.detail.startX);
    //   this.startX = event.detail.startX;
    //   this.startY = event.detail.startY;

    //   // console.log(this);
    // }

    mouseUp(event) {
      this.wm.End(this);

      // console.log("Drawin");
      // const endX = this.element.style.left;
      // const endY = this.element.style.top;
      
      // console.log(this.startX) ;
      // console.log(this.element.style.left);

      // // draw line
      // this.ctx.beginPath();
      // this.ctx.moveTo(this.startX, this.startY);
      // this.ctx.lineTo(endX, endY);
      // this.ctx.stroke();

    }
}

export default Node