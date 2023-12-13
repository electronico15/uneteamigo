require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { Telegraf, Markup  } = require('telegraf');
const { message } = require('telegraf/filters');
const moment = require('moment');
const { crearUsuario , getUserData} = require('./adminUserData')



var corsOptions = {
  origin: 'http://localhost:19006',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

///////////////////////////  get  //////////////////////////////////////////////
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  const userAgent = req.headers['user-agent'];
  console.log('req de '+userAgent)
});

app.get('/uuid', cors(corsOptions), (req, res) => {
    console.log('se solisito un uuid')
  const uuid = uuidv4(); // Genera un nuevo UUID
  res.json({ uuid }); // Retorna el UUID en formato JSON
});

///////////////////////////// io //////////////////////////////////////////

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

///////////////////////// bot /////////////////////////////////////////////

const bot = new Telegraf(process.env.BOT_TOKEN);
console.log(process.env.BOT_TOKEN)

bot.start(async (ctx) => {
    const { chat, from } = ctx.message;
    
 // Guardar información en la base de datos
 const resultado = await crearUsuario(from, chat);

 if (resultado === 'existe') {
   ctx.reply(`¡Hola, ${from.username}! Ya estás registrado en la base de datos.`);
 } else if (resultado === 'creado') {
   ctx.reply(`¡Hola ${from.username} has sido registrado en la base de datos ya puedes usar nuestros servicios`);
   enviarMenuPrinsipal()
  } else {
   // Manejar el caso de error
   ctx.reply('Ocurrió un error al procesar tu solicitud.');
 }
  
 
  });
  

  bot.on('text', async (ctx) => {

    const chatId = ctx.message.chat.id;
  const messageId = ctx.message.message_id;

  console.log(process.env.BOT_TOKEN)
    try {
      const { chat, from } = ctx.message;
  
      const userData = await getUserData(from.id);
  
      if (userData) {
        const { nombre } = userData;
      
        if (!ctx.message.text.startsWith('/')) {
          ctx.telegram.deleteMessage(chatId, messageId)
          return;
        }
        ctx.reply('Gracias por tu mensaje. ' + nombre);
        enviarMenuPrincipal(ctx)

        console.log(userData)
      } else {
        ctx.reply('No se encontraron datos para el usuario.');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      ctx.reply('Ocurrió un error al procesar tu solicitud.'+error);
    }
  });

  // Manejar la acción del botón
bot.action('accion1', (ctx) => {
  // Realizar la acción 1
  ctx.reply('Realizando acción 1');

  // Modificar el menú del usuario
  userMenuState[ctx.from.id] = 'submenu1';

  // Enviar el nuevo menú
  enviarNuevoMenu(ctx);
});

bot.action('accion2', (ctx) => {
  // Realizar la acción 2
  ctx.reply('Realizando acción 2');

  // Modificar el menú del usuario
  userMenuState[ctx.from.id] = 'submenu2';

  // Enviar el nuevo menú
  enviarNuevoMenu(ctx);
});

// Función para enviar el menú principal
function enviarMenuPrincipal(ctx) {
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Acción 1', 'accion1'),
    Markup.button.callback('Acción 2', 'accion2'),
  ]);

  ctx.reply('Menú Principal:', keyboard);
}

// Función para enviar un nuevo menú según el estado del usuario
function enviarNuevoMenu(ctx) {
  const estadoActual = userMenuState[ctx.from.id];

  if (estadoActual === 'submenu1') {
    // Construir y enviar el menú del Submenu 1
    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback('Opción A', 'opcionA'),
      Markup.button.callback('Opción B', 'opcionB'),
    ]);

    ctx.reply('Submenu 1:', keyboard);
  } else if (estadoActual === 'submenu2') {
    // Construir y enviar el menú del Submenu 2
    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback('Opción X', 'opcionX'),
      Markup.button.callback('Opción Y', 'opcionY'),
    ]);

    ctx.reply('Submenu 2:', keyboard);
  } else {
    // Si el estado no es reconocido, enviar el menú principal
    enviarMenuPrincipal(ctx);
  }
}




bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))


bot.launch()


function enviarMenuPrinsipal(){

}






//////////////////////////////////////////////////////////////////////


http.listen(3000, () => {
  console.log('listening on :3000');
});
