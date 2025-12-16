class Client{

    constructor(circuit){
        this.circuit = circuit;
        this.socket = null;
        this.isConnecting = false;
        this.messageQueue = [];
        this.initialiseSocket();
    }

    initialiseSocket(){
        // Dynamically determine backend host
        let wsHost;
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            wsHost = 'ws://localhost:8080';
        } else {
            wsHost = 'wss://lulazar.com/ws';
        }
        this.socket = new WebSocket(wsHost);
        this.isConnecting = true;
        this.ProcessServerMessageBind = this.ProcessServerMessage.bind(this);
        this.socket.addEventListener('message', this.ProcessServerMessageBind);
        this.socket.addEventListener('open', () => {
            this.isConnecting = false;
            // Send any queued messages
            while (this.messageQueue.length > 0) {
                this.socket.send(this.messageQueue.shift());
            }
        });
        this.socket.addEventListener('close', () => {
            this.isConnecting = false;
        });
        this.socket.addEventListener('error', () => {
            this.isConnecting = false;
        });
        this.reponse = null; 
    }
    
    ProcessServerMessage(event){
        const msg = event.data;

        if(msg != null){
            console.log(msg);
            const breakdown_msg = msg.split('/');

            if(breakdown_msg[0] == 'voltages'){
                this.circuit.clearInSimFlag();
                this.reponse = JSON.parse(breakdown_msg[1]);
                this.circuit.setNodes(this.reponse);
            }
            else if(breakdown_msg[0] == 'error'){
                this.circuit.clearInSimFlag();
                this.circuit.ErrorMsg();
                this.reponse = JSON.parse(breakdown_msg[1]);
                this.circuit.setNodes(this.reponse);
            }
        }
    }

    removeSocket(){
        if (this.socket) {
            this.socket.removeEventListener("message", this.ProcessServerMessageBind);
            this.socket.close();
            this.socket = null;
        }
        delete this.ProcessServerMessageBind;
    }

    sendMsg(msg){
        if (!this.socket || this.socket.readyState === this.socket.CLOSED) {
            this.removeSocket();
            this.initialiseSocket();
            this.messageQueue.push(msg);
        } else if (this.socket.readyState === this.socket.CONNECTING || this.isConnecting) {
            this.messageQueue.push(msg);
        } else if (this.socket.readyState === this.socket.OPEN) {
            this.socket.send(msg);
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

