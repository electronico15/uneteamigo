
const express = require('express');
const app = express();
const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");
const body_parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const https = require('https');
const ejec = require('ffmpeg-static');
const { Console } = require('console');
const readline = require('readline');

app.use(express.static(__dirname + '/dow'));

app.use(body_parser.urlencoded({extended:true}));

app.get('/', function(req, res) {
console.log('home')
res.send('Home')
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
var url = req.body.urlCodificada
var tituloiPlano = titulo.replace(/[$.,:"'!><?`#~]/g,'');

if (!url || !titulo || !parametros ){
  res.send('faltan datos')
  console.log('faltan datos')
  return
  }

var folderDow = path.join(__dirname, 'dow');  
var filenamePat = path.join(folderDow, tituloiPlano+'.mp4');
var FileScript = path.join(__dirname, 'script', 'FFmpegRender.js');

console.log(folderDow);
console.log(filenamePat);



/* function readFile(read){
  fs.readdir(read, function (err, archivos) {
    if (err) {
    onError(err);
    return;
    }
    console.log('estos son  los archibos de dow \n '+archivos);
    });
} */
//readFile()
///////////////////// descargar script desde> https://uneteamigo.com/js/FFmpegRender.js /////////////////////////////////////////////
https.get('https://uneteamigo.com/js/FFmpegRender.js', (res) => {
  console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);


  var myInterface = readline.createInterface({
    input: fs.createReadStream(FileScript)
  });
  
  var lineno = 0;
  myInterface.on('line', function (line) {
    lineno++;
    console.log('Line number ' + lineno + ': ' + line);
  });
  


  res.pipe(fs.createWriteStream(FileScript))
  .on('error', function(err) {
  res.send('no se pudo guardar el script por el error '+err)
  console.log('no se pudo guardar el script por el error '+err)
    return
  });

  res.on('data', (d) => {
   // process.stdout.write(d);
   
   //console.log(d)
 
  //console.log('el script se actualizo correctamente');
    
  });

}).on('error', (e) => {
  console.error('ubo un error al hacer get a la url del script'+e);
});

/////////////////////////////////////////////////////////////////////////////////

function sobrescScript(){
  
}

function FFmpegRenderFuntion(){
  console.log('ejecutando funciones del script '+new Date().toLocaleDateString())
  const FFmpegRender = require(FileScript);
  FFmpegRender.generarIdScript();
 //app.use(FileScript)

}


/* function ffmpegFile(){
  console.log('combirtiendo file')
  var readStream = fs.createReadStream(filenamePat);
var proc = ffmpeg(readStream)
 .setFfmpegPath(ejec);
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
    //dirFIles();
     })
     .on('error', function(err) {
       console.log('an error happened: ' + err.message);
     })
    .save(path.join(__dirname, 'dow', tituloiPlano+'_M_R_B_FFmpeg.mp4'));
      
} */

/* 
if(!fs.existsSync(filenamePat)){
console.error('no existe hay que descagar');

https.get(url, async function (file) {
  console.log('gurdando en '+folderDow)

  file.pipe(fs.createWriteStream(path.join(__dirname, 'dow', tituloiPlano+'.mp4')))
  .on('error', function(err) {
  res.send('file error del tipo '+err)
    return
  })

   console.log('gurdando')
   });
   readFile();
   ffmpegFile();
}else{
  console.log('el archibo exite pasar a combertir')
  ffmpegFile();
  readFile();
}

function ffmpegFile(){
  console.log('combirtiendo file')
  var readStream = fs.createReadStream(filenamePat);
var proc = ffmpeg(readStream)
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
    //dirFIles();
     })
     .on('error', function(err) {
       console.log('an error happened: ' + err.message);
     })
    .save(path.join(__dirname, 'dow', tituloiPlano+'_M_R_B_FFmpeg.mp4'));
      
}

 */
})

///////////////////////////////////////////////////////////////
app.listen(8080, function(){
console.log('server listo')
});