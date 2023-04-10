class Node {
    constructor(x, y) {
      this.xoffset = x;
      this.yoffset = y;
      this.element = document.createElement("div");
      this.element.classList.add('node');

      
      this.element.style.left = `${this.xoffset}px`;
      this.element.style.top = `${this.yoffset}px`;
  
      this.element.addEventListener("click", this.onClick.bind(this));

      document.body.appendChild(this.element);
    }

    updatePos(x,y){
      this.element.style.left = `${x  + this.xoffset}px`;
      this.element.style.top = `${y  + this.yoffset}px`;
    }
  
    // follow(event) {
    //   this.element.style.left = `${event.clientX  + this.xoffset}px`;
    //   this.element.style.top = `${event.clientY  + this.yoffset}px`;
    // }

    onClick(){
        
    }

}

export default Node