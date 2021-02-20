import {state} from "../main";

const express = require("express");
const app = express();
const http = require('http').createServer(app);
export let io;

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
  socket.emit('baseData', state.toState())

  socket.on('changes', (data: any) => {
    Object.keys(data).forEach(key => {
      state[key] = data[key]
    })
  });
});

http.listen(port, () => {
  console.log(`webserver listening on port ${port} (behind nginx)`);
});

