const address = 'ws://localhost:8080';


class Client{

    constructor(circuit){
        this.initialiseSocket();
        this.circuit = circuit;
    }

    initialiseSocket(){
        this.socket = new WebSocket('ws://localhost:8080');

        this.ProcessServerMessageBind = this.ProcessServerMessage.bind(this);

        this.socket.addEventListener('message', this.ProcessServerMessageBind);

        this.reponse = null; 
    }
    
    ProcessServerMessage(event){
        const msg = event.data;

        if(msg != null){
            console.log(msg);
            const breakdown_msg = msg.split('/');

            if(breakdown_msg[0] == 'voltages'){
                this.reponse = JSON.parse(breakdown_msg[1]);
                this.circuit.setNodes(this.reponse);
            }
            else if(breakdown_msg[0] == 'error'){
                this.circuit.ErrorMsg();
                this.reponse = JSON.parse(breakdown_msg[1]);
                this.circuit.setNodes(this.reponse);
            }
        }
    }

    removeSocket(){
        this.socket.removeEventListener("message", this.ProcessServerMessageBind);
        delete this.ProcessServerMessageBind;
        delete this.socket;
    }

    sendMsg(msg){
        if (this.socket.readyState !== this.socket.OPEN) {
            if(this.socket.readyState === this.socket.CLOSED){
                this.removeSocket;
                this.initialiseSocket(); 
            }
        } else {
            this.socket.send(msg)
        }
    }

    SendCreateMessage(ComponentType, value){
        this.sendMsg("add component:"+ComponentType + "/"+value);
    }

    SendGroundNodeMSG(NodeName){
        this.sendMsg("GROUND:" +NodeName);
    }
    SendConnectNodesMSG(Node1, Node2){
        this.sendMsg("CONNECT:"+ Node1 +"," + Node2);
    }
    SendRunMSG(){
        this.sendMsg("SIMULATE:");
    }
}

export default Client;

