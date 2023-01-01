
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
////////////////// req general /////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
console.log('home')
res.send('Home')
});
/////////////////// funcion pra decargar el video solisitado en el req ////////////
app.get('/dow', cors(), function(req, res) {
  var file = req.query.file
  console.log('descargando ',file)
  res.download(path.join(__dirname, 'dow',file), function(error){
  console.log("Error al decargar : " , file, error)
  res.send('error').end();
});
///////////////////////////////////////////////////////////////////////////////////////
/*   const FFmpegRender = require(FileScript);

  FFmpegRender.donwloadV(req).then((res)=>{
    console.log(`The function recieved with value ${res}`)
    res.send(res)
    res.donload
  }).catch((error)=>{
    console.log(`Handling error as we received ${error}`);
    res.send(error)
  }); */

})

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

/////////////////////////////////////////////////////////////////
app.post('/ffmpeg', cors(), function(req, res) {
console.log('iniciada el ffmpge test')
var FileScript = path.join(__dirname, 'script', 'FFmpegRender'+moment().format("HH:mm")+'.js');
//res.send('ok');
//res.send('ok2');
///////////////////// descargar script desde> https://uneteamigo.com/js/FFmpegRender.js /////////////////////////////////////////////
https.get('https://uneteamigo.com/js/FFmpegRender.js', async (dataUrlVid) => {
  console.log('statusCode:', dataUrlVid.statusCode);
 
  dataUrlVid.pipe(fs.createWriteStream(FileScript))
  .on('error', function(err) {
   console.log('no se pudo guardar el script por el error '+err)
    return
  });
setTimeout(() => {
  const FFmpegRender = require(FileScript);
//res.send(FFmpegRender.generarIdScript(req));

 FFmpegRender.generarIdScript(req).then((resp)=>{
  console.log(`The function recieved with value ${resp}`)
  res.send(resp).end();
}).catch((error)=>{
  console.log(`Handling error as we received ${error}`);
  res.send(error).end();
});


}, 9000);
dataUrlVid.on('data', (d) => {
  });
}).on('error', (e) => {
  console.error('ubo un error al hacer get a la url del script'+e);
});
})
///////////////////////////////////////////////////////////////
app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});