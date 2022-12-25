const express = require('express')
const app = express();
const readline = require('readline');
const body_parser = require('body-parser');
const fs = require("fs");
const ytdl = require('ytdl-core');
const https = require('https');
const path = require("path");
const API_KEY = require("./priv/json_data/api.json")
//const ffmpeg = require('ffmpeg');
//const ffmpeg = require('ffmpeg-static');
//pathToFfmpeg = require('ffmpeg-static');

app.use(body_parser.urlencoded({extended:true}));
const mainpath = path.join(__dirname+'/views');
app.use(express.static(mainpath)
);

app.get("/get_ip",(req,response)=>{
  app.set('trust proxy', true);
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  response.json(ip);
  });

//////////////////////////////////////////////////////////
app.get("/get_ip",(req,response)=>{
  app.set('trust proxy', true);
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  response.json(ip);
  });

  //////////////////////////////////////////////////////////

 app.get("/get_apikei",(req,response)=>{
    var YOUTUBE_API_KEY_1 = JSON.stringify(API_KEY.YOUTUBE_API_KEY[0].YOUTUBE_API_KEY_1);
    var YOUTUBE_API_KEY_2 = JSON.stringify(API_KEY.YOUTUBE_API_KEY[0].YOUTUBE_API_KEY_2);
    var YOUTUBE_API_KEY_3 = JSON.stringify(API_KEY.YOUTUBE_API_KEY[0].YOUTUBE_API_KEY_3);
    response.send(YOUTUBE_API_KEY_1);
         });
//////////////////////////////////////////////////////////////
app.post("/up", async function (req, res) {
  var id = req.body.bd
  var urlVideoEs = `https://www.youtube.com/watch?v=${id}`
  const filepath = path.resolve(__dirname, 'info.json');
  console.log(id);
  console.log(urlVideoEs);
  const info = await ytdl.getInfo(urlVideoEs);
  var resp = info.formats.sort((a, b) => {
  return a.mimeType < b.mimeType;
})
  res.send(resp);
  console.log(resp[0].fps);
  for (var k in resp) {
    var fps = resp[k]["fps"];
    var url = resp[k]["url"];
    var qualityLabel = resp[k]["qualityLabel"];
    var audioCodec = resp[k]["audioCodec"];
console.log(fps,"\n",url,"\n",qualityLabel,"\n",audioCodec)
  }

  });
