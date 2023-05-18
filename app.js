const express = require('express')
const app = express()
const axios = require('axios');
const { Telegraf } = require('telegraf');
const body_parser = require('body-parser');
const ejec = require('ffmpeg-static');
const ytdl = require('ytdl-core');
const path = require("path");
const cp = require('child_process');
const cors = require('cors');
const moment = require('moment');
const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//5871057138:AAFOz6wB5QOtv9fyuTPu-C72qtS7AdYeYH8  t.me/MRB_LOG_RENDER_BOT
//5433177136:AAG4WlnHPObfk2ce1jL1oOIynYE6hV97e74
//5905743396:AAFxMllMCYrp3dJORzBLPBkGEs41170KvfA  t.me/MRB_LOG_TOOLS_BOT



// Importar el paquete de socket.io
const io = require('socket.io')(80);

// Escuchar conexiones entrantes
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado.');

  // Escuchar solicitudes de datos
  socket.on('solicitar-dato', (informacionRequerida) => {
    console.log(`El cliente solicita la información: ${informacionRequerida}`);

    // Procesar la solicitud y enviar la respuesta
    const dato = procesarSolicitud(informacionRequerida);
    socket.emit('dato-recibido', dato);
  });
});

// Función para procesar la solicitud y obtener el dato correspondiente
function procesarSolicitud(informacionRequerida) {
  // Aquí puedes realizar cualquier operación necesaria para obtener el dato solicitado
  const dato = 'información obtenida';

  return dato;
}



const bot = new Telegraf('5905743396:AAFxMllMCYrp3dJORzBLPBkGEs41170KvfA');
//////////////////////////////////////////////////////
app.use(cors());
app.use(express.static(__dirname + '/dow'));
app.use(body_parser.urlencoded({extended:true}));
app.use(cors());
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
bot.start((ctx) => {ctx.reply('Welcome')});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('chatId', (ctx) => ctx.reply('chat Id: '+ctx.message.chat.id)); 
//bot.telegram.sendMessage(1671749209, `Server iniciado`);
bot.launch();
///////////////////////////////////////////////////////////////////////

//////////funcion para pintar lia dde texto en la consola////////////////
function cr(str){ // asul claro
  console.log('\x1b[36m', str ,'\x1b[0m');
  bot.telegram.sendMessage(1671749209, str);
}
function cb(str){ // asul
  console.log('\x1b[34m', str ,'\x1b[0m');
  bot.telegram.sendMessage(1671749209, str);
}
function ce(str){ //error rojo
  console.log('\x1b[31m', str ,'\x1b[0m');
  bot.telegram.sendMessage(1671749209, str);
}
////////////////// req general /////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
console.log('home1')
res.send('Home1.1')
}); //fi de '/'
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
app.post("/up", async function (req, res) {
  var id = req.body.bd
  var urlVideoEs = `https://www.youtube.com/watch?v=${id}`
  cr('procesando solisitud '+urlVideoEs)
   const info = await ytdl.getInfo(urlVideoEs);
  var resp = info.formats.sort((a, b) => {
  return a.mimeType < b.mimeType;
})
 res.send(resp);
 console.log('info redy');
})
////////////////////////////////////////////////////////////////
app.get("/downloadFFmpegRender", function (req, res) {
   
  ce('**iniciando downloadFFmpegRender**');
 
  var idVideo = req.query.idVideo;
  var calidad =  req.query.calidad;
  var content = req.query.content;
  var extencion = req.query.extencion;
  var resolucion = req.query.resolucion;
  var tituloiPlano = req.query.titulo;
  var urlAudio = req.query.urlAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  var url = req.query.urlCodificada.replace(/@i/g , "&").replace(/@al/g, "=");
  var videoStream = new stream.PassThrough();
  
const ffmpegProcess = cp.spawn(ejec, [
  '-hide_banner',
  '-progress', 'pipe:3',
  '-i', 'pipe:4',
  '-i', 'pipe:5',
  '-preset', 'ultrafast',
  '-map', '0:a',
  '-map', '1:v',
  '-c:v', 'copy',
  '-c:a', 'copy', 
  '-f', 'NUT','pipe:6',
  '-y',
  'oupt.mp4',
], {
  windowsHide: true,
  stdio: [
      'inherit', 'inherit', 'inherit',
      'pipe', 'pipe', 'pipe', 'pipe'
  ],
});

ffmpegProcess.on('close', () => {
  cr('fin de la descarga> '+tituloiPlano+calidad+"_m_r_b."+extencion);
 });

  async function getAudio(){
  const {data} = await axios.post(url, req, {
  responseType: 'stream'
  });
    data.pipe(ffmpegProcess.stdio[5]);
   }

  async function getVideo(){
  const {data} = await axios.post(urlAudio, req, {
  responseType: 'stream'
  });
  data.pipe(ffmpegProcess.stdio[4]);
  }
  getAudio();
  getVideo();
  res.set('Content-disposition', 'attachment; filename='+ encodeURI(tituloiPlano+calidad+"_m_r_b."+extencion));
  res.set('Content-Type', content);
  cr("descargando "+tituloiPlano+calidad+"_m_r_b."+extencion); 
   ffmpegProcess.stdio[6].pipe(res);
  //videoStream.pipe(res);
    }); // fin downloadFFmpegRender
  
////////////////////////////////////////////////////////////////

app.listen(8080, function(){
cb('server listo '+moment().format("HH:mm:ss YYYY-MM-DD"))
});
