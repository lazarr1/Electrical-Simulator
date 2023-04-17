class WireManager{

    constructor(){
        this.node1 = undefined;
        this.node2 = undefined;
        this.drawing = false;

        this.connections = {};

        //listen to all mouse ups and downs
        document.addEventListener('mousedown', this.mouseDown);
        document.addEventListener('mouseup', this.mouseUp);

        document.addEventListener('mousemove', this.mouseMove);


    }

    Start(node1){
        this.node1 = node1

        
    }

    End(node2){
        this.node2 = node2;
        this.connections[this.node1] = new Wire(this.node1,this.node2);
    }
}

export default WireManager

class Wire{

    constructor(node1,node2){

        this.xline = document.createElement("div");
        this.xline.classList.add('wire');
        document.body.appendChild(this.xline);

        this.yline = document.createElement("div");
        this.yline.classList.add('wire');
        document.body.appendChild(this.yline);

        this.node1 = node1;
        this.node2 = node2;
        
        this.start = node1.getPos();
        this.end = node2.getPos();

        node1.listenNodeMove(this);
        node2.listenNodeMove(this);

        this.Draw();

    }

    Draw(){

        const deltaX = this.end[0] - this.start[0];
        const deltaY = this.end[1] - this.start[1];

        if(deltaX >= 0){        
            this.xline.style.top = `${this.end[1]}px`;
            this.xline.style.left = `${this.start[0]}px`;
        }
        else{
            this.xline.style.top = `${this.end[1]}px`;
            this.xline.style.left = `${this.end[0]}px`;
        }

        if(deltaY <= 0){
            this.yline.style.left = `${this.start[0]}px`;
            this.yline.style.top = `${this.end[1]}px`;
        }
        else{
            this.yline.style.left = `${this.start[0]}px`;
            this.yline.style.top = `${this.start[1]}px`;
        }


    
        this.xline.style.width = `${Math.abs(deltaX)}px`;
        this.yline.style.height = `${Math.abs(deltaY)}px`;

    }

    handleMove(event){

        this.start = this.node1.getPos();
        this.end = this.node2.getPos();

        this.Draw();
    }


}