/////////////////////////////////////////////////////////////////////////////////
app.get("/downloadUrl",async function (req, res) {
  var id = req.query.id;
  var tipo = req.query.tipo;
  var formato = req.query.formato;
  var urlVideoEs = `https://www.youtube.com/watch?v=${id}`
console.log(formato)
const info = await ytdl.getInfo(urlVideoEs);
const titulo = info.videoDetails['title']
var tituloiPlano = titulo.replace(/[$.,:"'!><?`~]/g,'');
var format = info.formats.sort((a, b) => {
  return a.mimeType < b.mimeType;
  })

  if (tipo === "audio"){
    for (var k in format) {
    var url = format[k]["url"];
    var mimeType = format[k]["mimeType"];
    if (mimeType === 'audio/mp4; codecs="mp4a.40.2"'){
    https.get(url, async function (file) {
    res.set('Content-disposition', 'attachment; filename=' + encodeURI(tituloiPlano + "💿🎶🎧m_r_b"+"."+formato));
    res.set('Content-Type', 'video/mp4');
    file.pipe(res);
    console.log("descargando "+tituloiPlano + "💿🎶🎧m_r_b."+formato )
    });
    } 
   }
  } else if(tipo === "video"){

    for (var k in format) {
      var url = format[k]["url"];
      var qualityLabel = format[k]["qualityLabel"];
      var audioCodec = format[k]["audioCodec"];

    console.log(qualityLabel +" audio "+audioCodec )
     if (formato === qualityLabel  && audioCodec !== null){
      console.log("el formato es "+formato+' y se descargara el '+ qualityLabel);
      dowVideo(url);
      return
     }  else if( qualityLabel > formato && audioCodec !== null ){
      console.log("descargando "+qualityLabel+ " porque no hay "+formato+ " con audio")
      dowVideo(url);
      return
    } else if(qualityLabel < formato && audioCodec !== null ){
      console.log("descargando  "+qualityLabel+" porque no hay "+formato+ " con audio")
      dowVideo(url);
      return
    } 
    }
    }
    function dowVideo(url){
      https.get(url, async function (file) {
      res.set('Content-disposition', 'attachment; filename=' + encodeURI(tituloiPlano +"▶️📽️🎬m_r_b.mp4"));
      res.set('Content-Type', 'video/mp4');
      file.pipe(res);
      console.log("descargando",tituloiPlano+"▶️📽️🎬m_r_b.mp4")
      });
    }
    });
    /////////////////////////////////////////////////////////////
    app.get("/downloadCaption",async function (req, res) {
      var urlSInigualdas = req.query.url;
      var titulo = req.query.titulo
      var tipo = req.query.tipo;
      var tituloiPlano = titulo.replace(/[$.,:"'!><?`#~]/g,'');

      const urlSinInteroga = urlSInigualdas.replace(/@i/g , "&");
      const url = urlSinInteroga.replace(/@al/g, "=");
      console.log(titulo);
      console.log(urlSInigualdas);
      console.log(url);
      
      https.get(url, async function (file) {
        res.set('Content-disposition', 'attachment; filename=' + encodeURI(tituloiPlano+"💿🎶🎧m_r_b.xml"));
        res.set('Content-Type', 'text/html');
        file.pipe(res);
        console.log("descargando "+tituloiPlano + "💿🎶🎧m_r_b"+tipo+".xml");
        });

    })
////////////////////////////////////////////////////////////////
app.get("/getInfoCaption",async function (req, res) {
  var id = req.query.id;
  var urlVideoEs = `https://www.youtube.com/watch?v=${id}`
  console.log(id)
 var cations = await ytdl.getInfo(urlVideoEs).then(info => {
       return info
    })
    res.send(cations)
    console.log(cations)       
})
////////////////////////////////////////////////////////////////
app.get("/downloadSUbtitulos",async function (req, res) {
  var id = req.query.id;
  var urlVideoEs = `https://www.youtube.com/watch?v=${id}`
  ///downloadSUbtitulos?id=QRS8MkLhQmM
  //const id = 'https://www.youtube.com/watch?v=QRS8MkLhQmM';
  const lang = 'es-MX';
  console.log(id)
  // Can be xml, ttml, vtt, srv1, srv2, srv3
  const format = 'xml';
  
  ytdl.getInfo(urlVideoEs).then(info => {
    const tracks = info
      .player_response.captions
      .playerCaptionsTracklistRenderer.captionTracks;
      console.log(tracks) 
    if (tracks && tracks.length) {
      console.log('Found captions for',
        tracks.map(t => t.name.simpleText).join(', '));
      const track = tracks.find(t => t.languageCode === lang);
      if (track) {
        console.log('Retrieving captions:', track.name.simpleText);
        console.log('URL', track.baseUrl);
        const output = `${info.videoDetails.title}.${track.languageCode}.${format}`;
        console.log('Saving to', output);
        https.get(`${track.baseUrl}&fmt=${format !== 'xml' ? format : ''}`, res => {
          res.pipe(fs.createWriteStream(path.resolve(__dirname, output)));
        });
      } else {
        console.log('Could not find captions for', lang);
      }
    } else {
      console.log('No captions found for this video');
    }
  });


})
/////////////////////////////////////////////////////////////////////
const ref = 'https://www.youtube.com/watch?v=aR-KAldshAE';
const tracker = {
  start: Date.now(),
  audio: { downloaded: 0, total: Infinity },
  video: { downloaded: 0, total: Infinity },
};

// Get audio and video stream going
const audio = ytdl(ref, { filter: 'audioonly', quality: 'highestaudio' })
  .on('progress', (_, downloaded, total) => {
    tracker.audio = { downloaded, total };
  });
const video = ytdl(ref, { filter: 'videoonly', quality: 'highestvideo' })
  .on('progress', (_, downloaded, total) => {
    tracker.video = { downloaded, total };
  });

// Get the progress bar going
const progressbar = setInterval(() => {
  readline.cursorTo(process.stdout, 0);
  const toMB = i => (i / 1024 / 1024).toFixed(2);

  process.stdout.write(`Audio | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`Video | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
  readline.moveCursor(process.stdout, 0, -2);
}, 1000);


//////////////////////////////////////////////////////////////
 app.listen(process.env.PORT, function () {
  console.log('Example app started!1.3')
})


