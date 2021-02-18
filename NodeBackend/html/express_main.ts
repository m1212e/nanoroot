import {state} from "../main";
import {publishMQTTColors, publishMQTTTopic} from "../mqtt/mqtt_main";
import {CurrentMode, OnState, TimeoutDelay, ChangeSimpleColor, SimpleColorsSelected, CurrentSelectedIndex, AddSimpleColor, RemoveSimpleColor, AddPresetColors, RemovePresetColors, ChangePresetColorsIndex, ChangePresetColor, AddPresetColor, RemovePresetColor} from "../typeInterface";

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

  socket.on('SimpleColorsSelected', (data: SimpleColorsSelected) => {
    if (data.simpleColorsSelected != state.simpleColorsSelected) {
      publishMQTTColors()
      publishToAllWS('SimpleColorsSelected', data)
      state.simpleColorsSelected = data.simpleColorsSelected
    }
  });
  socket.on('CurrentSelectedIndex', (data: CurrentSelectedIndex) => {
    if (data.index != state.index) {
      publishMQTTColors()
      publishToAllWS('CurrentSelectedIndex', data)
      state.index = data.index
    }
  });
  socket.on('Mode', (data: CurrentMode) => {
    if (data.mode != state.currentMode) {
      publishMQTTTopic('Mode', data)
      publishToAllWS('Mode', data)
      state.currentMode = data.mode
    }
  })
  socket.on('TimeoutDelay', (data: TimeoutDelay) => {
    if (data.minutes != state.timeoutDelay) {
      publishMQTTTopic('TimeoutDelay', data)
      publishToAllWS('TimeoutDelay', data)
      state.timeoutDelay = data.minutes
    }
  })
  socket.on('OnState', (data: OnState) => {
    if (data.on != state.onState) {
      publishMQTTTopic('OnState', data)
      publishToAllWS('OnState', data)
      state.onState = data.on
    }
  })

  socket.on('ChangeSimpleColor', (data: ChangeSimpleColor) => {
    if (data.color != state.simpleColors[state.index]) {
      publishMQTTColors()
      publishToAllWS('ChangeSimpleColor', data)
      state.simpleColors[state.index] = data.color
    }
  });
  socket.on('AddSimpleColor', (data: AddSimpleColor) => {
    publishToAllWS('AddSimpleColor', data)
    state.simpleColors.push(data.color)
  });
  socket.on('RemoveSimpleColor', (data: RemoveSimpleColor) => {
    if (state.simpleColors.length > 0) {
      publishToAllWS('RemoveSimpleColor', data)
      state.simpleColors = state.simpleColors.slice(data.index, 1)
      if (state.index == data.index) {
        state.index = 0
        publishMQTTColors()
      }
    }
  });

  socket.on('AddPresetColors', (data: AddPresetColors) => {
    publishToAllWS('AddPresetColors', data)
    state.presetColors.push(data.colors)
  });
  socket.on('RemovePresetColors', (data: RemovePresetColors) => {
    if (state.presetColors.length > 0) {
      publishToAllWS('RemovePresetColors', data)
      state.presetColors = state.presetColors.slice(data.index, 1)
      if (state.index == data.index) {
        state.index = 0
        publishMQTTColors()
      }
    }
  });
  socket.on('ChangePresetColor', (data: ChangePresetColor) => {
    if (data.color != state.presetColors[state.index][state.presetColorsIndex]) {
      publishToAllWS('ChangePresetColor', data)
      state.presetColors[state.index][state.presetColorsIndex] = data.color
    }
  });
  socket.on('AddPresetColor', (data: AddPresetColor) => {
    publishToAllWS('AddPresetColor', data)
    state.presetColors[state.index].push(data.color)
  });
  socket.on('RemovePresetColor', (data: RemovePresetColor) => {
    if (state.presetColors[state.index].length > 0) {
      publishToAllWS('RemovePresetColor', data)
      state.presetColors[state.index] = state.presetColors[state.index].slice(data.index, 1)
    }
  });
  socket.on('ChangePresetColorsIndex', (data: ChangePresetColorsIndex) => {
    if (data.index != state.presetColorsIndex) {
      publishToAllWS('ChangePresetColorsIndex', data)
      state.presetColorsIndex = data.index
    }
    });
});

http.listen(port, () => {
  console.log(`webserver listening on port ${port} (behind nginx)`);
});

export function publishToAllWS(name: string, value: any) {
  io.sockets.emit(name, value);
}