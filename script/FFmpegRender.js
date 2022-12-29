
const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");
const path = require('path');
const cors = require('cors');
const https = require('https');
const ejec = require('ffmpeg-static');
const { Console } = require('console');


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
