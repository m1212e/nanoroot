import {state} from '../main'
import {isAuthenticated} from './auth'
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('./mqtt/keys/privkey.pem'),
//   cert: fs.readFileSync('./mqtt/keys/cert.pem')
// }

const aedes = require('aedes')()
// const server = require('tls').createServer(options, aedes.handle)
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, function() {
  console.log('server started and listening on port:', port)
})

// const httpServer = require('https').createServer(options)
// const ws = require('websocket-stream')
// const wsPort = 9002

// ws.createServer({server: httpServer, key: options.key, cert: options.cert}, aedes.handle)

// httpServer.listen(wsPort, function() {
//   console.log('websocket server listening on port:', wsPort)
// });

aedes.authenticate = function(client, username, password, callback) {
  // console.log('Authorizing: ', client);
  if (username != undefined && password != undefined) {
    callback(null, isAuthenticated(username, password.toString()))
  } else {
    callback(null, false)
  }
}

aedes.authorizeSubscribe = function(client, sub, callback) {
  console.log(Date.now() + ' Trying to authorize sub...');

  console.log(sub.topic);

  if (
    sub.topic !== 'currentMode' &&
    sub.topic !== 'timeoutDelay' &&
    sub.topic !== 'onState' &&
    sub.topic !== 'colors'
  ) {
    console.log('Went Wrong!');
    return callback(new Error('wrong topic'))
  } else {
    console.log('Successful auth!');
    callback(null, sub)
    //TODO: need to publish the values for the new client?
  }
}

aedes.authorizePublish = function(client, packet, callback) {
  return callback(new Error('Publishing is disabled and done by the server!'))
}

export {aedes}
// aedes.authorizePublish = function(client, packet, callback) {
// console.log(Date.now() + ' Trying to authorize pub...');
// if (packet.topic !== 'lights') {
//   return callback(new Error('wrong topic'))
// } else {
//   currentLightsObject = packet.payload.toString();
//   callback(null)
// }
// }


export function publishMQTTTopic(topic: string, data: any) {
  if (topic == 'colors') {
    console.error('Colors should be pushed by publishMQTTColors!')
    return;
  }
  console.log(topic, ': ', JSON.stringify(data));

  switch (topic) {
    case 'onState':
      publishOnState(JSON.stringify(data))
      break;
    case 'currentMode':
      publishCurrentMode(JSON.stringify(data))
      break;
    case 'timeoutDelay':
      publishTimeoutDelay(JSON.stringify(data))
      break;

    default:
      console.error('Topic not available!')
      break;
  }
}

let lastPublishedOnState
function publishOnState(data: string) {
  if (lastPublishedOnState != data) {
    lastPublishedOnState = data
    aedes.publish({topic: 'onState', payload: data}, (err) => {
      if (err != undefined) {
        console.log('\n', 'Error: ', err, '\n');
      }
    })
  }
}

let lastPublishedCurrentMode
function publishCurrentMode(data) {
  if (lastPublishedCurrentMode != data) {
    lastPublishedCurrentMode = data
    aedes.publish({topic: 'currentMode', payload: data}, (err) => {
      if (err != undefined) {
        console.log('\n', 'Error: ', err, '\n');
      }
    })
  }
}

let lastPublishedTimeoutDelay
function publishTimeoutDelay(data) {
  if(lastPublishedTimeoutDelay != data){
    lastPublishedTimeoutDelay = data
    aedes.publish({topic: 'timeoutDelay', payload: data}, (err) => {
      if (err != undefined) {
        console.log('\n', 'Error: ', err, '\n');
      }
    })
  }
}


let lastPublishedColors
export function publishMQTTColors() {
  let data
  if (state.simpleColorsSelected) {
    data = [state.simpleColors[state.index]]
  } else {
    data = state.presetColors[state.index]
  }

  if (data != undefined && JSON.stringify(data) != JSON.stringify(lastPublishedColors)) {
    lastPublishedColors = JSON.stringify(data)
    console.log('colors', data);
    aedes.publish({topic: 'colors', payload: JSON.stringify(data)}, (err) => {
      if (err != undefined) {
        console.log('\n', 'Error: ', err, '\n');
      }
    })
  }
}