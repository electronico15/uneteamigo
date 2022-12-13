
 cookieApiKei = getCookie('apiKei');
 cookeCantiVideos = getCookie('CantiVideos');
 cookieAbuscar = getCookie('Abuscar');
 cookieUrl = getCookie('url');
 cookieIp = getCookie('ip');
 cookieId = getCookie('id');
//const url2 = `https://www.googleapis.com/youtube/v3/search?key=${cookieApiKei}&type=video&part=snippet&q=${cookieAbuscar}&maxResults=${cookeCantiVideos}`;
cookieultimaFecha = getCookie("ufecha");
query = "";
//console.log("datos a busca \n"+cookieApiKei+"\n"+cookeCantiVideos+"\n"+query+"\n"+cookieUrl+"\n")
//var url = "";
////////////// start tup //////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function (){
  var ahora = new Date();
  //var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
//con(ahora)
  
  
setCantidadResultados();
setapiKei();
setAbuscar();
  //crearNecBd();
  
});


////////////// setCantidadResultados ///////////////////////
function setCantidadResultados(ct){
  var cookeCantiVideos = getCookie('CantiVideos');
  if(ct){
          setCookie('CantiVideos',ct,'30');
          var cookeCantiVideos = getCookie('CantiVideos');
          location.reload();
  } else {
    if (cookeCantiVideos === null || cookeCantiVideos === "undefined"){
           setCookie('CantiVideos','10','30')
           var cookeCantiVideos = getCookie('CantiVideos');
  } else {
          var cookeCantiVideos = getCookie('CantiVideos');
         }
      }
    }
///////////////////////////////////set apiKei/////////////////////////////
function setapiKei(ct){
    if(ct){
         
  } else {
    if (cookieApiKei === null || cookieApiKei === "undefined"){
      $.getJSON('./get_apikei', function(data) {
        setCookie('apiKei',data,'30');
        console.log(data)
        location.reload();
       })
     }
    }
  }
/////////////////////////setAbuscar()////////////////////////////////////////////
function setAbuscar(ct){
 // var cookieAbuscar = getCookie('Abuscar');
  
  if(ct){
          setCookie('Abuscar',ct,'30');
          var  cookieAbuscar = getCookie('Abuscar');
          return cookieApiKei;
  } else {
    if (cookieAbuscar === null || cookieAbuscar === "undefined"){
          setCookie('Abuscar',"MRB",'30');
          var cookieAbuscar = getCookie('Abuscar');
  } else {
   // setCookie('Abuscar',ct,'30');
          var cookieAbuscar = getCookie('Abuscar');
          //return cookeCantiVideos;
       }
      }
    }
///////////////////////////////////set url/////////////////////////////
function setUrl(ct){
     if(ct){
          setCookie('url',ct,'30');
         // location.reload();
  } else {
           if (cookieUrl === null || cookieUrl === "undefined"){
            setCookie('url',url,'30');
             //location.reload();
  } 
  }
  }

