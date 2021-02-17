import {state} from "../main";
import {publishMQTT} from "../mqtt/mqtt_main";
import {CurrentMode, OnState, TimeoutDelay, ChangeSimpleColor, ChangePresetColors, SimpleColorsSelected, CurrentSelectedIndex, AddSimpleColor, RemoveSimpleColor, AddPresetColors, RemovePresetColors} from "../typeInterface";

const express = require("express");
const app = express();
const http = require('http').createServer(app);
let io;

if (process.argv.length > 2 && process.argv[2] == '-dev') {
  io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"]
    }
  });
} else {
  io = require('socket.io')(http);
}

const port = 3000

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
});

io.on('connection', (socket) => {
  socket.emit('baseData', state)

  socket.on('Mode', (data: CurrentMode) => {
    publishMQTT('Mode', data)
    publishToAllWS('Mode', data)
    state.currentMode = data.mode
  })
  socket.on('TimeoutDelay', (data: TimeoutDelay) => {
    publishMQTT('TimeoutDelay', data)
    publishToAllWS('TimeoutDelay', data)
    state.timeoutDelay = data.minutes
  })
  socket.on('OnState', (data: OnState) => {
    publishMQTT('OnState', data)
    publishToAllWS('OnState', data)
    state.onState = data.on
  })

  socket.on('ChangeSimpleColor', (data: ChangeSimpleColor) => {
    publishMQTT('colors', [data.color])
    publishToAllWS('ChangeSimpleColor', data)
    state.simpleColors[state.index] = data.color
  });
  socket.on('AddSimpleColor', (data: AddSimpleColor) => {
    publishToAllWS('AddSimpleColor', data)
    state.simpleColors.push(data.color)
  });
  socket.on('RemoveSimpleColor', (data: RemoveSimpleColor) => {
    publishToAllWS('RemoveSimpleColor', data)
    state.simpleColors = state.simpleColors.slice(data.index, 1)
    if (state.index == data.index) {
      state.index = 0
      publishMQTT('colors', [state.simpleColors[state.index]])
    }
  });

  socket.on('ChangePresetColors', (data: ChangePresetColors) => {
    publishMQTT('colors', data.colors)
    publishToAllWS('ChangePresetColors', data)
    state.presetColors[state.index] = data.colors
  });
  socket.on('AddPresetColors', (data: AddPresetColors) => {
    publishToAllWS('AddPresetColors', data)
    state.presetColors.push(data.colors)
  });
  socket.on('RemovePresetColors', (data: RemovePresetColors) => {
    publishToAllWS('RemovePresetColors', data)
    state.presetColors = state.presetColors.slice(data.index, 1)
    if (state.index == data.index) {
      state.index = 0
      publishMQTT('colors', state.presetColors[state.index])
    }
  });

  socket.on('SimpleColorsSelected', (data: SimpleColorsSelected) => {
    publishMQTT('colors', data.simpleColorsSelected ? [state.simpleColors[state.index]] : state.presetColors[state.index])
    publishToAllWS('SimpleColorsSelected', data)
    state.simpleColorsSelected = data.simpleColorsSelected
  });
  socket.on('CurrentSelectedIndex', (data: CurrentSelectedIndex) => {
    publishMQTT('colors', state.simpleColorsSelected ? [state.simpleColors[data.index]] : state.presetColors[data.index])
    publishToAllWS('CurrentSelectedIndex', data)
    state.index = data.index
  });
});

http.listen(port, () => {
  console.log(`webserver listening on port ${port} (behind nginx)`);
});

export function publishToAllWS(name: string, value: any) {
  io.sockets.emit(name, value);
}