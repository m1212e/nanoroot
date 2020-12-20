import Paho from 'paho-mqtt';
import {onStorageUpdate} from './main';

// const server = 'hrw-fablab.de';
// const port = 9001;
// const path ="/ES/WS20/gruppe10";
// const clientID = 'gruppe10';
// const password = ',bxTfxXrUhG!BDQL';
// const userID = "FC_" + makeid(15);

const server = 'unix-yoga.de';
const port = 9002;
const clientID = 'color_triangle_frontend';
const password = 'nasf982z82h3jb508fw98dzfhnfijew';
const userID = "FC_" + makeid(15);

// Create a client instance
const client = new Paho.Client(server, port, userID);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
	onSuccess: onConnect, 
	userName : clientID,
    password: password,
    useSSL: true
});


// called when the client connects
function onConnect() {
    client.subscribe("lights");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.error("onConnectionLost: " + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
    onStorageUpdate(message.payloadString);
}

let debounceTimer = new Date().getTime();
function sendMessage(payload: string) {
    if ((new Date().getTime()) - debounceTimer > 50) {
        debounceTimer = new Date().getTime();   
        let message = new Paho.Message(payload);
        message.destinationName = "lights";
        client.send(message);
    }
}

//helper
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 
export {sendMessage}