const address = 'ws://localhost:8080';


class Client{

    constructor(circuit){
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.addEventListener('open', this.ProcessServerMessage.bind(this));

        //TESTING FUNCTIONALITY OF THE SERVER
        this.socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });

        this.socket.addEventListener('message', this.ProcessServerMessage.bind(this));

        this.socket.addEventListener('close', function (event) {
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

    SendCreateMessage(ComponentType){
        this.socket.send("add component:"+ComponentType);
    }

    SendGroundNodeMSG(NodeName){
        this.socket.send("GROUND:" +NodeName);
    }
    SendConnectNodesMSG(Node1, Node2){
        this.socket.send("CONNECT:"+ Node1 +"," + Node2);
    }
    SendRunMSG(){
        this.socket.send("SIMULATE:");
    }
}

export default Client;

