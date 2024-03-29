var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    counter = 1;

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            let data = {
                methodName: "StartQuiz",
                params: [
                    "first",
                    2,
                    true
                ],
                id: number
            }

            connection.sendUTF(JSON.stringify(data));
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});
 
client.connect('ws://localhost:8080/', 'echo-protocol');