//324+5
const express = require('express');
const app = express();
const fs = require("fs");
const body_parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const https = require('https');
const moment = require('moment');
const ejec = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
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
console.log('home')
res.send('Home1.0')
}); //fi de '/'
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
app.get("/downloadFFmpegRender", function (req, res) {

  
  ce('******************************************************');
  ce('*******------start downloadFFmpegRender 1-----********');
  ce('******************************************************'); 
  var UrlVideoConAudio = req.query.UrlVideoConAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  var calidad =  req.query.calidad
  var content = req.query.content;
  var extencion = req.query.extencion;
  var urlAudio = req.query.urlAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  var url = req.query.urlCodificada.replace(/@i/g , "&").replace(/@al/g, "=");
  var tituloiPlano = req.query.titulo.replace(/[$.,:"'!><?`#~]/g,'');
 //var videoStream = new stream.PassThrough();
 //var videoWriteStream = fs.createWriteStream(tituloiPlano+'.mp4');   
cr(url)
    function getHttpAudio(){
        https.get(urlAudio, (data)=>{
          if (data.statusCode === 200){
          data.pipe(ffmpegProcess.stdio[5]);
        } else if (data.statusCode === 302) {
          getHttpAudio();
          ce('reiniciando getHttpAudio '+data.statusCode);
         } else if (data.statusCode === 503) {
         cr(data.statusCode);
         res.send('hello world').end()
         return
        }
        data.on('end', () => {
         ce('******************************************************');
         ce('*********-      --- end getHttpAudio-       -*********');
         ce('******************************************************');
       });
           
        }).on("error", (err) => {
              console.log("Error: " + err.message);
        });
        } //end getHttpAudio
         
    function getHttpVideo(){
      https.get(url, (data)=>{
      if (data.statusCode === 200){
        data.pipe(ffmpegProcess.stdio[4]);
      } else if (data.statusCode === 302) {
        getHttpVideo();
        ce('reiniciando getHttpAudio '+data.statusCode);
         } else if (data.statusCode === 503) {
         cr(data.statusCode);
/*          res.cookie('title', 'GeeksforGeeks');
    res.send("Cookie Set"); */
   
         return  res.end()
        } else{
          return  cr(data.statusCode);
        }
      data.on('end', () => {
       ce('******************************************************');
       ce('*********-    --- end getHttpVideo-         -*********');
       ce('******************************************************');
       });
         
      }).on("error", (err) => {
            console.log("Error: " + err.message);
      });
    }
    getHttpAudio();
    getHttpVideo();
// Start the ffmpeg child process
 const ffmpegProcess = cp.spawn(ejec, [
  // Remove ffmpeg's console spamming
  //'-loglevel', '8', 
  '-hide_banner',
  // Redirect/Enable progress messages
  '-progress', 'pipe:3',
  // Set inputs
  '-i', 'pipe:4',
  '-i', 'pipe:5',
  '-map', '0:v',
  '-map', '1:a',
  '-y',
  // Map audio & video from streams

  // Keep encoding
 // '-c', 'copy',
 '-c:v', 'copy',
 '-c:a', 'copy', 
 //'-b:a', '192k',
  '-f', 'nut', 'pipe:6',
  
 
  // Define output file

], {
   stdio: [
   
    'inherit', 'inherit', 'inherit',
  
    'pipe', 'pipe', 'pipe', 'pipe',
  ],
}); 

ffmpegProcess.stdio[3].on('data', chunk => {
 
 });

ffmpegProcess.on('start', () => {
ce('inicio')
})
if (ffmpegProcess.stdio[6]){
//ffmpegProcess.stdio[3].pipe(videoStream);
res.set('Content-disposition', 'attachment; filename='+ encodeURI(tituloiPlano+calidad+"_m_r_b."+extencion));
res.set('Content-Type', content);
cr("descargando "+tituloiPlano+calidad+"_m_r_b."+extencion); 

ffmpegProcess.stdio[6].pipe(res)
}

    })
//////////////////////////////////////////////////////////////

app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});
