const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
console.log('home1')
res.send('Home1.1')
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('server-event', (data) => {
  console.log(data);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
