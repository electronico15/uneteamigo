
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");
const body_parser = require('body-parser');
const app = express();
const cors = require('cors');
const https = require('https');
const ejec = require('ffmpeg-static');
const { Console } = require('console');
var command = ffmpeg();
command.setFfmpegPath(ejec)

//app.use(express.static(__dirname + '/dow'));

app.use(body_parser.urlencoded({extended:true}));

app.get('/', function(req, res) {
console.log('home')
res.send('ok')

});

var corsOptions = {
  origin: 'http://localhost/',
  optionsSuccessStatus: 200 
}

/////////////////////////////////////////////////////////////////
app.post('/ffmpeg', cors(), function(req, res) {
  console.log('iniciada el ffmpge test')

var titulo = req.body.titulo
var parametros = req.body.parametros; 
var urlCodificada = req.body.urlCodificada

if (!urlCodificada || !titulo || !parametros ){
  res.send('faltan datos')
  console.log('faltan datos')
  return
  }

  console.log('directorio prinsipal es ' +__dirname)
  function dirFIles(){
    fs.readdir( __dirname, function (err, archivos) {
      if (err) {
      onError(err);
      return;
      }
      console.log('estos son  los archibos home \n '+archivos);
      });

    fs.readdir('/dow/', function (err, archivos) {
      if (err) {
      onError(err);
      return;
      }
      console.log('estos son  los archibos de dow \n '+archivos);
      });
  }
  
var tituloiPlano = titulo.replace(/[$.,:"'!><?`#~]/g,'');
const urlSinI= urlCodificada.replace(/@i/g , "&");
const url = urlSinI.replace(/@al/g, "=");

console.log(tituloiPlano);
console.log(parametros);
//console.log(url);

var filenamePat = __dirname+'/dow/'+tituloiPlano+'.mp4'
console.log('el file seria '+filenamePat);

dirFIles();

https.get(url, async function (file) {
  console.log('gurdando en '+__dirname+'/dow/')

  file.pipe(fs.createWriteStream(__dirname + '/dow/'+tituloiPlano+'.mp4')).on('error', function(err) {
  res.send('file error del tipo '+err)
    return
  })

  //ffmpegFile();
  console.log('gurdando')
  dirFIles();

  var proc = ffmpeg(filenamePat)
  .videoCodec(parametros.videoCodec)
  .audioCodec(parametros.audioCodec)
  .size(parametros.size)
  .videoBitrate(parametros.videoBitrate)
  .audioBitrate(parametros.audioBitrate)
  .on('progress', function(info) {
   console.log(info.timemark)
  })
  .on('end', function() {
 console.log('fin de la convercion iniciando descarga en el frontend de '+__dirname+'/dow/'+tituloiPlano+'_M_R_B_FFmpeg.mp4');
 res.send(tituloiPlano+'_M_R_B_FFmpeg.mp4').end();
 dirFIles();
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
 .save(__dirname +'/dow/'+tituloiPlano+'_M_R_B_FFmpeg.mp4');
 
   });

})
///////////////////////////////////////////////////////////////
app.listen(8080, function(){
console.log('server listo')
});
