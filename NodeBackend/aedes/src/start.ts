import {isAuthenticated} from './auth'
const fs = require('fs');

const options = {
  key: fs.readFileSync('./keys/privkey.pem'),
  cert: fs.readFileSync('./keys/cert.pem')
}


let currentLightsObject = "";
const aedes = require('aedes')()
// const server = require('tls').createServer(options, aedes.handle)
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, function() {
  console.log('server started and listening on port:', port)
})

const httpServer = require('https').createServer(options)
const ws = require('websocket-stream')
const wsPort = 9002

ws.createServer({server: httpServer, key: options.key, cert: options.cert}, aedes.handle)

httpServer.listen(wsPort, function() {
  console.log('websocket server listening on port:', wsPort)
});

aedes.authenticate = function(client, username, password, callback) {
  console.log('Authorizing: ', client);
  if (username != undefined && password != undefined) {
    callback(null, isAuthenticated(username, password.toString()))
  } else {
    callback(null, false)
  }
}

aedes.authorizeSubscribe = function(client, sub, callback) {
  console.log(Date.now() + ' Trying to authorize sub...');
  
  if (sub.topic !== 'lights') {
    return callback(new Error('wrong topic'))
  } else {
    callback(null, sub)
    aedes.publish({topic: "lights", payload: currentLightsObject}, null)
  }
}

aedes.authorizePublish = function(client, packet, callback) {
  console.log(Date.now() + ' Trying to authorize pub...');
  if (packet.topic !== 'lights') {
    return callback(new Error('wrong topic'))
  } else {
    currentLightsObject = packet.payload.toString();
    callback(null)
  }
}