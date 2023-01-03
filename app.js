//324+5
const express = require('express');
const app = express();
const fs = require("fs");
const body_parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const https = require('https');
const moment = require('moment');

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
console.log('home')
res.send('Home')
});
/////////////////// funcion pra decargar el video solisitado en el req ////////////
app.get('/dow', cors(), function(req, res) {
  var file = req.query.file
  console.log('iniciando req /dow '+file)
  res.download(path.join(__dirname, 'dow', file), file ,error => {
  if (error) ce("Error al decargar : " , file, error).res.send('error').end()
  else cr("se decargo correctamente el ", file);
    //res.end();
    });
/////////////////////////////////////////////////////////////////////////////
/*   const FFmpegRender = require(FileScript);
  FFmpegRender.donwloadV(req).then((res)=>{
    console.log(`The function recieved with value ${res}`)
    res.send(res)
    res.donload
  }).catch((error)=>{
    console.log(`Handling error as we received ${error}`);
    res.send(error)
  }); */
})// fin app.get('/dow')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
/////////////////////////////////////////////////////////////////
app.post('/ffmpeg', cors(), function(req, res) {
cb('iniciada el ffmpge test')
var FileScript = path.join(__dirname, 'script', 'FFmpegRender'+moment().format("HH:mm")+'.js');
var crearFileScript = fs.createWriteStream(FileScript)
//res.send('ok');

//res.send('ok2');
///////////////////// descargar script desde> https://uneteamigo.com/js/FFmpegRender.js /////////////////////////////////////////////
https.get('https://uneteamigo.com/js/FFmpegRender.js', async (dataUrlVid) => {
  cb('statusCode:', dataUrlVid.statusCode);
   dataUrlVid.pipe(crearFileScript)
  .on('error', function(err) {
   cr('no se pudo guardar el script por el error '+err)
    return
  });

  crearFileScript.on("finish", () => {
    crearFileScript.close();
    cr("descargado y creado el FFmpegRender.js ejeecutando FFmpgRender ");
    const FFmpegRender = require(FileScript);
    FFmpegRender.descargarYcombertirReq(req).then((resp)=>{
     cr(`enviando res.send(${resp})`);
     res.send(resp).end();
   }).catch((error)=>{
     cr(`enviando error res.send(${error})`);
     res.send(error).end();
   });
   
});
 
dataUrlVid.on('data', (d) => {
  });
}).on('error', (e) => {
  console.error('ubo un error al hacer get a la url del script'+e);
});
})// fin app.get('/ffmpeg')

app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});