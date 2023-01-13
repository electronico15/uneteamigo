const express = require('express');
const app = express();
const body_parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const ytdl = require('ytdl-core');
const https = require('https');
const moment = require('moment');
const ejec = require('ffmpeg-static');
const cp = require('child_process');
const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];


app.use(express.static(__dirname + '/dow'));

app.use(body_parser.urlencoded({extended:true}));
//////////funcion para pintar lia dde texto en la consola////////////////
function cr(str){ // asul claro
  console.log('\x1b[36m', str ,'\x1b[0m')
}
function cb(str){ // asul
  console.log('\x1b[34m', str ,'\x1b[0m')
}
function ce(str){ //error rojo
  console.log('\x1b[31m', str ,'\x1b[0m')
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
  
  ce('******************************************************');
  ce('*******------start downloadFFmpegRender 1-----********');
  ce('******************************************************'); 
 
  var idVideo = req.query.idVideo;
  var calidad =  req.query.calidad;
  var content = req.query.content;
  var extencion = req.query.extencion;
  var resolucion = req.query.resolucion;
  var tituloiPlano = req.query.titulo;
  var urlAudio = req.query.urlAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  var url = req.query.urlCodificada.replace(/@i/g , "&").replace(/@al/g, "=");

cr('-----------------------------------------------------------------') 
cr(tituloiPlano)
cr(idVideo)
cr(calidad)
cr(content)
cr(extencion)
cr(resolucion)
cr(urlAudio) 
cr(url) 
cr('-----------------------------------------------------------------') 

const ffmpegProcess = cp.spawn(ejec, [
  '-hide_banner',
  '-progress', 'pipe:3',
  '-i', 'pipe:4',
  '-i', 'pipe:5',
  '-preset', 'veryfast',
  '-map', '0:a',
  '-map', '1:v',
  '-c:v', 'copy',
  '-c:a', 'copy', 
  '-f', 'matroska','pipe:6',
], {
  windowsHide: true,
  stdio: [
      'inherit', 'inherit', 'inherit',
      'pipe', 'pipe', 'pipe', 'pipe'
  ],
});

ffmpegProcess.on('close', () => {
  console.log('done');
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
 
}); // fin downloadFFmpegRender
  
////////////////////////////////////////////////////////////////

app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});
