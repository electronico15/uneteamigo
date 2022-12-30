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
const moment = require('moment');

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
   
var folderScript = path.join(__dirname, 'script'); 
var FileScript = path.join(__dirname, 'script', 'FFmpegRender'+moment().format("HH:mm")+'.js');

///////////// listar carpertas /////////////////////////////////
function readFile(read){
  fs.readdir(read, function (err, archivos) {
    if (err) {
    onError(err);
    return;
    }
    console.log('estos son  los archibos de '+read+' \n '+archivos);
 });
} 

///////////////////// descargar script desde> https://uneteamigo.com/js/FFmpegRender.js /////////////////////////////////////////////
https.get('https://uneteamigo.com/js/FFmpegRender.js', async (res) => {
 console.log('statusCode:', res.statusCode);
 
 res.pipe(fs.createWriteStream(FileScript))
  .on('error', function(err) {
   console.log('no se pudo guardar el script por el error '+err)
    return
  });

  const FFmpegRender = require(FileScript);
  FFmpegRender.generarIdScript();
  
  res.on('data', (d) => {

  });

}).on('error', (e) => {
  console.error('ubo un error al hacer get a la url del script'+e);
});

////////////////////////////////////////////////////////////////

})

///////////////////////////////////////////////////////////////
app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});