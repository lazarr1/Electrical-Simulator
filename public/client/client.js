const address = 'ws://localhost:8080';


class Client{

    constructor(circuit){
        this.socket = new WebSocket('ws://localhost:8080');

        this.socket.addEventListener('open', this.ProcessServerMessage.bind(this));

        //TESTING FUNCTIONALITY OF THE SERVER

        this.socket.addEventListener('message', this.ProcessServerMessage.bind(this));

        this.socket.addEventListener('close', function () {
            console.log('Connection closed.');
        });

        this.socket.addEventListener('error', function (event) {
            console.error('WebSocket error:', event);
        });
        this.reponse = null; 
        this.circuit = circuit;
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
        }
    }

    sendMsg(msg){
        if (this.socket.readyState !== this.socket.OPEN) {
            try {
                console.log(this.socket.readyState);
              //  this.waitForOpenConnection(this.socket)
               // this.socket.send(msg)
            } catch (err) { console.error(err) }
        } else {
            this.socket.send(msg)
        }
    }

    SendCreateMessage(ComponentType){
        this.sendMsg("add component:"+ComponentType);
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

