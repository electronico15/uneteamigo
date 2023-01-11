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
const readline = require('readline');
const ytdl = require('ytdl-core');
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
  var UrlVideoConAudio = req.query.UrlVideoConAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  var calidad =  req.query.calidad
  var content = req.query.content;
  var extencion = req.query.extencion;
  var urlAudio = req.query.urlAudio.replace(/@i/g , "&").replace(/@al/g, "=");
  var url = req.query.urlCodificada.replace(/@i/g , "&").replace(/@al/g, "=");
  var tituloiPlano = req.query.titulo.replace(/[$.,:"'!><?`#~]/g,'');
  
 //var videoStream = new stream.PassThrough();
 //var videoWriteStream = fs.createWriteStream(tituloiPlano+'.mp4');   

  const ref = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
const tracker = {
  start: Date.now(),
  audio: { downloaded: 0, total: Infinity },
  video: { downloaded: 0, total: Infinity },
  merged: { frame: 0, speed: '0x', fps: 0 },
};

// Get audio and video streams
const audio = ytdl(ref, { quality: 'highestaudio' })
  .on('progress', (_, downloaded, total) => {
    tracker.audio = { downloaded, total };
  });
const video = ytdl(ref, { quality: 'highestvideo' })
  .on('progress', (_, downloaded, total) => {
    tracker.video = { downloaded, total };
  });

// Prepare the progress bar
let progressbarHandle = null;
const progressbarInterval = 1000;
const showProgress = () => {
  readline.cursorTo(process.stdout, 0);
  const toMB = i => (i / 1024 / 1024).toFixed(2);

  process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
  process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

  process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
  readline.moveCursor(process.stdout, 0, -3);
};

// Start the ffmpeg child process
const ffmpegProcess = cp.spawn(ejec, [
  // Remove ffmpeg's console spamming
  '-loglevel', '8', '-hide_banner',
  // Redirect/Enable progress messages
  '-progress', 'pipe:3',
  // Set inputs
  '-i', 'pipe:4',
  '-i', 'pipe:5',
  // Map audio & video from streams
  '-map', '0:a',
  '-map', '1:v',
  // Keep encoding
  '-c:v', 'copy',
  // Define output file
  'out.mkv',
], {
  windowsHide: true,
  stdio: [
    /* Standard: stdin, stdout, stderr */
    'inherit', 'inherit', 'inherit',
    /* Custom: pipe:3, pipe:4, pipe:5 */
    'pipe', 'pipe', 'pipe',
  ],
});
ffmpegProcess.on('close', () => {
  console.log('done');
  // Cleanup
  process.stdout.write('\n\n\n\n');
  clearInterval(progressbarHandle);
});

// Link streams
// FFmpeg creates the transformer streams and we just have to insert / read data
ffmpegProcess.stdio[3].on('data', chunk => {
  // Start the progress bar
  if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
  // Parse the param=value list returned by ffmpeg
  const lines = chunk.toString().trim().split('\n');
  const args = {};
  for (const l of lines) {
    const [key, value] = l.split('=');
    args[key.trim()] = value.trim();
  }
  tracker.merged = args;
});
audio.pipe(ffmpegProcess.stdio[4]);
video.pipe(ffmpegProcess.stdio[5]);

 }); 
////////////////////////////////////////////////////////////////

app.listen(8080, function(){
console.log('server listo '+moment().format("HH:mm"))
});
