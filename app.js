const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
console.log('req')
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
   const clientId = socket.id; // Obtener el clientId del socket
  console.log('Un usuario se ha conectado, clientId:', clientId);
  
  socket.on('disconnect', () => {
    console.log('user ',clientId,' disconnected');
  });
  
  socket.on('client-event', (data) => {
    console.log('Datos recibidos del cliente, clientId:', clientId, ', data:', data);
    // Puedes utilizar el clientId para realizar acciones específicas para ese cliente
    // Por ejemplo, puedes enviar una respuesta solo a ese cliente utilizando socket.emit()
    // socket.emit('server-event', 'Respuesta para el cliente específico');
  });

  setInterval(() => {
     socket.emit('server-event', 'Datos enviados desde el servidor al cliente');
  }, 300);
  
});

io.on('server-event', (data) => {
  console.log(data);
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
