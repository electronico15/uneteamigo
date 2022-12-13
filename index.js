
const express = require("express");
const app = express();
const set_bd = require("./priv/js/set_bd.js")
const API_KEY = require("./priv/json_data/api.json")
var body_parser = require('body-parser');
const fs = require("fs");
const ytdl = require('ytdl-core');
const https = require('https');
app.use(express.json());
app.use(express.text());
app.use(body_parser.urlencoded({extended:true}));
const path = require("path");

const mainpath = path.join(__dirname+'/views');
console.log(mainpath)
app.use(express.static(mainpath)
);
//////////////////////////////////////////////////////////////
app.get("/get_id",(req,response)=>{
  var idnec = set_bd.generarId();
  response.json(idnec);
  console.log(idnec);
});
//////////////////////////////////////////////////////////
app.get("/get_ip",(req,response)=>{
  app.set('trust proxy', true);
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  response.json(ip);
  });
//////////////////////////////////////////////////////////
  app.get("/get_apikei",(req,response)=>{
    
    let YOUTUBE_API_KEY_1 = JSON.stringify(API_KEY.YOUTUBE_API_KEY[0].YOUTUBE_API_KEY_1);
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
  //const urlVideo = await ytdl.getInfo(id);
  const info = await ytdl.getInfo(urlVideoEs);
 // console.log(info.formats[4]);
 // console.log(info.formats[1]);
  var resp = info.formats.sort((a, b) => {

    return a.mimeType < b.mimeType;
})
//console.log(resp);
//let format = ytdl.chooseFormat(info.formats, { quality: '' });
  ///console.log(mp4);
 // const json = JSON.stringify(resp, null, 2)
  res.send(resp);
  console.log(resp[0].fps);

  for (var k in resp) {

    var fps = resp[k]["fps"];
    var url = resp[k]["url"];
    var qualityLabel = resp[k]["qualityLabel"];
    var audioCodec = resp[k]["audioCodec"];

console.log(fps,"\n",url,"\n",qualityLabel,"\n",audioCodec)
  }

    //console.log('urlVideo:', urlVideo);
   // console.log('info:', info);
    //console.log('uploaded by:', info.videoDetails.author.name);
    
     //  eslint-disable-next-line max-len
     
     //.replace(/(ip(?:=|%3D|\/))((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|[0-9a-f]{1,4}(?:(?::|%3A)[0-9a-f]{1,4}){7})/ig, '$10.0.0.0');
     //console.log('jonson:', json);
     //fs.writeFile(filepath, json, err2 => {
    //  if (err2) throw err2;
    //});
  });
  
///////////////////////////////////////////////////////
app.post("/crearbd", async function (req, res) {
  var bd = req.body.bd
  //console.log(bd);
  var data = JSON.stringify(bd)
 var id = JSON.stringify(bd.users[0].id);
 const newStr = id.substring(1, id.length - 1)
//bdLocal = require('./priv/json_data/bd.json')
//var id = JSON.stringify(bd1)

//var test = bdjson.users
 console.log(id)
 //let nuevaData = fs.appendFile({"name": "SO en español", "cool": true})
  fs.writeFile(`./priv/json_data/${newStr}.json`, data, (error) => {
    if (error){
        console.log(`error:${error}`);
    } else {
        console.log("correcto");
    }
} )   
/* const addToFile = async data => {
  let fileContents = await fs.readFile('./priv/json_data/bd.json', { encoding: 'utf8' });
  fileContents = JSON.parse(fileContents);
  fileContents.push(data);
  await fs.writeFile('myJSONFile.json', JSON.stringify(fileContents, null, 2), { encoding: 'utf8' });
}; */
    
  });
/////////////////////////////////////////////////////////
   app.get("/buscarVideo",async (req,res)=>{
    console.log(req.query.aBuscar);
    var varaBuscar = req.query.aBuscar;
  var opts = {
    maxResults: 2,
    key: 'AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA'
  };
  
  search('casa', opts, function(err, results) {
    if(err) 
    return console.log(err);
  
    console.dir(results);
  });


 });
/////////////////////////////////////////////////////////////////////////////////
app.post("/downloadDataUrl", async function (req, res) {
  var url = req.body.data;
  console.log(url)
  res.download(url)
  console.log('Your file has been downloaded!')

});
///////////////////////////////////////////////////////////////
app.listen(80,()=>{
console.log("Server is running on http://localhost");
});

//const fs = require("fs");

//const ytdl = require('ytdl-core');

//const indexfile = fs.readFileSync("index.html","utf-8");

//res.header("Content-Disposition", 'attachment;\  filename="Youtube Video.mp4')
//console.log(req.query.url);

/* ytdl(req.query.url)
  .pipe(fs.createWriteStream('video.mp4')); */
   /*  ytdl(req.query.url ,{format:'mp4'})

    .pipe(res) */
   // .pipe(fs.createWriteStream('video.mp4'));

    /* const options = {
      pages: 2,
    } 
    const searchResults = await ytsr(varaBuscar, { limit: 3 });
 */
    /* const filters1 = await ytsr.getFilters('github');
const filter1 = filters1.get('Type').get('Video');
const filters2 = await ytsr.getFilters(filter1.url);
const filter2 = filters2.get('Features').get('Live');
const options = {
  pages: 2,
}
const searchResults = await ytsr(filter2.url, options); */


//API_KEY=<API_KEY=AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA npm test> npm test
 
/* search('jsconf', opts, function(err, results) {
  if(err) return console.log(err);

  console.dir(results); */




//const id = generarId();
//const ytsr = require('ytsr');
//const YoutubeDlWrap = require("youtube-dl-wrap");
//const axios = require('axios');
   // console.log(filters2);
   // res.end(`${searchResults}`)
 /*    */

//const searchResults = await ytsr(filter2.url, options);
    /* const firstResultBatch = await ytsr(varaBuscar, options);

    const secondResultBatch = ytsr.continueReq(firstResultBatch.continuation);
    const thirdResultBatch = ytsr.continueReq(secondResultBatch.continuation);
     */
    // You can now use the .items property of all result batches e.g.:
    //console.log(firstResultBatch.items);
    //console.log(secondResultBatch.items);
   // console.log(thirdResultBatch.items);