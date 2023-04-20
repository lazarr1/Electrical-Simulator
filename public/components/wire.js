import {hline, vline} from './line.js'
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



        this.node1 = node1;
        this.node2 = node2;
        
        this.start = node1.getPos();
        this.end = node2.getPos();

        this.xline = new hline(this.start, this.end);
        this.yline = new vline(this.start, this.end);


        node1.listenNodeMove(this);
        node2.listenNodeMove(this);

        this.Draw();

    }

    Draw(){

        this.xline.Draw();
        this.yline.Draw();
    }

    handleMove(event){

        this.start = this.node1.getPos();
        this.end = this.node2.getPos();

        this.xline.updateStart(this.start);
        this.xline.updateEnd(this.end);
        this.yline.updateStart(this.start);
        this.yline.updateEnd(this.end);

        this.Draw();
    }


}

