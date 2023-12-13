const { Telegraf, Markup  } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const moment = require('moment');
const { crearUsuario , getUserData} = require('./bd/userdata/adminUserData')


const bot = new Telegraf(process.env.BOT_TOKEN);

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

// Enable graceful stop
//process.once('SIGINT', () => bot.stop('SIGINT'))
//process.once('SIGTERM', () => bot.stop('SIGTERM'))

//https://t.me/MRBTools_BOT?start=store