//////////////////////////////////////////////////////////////////////////////////////
function preocesar(palabraOurl){
 // alert(getCookie('CantiVideos'))
  if (palabraOurl !== "") {
    const url ="https://";
    const urlYutube = "https://www.youtube.com/watch?";
    //let url = ["http", "https"]
    const comprovarPalabraOurl = palabraOurl.includes(url) ? 'si' : 'no';
    const comprovarPalabraOurlYutube = palabraOurl.includes(urlYutube) ? 'si' : 'no';
    if (comprovarPalabraOurl === 'si'){
    if(comprovarPalabraOurlYutube === 'si') {
        console.log('tiene url')
    }else{
      msgNotifi(`😔 !Ups  ${palabraOurl} \n no parece ser una url de un video de YouTube`)
          }
    } else {
      setAbuscar(palabraOurl)
      main(palabraOurl)
     }
   } else{
    //setAbuscar("casa")
   // console.log(cookieApiKei+"\n"+cookeCantiVideos+"\n"+cookieAbuscar+"\n"+cookieUrl+"\n"+url)
    msgNotifi(`😔 !Ups  introduzca una url o palabra para buscar en YouTube`)
    }
  function notifi(texto){
    document.getElementById('notifi').innerHTML = `
   <div class="alert alert-danger" role="alert" style="margin-top:10px;">
   ${texto}
  </div>
    `
setTimeout(() => {
  document.getElementById('notifi').innerHTML = ""
}, 3000);
 }
}
///////////////////////// funcion principal *//////////////////////////////
  async function main(query) {

var key = `key=${cookieApiKei}`;
var part ="&part=snippet,id";
var type ="&type=video";
var q = `&q=${query}`;
var maxResults = `&maxResults=${cookeCantiVideos}`;
var videoType = "&videoType=any";
var filtros = "&fields=items(id(videoId),snippet(title,publishTime,description)),pageInfo(totalResults),nextPageToken";
var videoEmbeddable = "&videoEmbeddable=any";
var order = "&order=rating";
var location = "&location=cu";
var relevanceLanguage = "&relevanceLanguage=es";
var maxResults = `&maxResults=${cookeCantiVideos}`;

var url = "https://www.googleapis.com/youtube/v3/search?"+key+type+part+filtros+q+maxResults;
function sarchNaw(url){
  $("#result").html("");
  $.getJSON(url, function(data) {
  
     console.log(data);
     //console.log(data.items);
 
    for (var k in data.items ) {
       var tituloVideo = data.items[k]["snippet"].title;
       var idvideo = data.items[k]["id"].videoId;
       var idVideo = data.items[k]["id"].videoId;
       var urlVideo = "https://www.youtube.com/watch?v=" + data.items[k]["id"].videoId;
       var fechaVideo = data.items[k]["snippet"].publishTime;
       var description = data.items[k]["snippet"].description;
       var urlminiarura = "https://img.youtube.com/vi/" + data.items[k]["id"].videoId + "/0.jpg";
    
 $("#result").append(`
 <div class="col-lg-3 col-md-6 col-12">
                  <!-- Start Single Product -->
<div class="single-product">
                    <div class="product-image">
                    <img src="https://img.youtube.com/vi/${idvideo}/3.jpg" class="card-img-top" alt="#">
                        <div class="button">
                            <a class="btn" onclick="mostrarVideo('${idvideo}', '${tituloVideo}')"><i class="lni lni-cart"></i>Ir</a>
                          
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="category">Watches</span>
                        <h4 class="title">
                            <a href="product-grids.html">${tituloVideo}</a>
                        </h4>
                        <ul class="review">
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star-filled"></i></li>
                            <li><i class="lni lni-star"></i></li>
                            <li><span>4.0 Review(s)</span></li>
                        </ul>
                        <div class="price">
                            <span>${fechaVideo}</span>
                        </div>
                    </div>
                </div>
                </div>
 `);  
 }
////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
 }).fail(function(error) {
     if (error.status == 403) {
       console.log(error+"errode api");
      /*  console.info("la  url bloquiada es \n"+ urlf)
       const YOUTUBE_API_KEY = YOUTUBE_API_KEY_2;
        const  url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}&maxResults=${CANTREULTA}`;
        console.info("la nueva url es \n"+ url)
        response =  fetch(url);
        if(response.status === 200){
         console.log("status 200")
        } */
       
     } else {
         console.log("otro error tipo"+error);
     }
 });
  
}
sarchNaw(url)
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mostrarVideo(id, titulo){
  descaYouTube(id);
 var urlVideoEs = `https://www.youtube.com/watch?v=${id}`
  console.log('id es :' +id +'y el titule es:'+ titulo )
  $("#videos").html(`
  <!-- Button trigger modal -->
  <button id="btn_modal" type="button" class="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
 </button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${titulo}</h1>
              </div>
      <div id="modal-body" class="modal-body">
      <video id="videoid" controls width="100%" height="100%" poster="https://img.youtube.com/vi/${id}/3.jpg" preload="none" name="media" source src="" type="video/mp4"></video>
            
      </div>
      <div id="contoles"  class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="$('#videos').html('')">X</button>
       <div id="btoDes"> 

  <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Espere ...
  </button>
       
       </div>
      </div>
    </div>
  </div>
</div>

`); 
$("#btn_modal").trigger("click");
 }
////////////////////////////////////////////////////////////////////////////////////////////////////
function descaYouTube(id){
   console.log(id);

  $.post("/up", {bd: id}, function(data){
   // console.log(data[0].fps);
    $("#btoDes").html(`

    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">

  <div class="btn-group" role="group">
    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Listo Escoja un formato..
    </button>
    <ul id="format" class="dropdown-menu">
     
     
    </ul>
  </div>
</div>

     `) 
 
     for (var k in data) {
/*       var tituloVideo = data.items[k]["snippet"].title;
      var idvideo = data.items[k]["id"].videoId;
      var idVideo = data.items[k]["id"].videoId;
      var urlVideo = "https://www.youtube.com/watch?v=" + data.items[k]["id"].videoId;
      var fechaVideo = data.items[k]["snippet"].publishTime;
      var description = data.items[k]["snippet"].description;
      var urlminiarura = "https://img.youtube.com/vi/" + data.items[k]["id"].videoId + "/0.jpg";
 */
      var fps = data[k]["fps"];
      var url = data[k]["url"];
      var qualityLabel = data[k]["qualityLabel"];
      var audioCodec = data[k]["audioCodec"];

      if (audioCodec !== null && qualityLabel !== null ) {
        console.log("mostrando")
       $("#format").append(`
        <li id="${audioCodec}"><a id="formatItems" class="dropdown-item" onclick="downloadDataUrlFromJavascript('${id}','${url}' )">Calidad:${qualityLabel} fps:${fps} audio:${audioCodec}</a></li>
        
        `)

      } else{
        console.log(" sin resultadso ")
        //return
      }

//$("#null").html('borrado')


console.log(fps,"\n",url,"\n",qualityLabel,"\n",audioCodec)
     }
    
   // window.open(data.url)
     // downloadDataUrlFromJavascript("my.mp4", data.url)
 });

 
}
/*     <a href="{data.url}"  target="_blank" download="mi.mp4">
         <button type="button">mp4</button> 
        </a> 
     */

function downloadDataUrlFromJavascript(id, url) {
  $("#modal-body").html(`

  <video 
  id="videoid" 
  controls 
  width="100%" height="100%" 
  poster="https://img.youtube.com/vi/${id}/3.jpg" 
  preload="none" 
  name="media" 
  source
  src='${url}'; 
  type="video/mp4"></video>
        
  `)

  console.log(url)
  //$.post("/downloadDataUrl", {data: url}, function(data){

  //});
}


 /*  <div class="col tama">
    <div class="card tama" onclick="mostrarVideo('{idvideo}', '{tituloVideo}')" style="">
      <img src="https://img.youtube.com/vi/{idvideo}/3.jpg" class="card-img-top" alt="...">
      <div class="card-body">
      <p class="card-title">{tituloVideo}</p>
      
      <small class="text-muted">Fecha:{fechaVideo}</small>
      </div>
    </div>
  </div>
 */
 
  
  ///var url3 = `https://youtube.googleapis.com/youtube/v3/search?part=id&part=snippet&channelType=show&location=cu&maxResults=10&order=rating&q=casa&relevanceLanguage=es&safeSearch=none&type=video&videoDefinition=any&videoEmbeddable=any&videoLicense=any&videoType=any&key=${cookieApiKei}`;
  //var url2 = `https://www.googleapis.com/youtube/v3/search?key=${cookieApiKei} &type=video&part=snippet,statistics&q=${query}&fields=items(id)&maxResults=${cookeCantiVideos}`;
  //setUrl(url);
  //console.log("datos a busca \n"+cookieApiKei+"\n"+cookeCantiVideos+"\n"+query+"\n"+cookieUrl+"\n")
 //var opc1 =`/search?key=${cookieApiKei}&type=video&part=snippet,id&q=${query}&fields=items(id(videoId),snippet(title,publishTime)),pageInfo&maxResults=${cookeCantiVideos}`
//var todosResult = `/search?key=${cookieApiKei}&type=video&part=snippet&q=${cookieAbuscar}&maxResults=${cookeCantiVideos}`


/* 
async function main3(query, resultsPerPage) {
  console.log("Ready to get Youtube data!");
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return data;
}



function mostrarVideo(id, titulo){
  console.log('id es :' +id +'y el titule es:'+ titulo )
  $("#result").html(`
  <!-- Button trigger modal -->
  <button id="btn_modal" type="button" class="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
 </button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${titulo}</h1>
        
      </div>
      <div class="modal-body">
      <iframe width="200" height="300" src="https://www.youtube.com/embed/${id}" title="${titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

`); 
$("#btn_modal").trigger("click");
 }
 */

// var cd= `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
     // &fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`

   //  https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${cookieAPI}
     // &fields=items(id)&part=snippet,statistics`
    // https://www.googleapis.com/youtube/v3/search?key=${cookieAPI}&type=video&part=snippet&q=casa

/* mostrar contenido de la vusqueda  */

/* document.getElementById('result').innerHTML = `
<div class="col">
<div class="card" style="width: 18rem;">
<img src="https://img.youtube.com/vi/' + idvideo + '/2.jpg" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">'+tituloVideo+'</h5>
<p class="card-text">' + fechaVideo + '</p> 
<p id="idVideoo" >'+idVideo+'</p> 
<button type="button" class="btn btn-primary" onclick="mostrarVideo($("#idVideoo").text(), 2)">  Gou  </button>') 

`*/
/* 
document.getElementById('control').innerHTML = `

` */

/* let div = document.getElementById('result')
div.append(`${idvideo}`)
 */
      //console.log(k, data.items[k]["id"].videoId);
     // console.log("esto es una:" + urlminiarura);


    //document.getElementById('result').innerHTML='<div class="col"><div class="card" style="width: 18rem;"><img src="https://img.youtube.com/vi/' + idvideo + '/2.jpg" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+tituloVideo+'</h5><p class="card-text">' + fechaVideo + '</p> <p id="idVideoo" >'+idVideo+'</p>  <button type="button" class="btn btn-primary" onclick="mostrarVideo(1, 2)">  Gou  </button>';
   // document.getElementById('result').innerHTML='kooko'
         //$('#tabla tr:last').after('<tr>'+tituloVideo+'</tr><tr>'+urlVideo+'</tr><tr>'+fechaVideo+'</tr>');
    
       /*   $("#result").after('<div class="col"><div class="card" style="width: 18rem;"><img src="https://img.youtube.com/vi/' + idvideo + '/2.jpg" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+tituloVideo+'</h5><p class="card-text">' + fechaVideo + '</p> <p id="idVideoo" >'+idVideo+'</p>  <button type="button" class="btn btn-primary" onclick="mostrarVideo($("#idVideoo").text(), 2)">  Gou  </button>');

 */

         
    /*   $("#idVideoo").click(function () {
      var id = $("#idVideoo").text()
        //$("#"+idVideo).append('112')
       // $('#leer2').text()
      console.log(id)
        }); */

    //function ejecutarVideo


      /*<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">  Gou  </button><div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"> <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="staticBackdropLabel">' + tituloVideo + '</h1> </div ><div class="modal-body">  <iframe width="260" height="215" src="https://www.youtube.com/embed/'+idVideo+'" title="' + tituloVideo + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        </div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Understood</button></div> </div ></div ></div</div> </div></div> */

      //$("#divInteractuar").html('<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">  Gou  </button><div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"> <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1> < button type = "button" class= "btn-close" data - bs - dismiss="modal" aria - label="Close" ></button > </div ><div class="modal-body">    ... </div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Understood</button></div> </div ></div ></div');
        // $("#result").append('<tr><td>'+tituloVideo+'</td><td>'+urlVideo+'</td><td>'+fechaVideo+'</td></tr>');