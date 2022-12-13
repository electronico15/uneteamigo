
const express = require("express");
//

//const msgNotifi = require("./js/msgNotifi")
const app = express();
//const ytsr = require('ytsr');
//const YoutubeDlWrap = require("youtube-dl-wrap");

//const axios = require('axios');
var search = require('youtube-search');
const path = require("path");

//const fs = require("fs");

//const ytdl = require('ytdl-core');

const mainpath = path.join(__dirname+'/views');
console.log(mainpath)
app.use(express.static(mainpath));
//const indexfile = fs.readFileSync("index.html","utf-8");



app.get("/",(req,res)=>{
 // console.dir(req.ip);
  //return res.render("index.html");
 // res.sendFile(__dirname + '/index.html');
 
});

app.get("/download",(req,res)=>{

//res.header("Content-Disposition", 'attachment;\  filename="Youtube Video.mp4')
//console.log(req.query.url);

/* ytdl(req.query.url)
  .pipe(fs.createWriteStream('video.mp4')); */
   /*  ytdl(req.query.url ,{format:'mp4'})

    .pipe(res) */
   // .pipe(fs.createWriteStream('video.mp4'));

   });

   
   app.get("/buscarVideo",async (req,res)=>{
    console.log(req.query.aBuscar);

    var varaBuscar = req.query.aBuscar;

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


  var opts = {
    maxResults: 2,
    key: 'AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA'
  };
  
  search('casa', opts, function(err, results) {
    if(err) 
    return console.log(err);
  
    console.dir(results);
  });

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
 });


app.listen(80,()=>{

  console.log("Server is running on http://localhost");


});
