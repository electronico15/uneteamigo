const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  const userAgent = req.headers['user-agent'];
  console.log('req de '+userAgent)
});

app.get('/uuid', (req, res) => {
    console.log('se solisito un uuidd')
  const uuid = uuidv4(); // Genera un nuevo UUID
  res.json({ uuid }); // Retorna el UUID en formato JSON
});



io.on('connection', (socket) => {
   const clientId = socket.id; // Obtener el clientId del socket
  console.log('Un usuario se ha conectado, clientId:', clientId);
  
  socket.on('disconnect', () => {
    console.log('user '+clientId+' disconnected');
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
  console.log('listening on :3000');
});
