class WireManager{

    constructor(){

        // this.element = document.createElement("div");
        // this.element.classList.add("WireManager");

        this.startX = undefined;
        this.startY = undefined;
        
        this.canvas = document.getElementById("canvas");

        this.connections = {};
        // this.ctx = this.canvas.getContext('2d');

        //listen to all mouse ups
        // document.addEventListener('mouseup', this.mouseUp);

    }
    mouseUp(event){
        console.log("WIRE");
        
        // this.startX = undefined;
        // this.startY = undefined;
    }

    Start(node1){
        this.node1 = node1
    }

    End(node2){
        this.node2 = node2;

        // console.log(node2);
        this.connections[this.node1] = new Wire(this.node1,this.node2);
        // this.connections[node2] = new Wire(node1,node2);


        
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
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');  

        this.node1 = node1;
        this.node2 = node2;
        
        this.start = node1.getPos();
        this.end = node2.getPos();
        // console.log(this.start);

        node1.listenNodeMove(this);
        node2.listenNodeMove(this);

        this.updatePos();

    }

    updatePos(){
        console.log("Test");
        this.ctx.beginPath();
        this.ctx.moveTo(this.start[0], this.start[1]);
        this.ctx.lineTo(this.end[0], this.end[1]);
        this.ctx.stroke();
    }

    handleMove(event){
        this.start = this.node1.getPos();
        this.end = this.node2.getPos();

        this.updatePos();
    }


}