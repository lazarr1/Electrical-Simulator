const address = 'ws://localhost:8080';


class Client{

    constructor(){
        this.socket = new WebSocket('ws://localhost:8080');

        this.socket.addEventListener('open', this.ProcessServerMessage.bind(this));

        //TESTING FUNCTIONALITY OF THE SERVER
        this.socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });

        this.socket.addEventListener('message', function (event) {
            console.log('Message from server: ', event.data);
        });

        this.socket.addEventListener('close', function (event) {
            console.log('Connection closed.');
        });

        this.socket.addEventListener('error', function (event) {
            console.error('WebSocket error:', event);
        });
        
    }

    
    ProcessServerMessage(){
        
    }

    SendCreateMessage(ComponentType){
        this.socket.send("add component:"+ComponentType);
    }


}

export default Client;

// const socket = new WebSocket('ws://localhost:8080');

// socket.addEventListener('open', function (event) {
//   socket.send('Hello Server!');
// });

// socket.addEventListener('message', function (event) {
//   console.log('Message from server: ', event.data);
// });

// socket.addEventListener('close', function (event) {
//   console.log('Connection closed.');
// });

// socket.addEventListener('error', function (event) {
//   console.error('WebSocket error:', event);
// });

// // socket.send("Hello")