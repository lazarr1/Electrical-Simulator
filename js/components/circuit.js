import WireManager from "./wire.js";
import CircuitComponent from "./components.js";


class Circuit{

    constructor(){
        this.idGenerator = 0;

        this.Components = {};

        this.wireManager = new WireManager();


    }

    createNewComponent(type, nodeCount){
        // console.log("t");

        //str(type + idGenerator++)

        this.Components[this.idGenerator +1] = new CircuitComponent(++this.idGenerator, 2, this.wireManager)
    }

    




}

export default Circuit