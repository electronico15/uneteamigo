const express = require('express');
const app = express();
const fs = require("fs");
const body_parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const ytdl = require('ytdl-core');
const https = require('https');
const moment = require('moment');
const ejec = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
const cp = require('child_process');
const readline = require('readline');
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
  // var UrlVideoConAudio = req.query.UrlVideoConAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  //var urlAudio = req.query.urlAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  // var url = req.query.urlCodificada.replace(/@i/g , "&").replace(/@al/g, "=");
  //var videoStream = new stream.PassThrough();
  //var videoWriteStream = fs.createWriteStream(tituloiPlano+'.mp4');   
cr(idVideo)
cr(calidad)
cr(content)
cr(extencion)
cr(resolucion)
cr(tituloiPlano) 

const audio = ytdl(idVideo, { quality: 'highestaudio' })
  .on('progress', (_, downloaded, total) => {
  // cr(downloaded +total)
  });
const video = ytdl(idVideo, { quality: 'highestvideo' })
  .on('progress', (_, downloaded, total) => {
   // cr(downloaded +total)
  });

// Start the ffmpeg child process
const ffmpegProcess = cp.spawn(ejec, [
  // Remove ffmpeg's console spamming
 // '-loglevel', '8',
   '-hide_banner',
  // Redirect/Enable progress messages
  '-progress', 'pipe:3',
  // Set inputs
  '-i', 'pipe:4',
  '-i', 'pipe:5',
  // Map audio & video from streams
  '-preset', 'veryfast',
  '-map', '0:a',
  '-map', '1:v',
  '-c:v', 'libx265',
  '-c:a', 'copy', 
  '-y',
 // '-vf', 'scale=320:240',
  '-s', `${resolucion}`,
  //'-b:a', '192k',
   '-f', 'matroska','pipe:6',
], {
  windowsHide: true,
  stdio: [
    /* Standard: stdin, stdout, stderr */
    'inherit', 'inherit', 'inherit',
    /* Custom: pipe:3, pipe:4, pipe:5 */
    'pipe', 'pipe', 'pipe', 'pipe'
  ],
});
ffmpegProcess.on('close', () => {
  console.log('done');
 });

// FFmpeg creates the transformer streams and we just have to insert / read data
ffmpegProcess.stdio[3].on('data', chunk => {
//cr(chunk)
});
  
  audio.pipe(ffmpegProcess.stdio[4]);
  video.pipe(ffmpegProcess.stdio[5]);
  
  res.set('Content-disposition', 'attachment; filename='+ encodeURI(tituloiPlano+calidad+"_m_r_b."+extencion));
  res.set('Content-Type', content);
  cr("descargando "+tituloiPlano+calidad+"_m_r_b."+extencion); 
  ffmpegProcess.stdio[6].pipe(res)
 
}); // fin downloadFFmpegRender
  
////////////////////////////////////////////////////////////////

app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});
