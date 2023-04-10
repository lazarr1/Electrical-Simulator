class WireManager{

    constructor(){

        // this.element = document.createElement("div");
        // this.element.classList.add("WireManager");

        this.startX = undefined;
        this.startY = undefined;
        
        this.canvas = document.getElementById("canvas");
        // this.ctx = this.canvas.getContext('2d');

        //listen to all mouse ups
        // document.addEventListener('mouseup', this.mouseUp);

    }
    mouseUp(event){
        console.log("WIRE");
        
        // this.startX = undefined;
        // this.startY = undefined;
    }

    Start(x,y){
        this.startX = parseInt(x);
        this.startY = parseInt(y);
    }

    End(x,y){
        this.endX = parseInt(x);
        this.endY = parseInt(y);
        // console.log(x,y);
        // console.log(this.startX, this.startY);

        // this.ctx.beginPath();
        // this.ctx.moveTo(this.startX, this.startY);
        // this.ctx.lineTo(parseInt(x), parseInt(y));
        // this.ctx.stroke();
    }
}

export default WireManager

class Wire{
    constructor(node1,node2){
        
    }
}