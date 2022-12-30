
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
  origin: '*',
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
    
var folderScript = path.join(__dirname, 'script'); 
var FileScript = path.join(__dirname, 'script', 'FFmpegRender'+moment().format("HH:mm")+'.js');

///////////////////// descargar script desde> https://uneteamigo.com/js/FFmpegRender.js /////////////////////////////////////////////
https.get('https://uneteamigo.com/js/FFmpegRender.js', async (data) => {
  console.log('statusCode:', data.statusCode);
 
 data.pipe(fs.createWriteStream(FileScript))
  .on('error', function(err) {
   console.log('no se pudo guardar el script por el error '+err)
    return
  });
setTimeout(() => {
  const FFmpegRender = require(FileScript);
  FFmpegRender.generarIdScript(req);

 // res.send(FFmpegRenderFuntion(req)).end();
}, 9000);

    data.on('data', (d) => {
  });
}).on('error', (e) => {
  console.error('ubo un error al hacer get a la url del script'+e);
});
/////////////////////////////////////////////////////////////////////////////////
function FFmpegRenderFuntion(req){
  const FFmpegRender = require(FileScript);
  FFmpegRender.generarIdScript(req);
}
})
///////////////////////////////////////////////////////////////
app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});