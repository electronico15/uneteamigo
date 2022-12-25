
 cookieApiKei = getCookie('apiKei');
 cookeCantiVideos = getCookie('CantiVideos');
 cookieAbuscar = getCookie('Abuscar');
 cookieUrl = getCookie('url');
 cookieIp = getCookie('ip');
 cookieId = getCookie('id');
 cooketypeRecursoResul = getCookie('typeRecursoResul');
 cookieultimaFecha = getCookie("ufecha");
 cookeordenResult = getCookie('ordenResult');
 cookieLanguageResult = getCookie('LanguageResult');
 cookeRegionCode = getCookie('RegionCode');
 cookevideoDuration = getCookie('videoDuration');
 query = "";

////////////// start tup //////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function (){

});

setInterval(() => {
 // $("#btnFiltro").animate({color: "aliceblue"}, 1000);
  $("#btnFiltro").animate({color: "#f0f8ff"}, 3000);
  $("#btnFiltro").animate({color: "#ee0808"}, 3000);
  $("#btnFiltro").animate({ color: '#0808ee'}, 3000);
  /* $('#btnFiltro').animate({backgroundColor: '#f0f8ff'}, 3000)
  $('#btnFiltro').animate({backgroundColor: '#ee0808'}, 3000)
  $('#btnFiltro').animate({backgroundColor: '#0808ee'}, 3000) */
}, 9000);

/* setInterval(() => {
  $("#btnFiltro").animate({color: "#4edc1b"},1000);
}, 6000);
 */



//////////////////////////////////////////////////////////////////////////////////////
function preocesar(palabraOurl){
 // alert(getCookie('CantiVideos'))
  if (palabraOurl !== "") {
    const url ="https://";
    const urlYutube = "youtube";
    const comprovarPalabraOurl = palabraOurl.includes(url) ? 'si' : 'no';
    const comprovarPalabraOurlYutube = palabraOurl.includes(urlYutube) ? 'si' : 'no';
    if (comprovarPalabraOurl === 'si'){
    if(comprovarPalabraOurlYutube === 'si') {
      setAbuscar(palabraOurl)
      main(palabraOurl)
    }else{
      msgNotifi(`😔 !Ups  ${palabraOurl} \n no parece ser una url de un video de YouTube`)
          }
    } else {
      setAbuscar(palabraOurl)
      main(palabraOurl)
     }
   } else{
       msgNotifi(`😔 !Ups  introduzca una url o palabra para buscar en YouTube`)
    }
  function notifi(texto){
    document.getElementById('notifi').innerHTML = `
   <div class="alert alert-danger" role="alert" style="margin-top:10px;">
   ${texto}
  </div>
    `
setTimeout(() => { document.getElementById('notifi').innerHTML = ""}, 3000);
 }
}
///////////////////////// funcion principal *//////////////////////////////
async function main(query) {

var key = `key=${cookieApiKei}`;
var type =`&type=video`;//video,channel,playlist.
var part ="&part=snippet,id";
var filtros = "&fields=items(id(videoId),snippet(title,publishTime,description)),pageInfo(totalResults),nextPageToken";
var q = `&q=${query}`;
var maxResults = `&maxResults=${cookeCantiVideos}`;//
var safeSearch =`&safeSearch=none`//
var videoType = "&videoType=any";//permite restringir una búsqueda para incluir un determinado tipo de videos. episode, movie
var videoEmbeddable = "&videoEmbeddable=true";//permite restringir una búsqueda para incluir solo videos que se puedan insertar en una página web.
var order = `&order=${cookeordenResult}`;//
//var location = "&location=cu";//
var relevanceLanguage =`&relevanceLanguage=${cookieLanguageResult}`;// es	Spanish, en	English,ca	Catalan,bxr	Buriat (Russia)
var regionCode = `&regionCode=${cookeRegionCode}`;//
var eventType = `&eventType=completed`//
var videoDefinition = `&videoDefinition=any`//
var videoDuration = `&videoDuration=${cookevideoDuration}`//


var url = "https://www.googleapis.com/youtube/v3/search?"+key+type+part+filtros+q+maxResults+safeSearch +videoType+videoEmbeddable+order+relevanceLanguage+regionCode+eventType+videoDefinition+videoDuration;
function sarchNaw(url){
  $("#result").html("");
  $.getJSON(url, function(data) {
   console.log(data);
     
    for (var k in data.items ) {
       var tituloVideo = data.items[k]["snippet"].title;
       var idvideo = data.items[k]["id"].videoId;
       var urlVideo = "https://www.youtube.com/watch?v=" + data.items[k]["id"].videoId;
       var fechaVideo = data.items[k]["snippet"].publishTime;
       var description = data.items[k]["snippet"].description;
       var urlminiarura = "https://img.youtube.com/vi/" + data.items[k]["id"].videoId + "/0.jpg";

 $("#result").append(`

 <div id="vid" class="col-12 col-sm-6	col-lg-12 col-xl-12" >
                      
 <div class="row divItem">

  <div class="col-5" onclick="mostrarVideo('${idvideo}', '${tituloVideo}')"><img id="imagePoster" src="https://img.youtube.com/vi/${idvideo}/3.jpg" class="card-img-top" alt="#"></div> 

 <div class="col-7 badge  text-wrap" style="cursor: grab;">
  <p class="cosorHelp">${tituloVideo}</p>     
  <span>${fechaVideo}</span>
  <span>
</span>
<div class="card-footer ">
  <i id="iconoAudio${idvideo}" onclick="getAudioId('${idvideo}')" class="bi bi-earbuds svg" ></i>
  <i id="iconoDescarga${idvideo}" onclick="setFormatGET('${idvideo}')" class="bi bi-download" ></i>
  <i id="iconoCaption${idvideo}" class="bi bi-badge-cc-fill svg" onclick="getInfoCaption('${idvideo}')"></i>
  <div id="formatos${idvideo}"> </div>
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
////////////////////////////////////////////////////////////////////////////////////////////////////
function getInfoCaption(id){
  
  $("#iconoDescarga"+id).show();
  $("#iconoCaption"+id).hide();
  $("#formatos"+id).html(`
  <div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>
  Espere...
    `)
  console.log(id)
  $.ajax({
    url: "getInfoCaption",
    data:{
      id: id
    },
  
    success: function (response) {
      console.log(response)
      $("#formatos"+id).html(`
      <div class="dropdown">
      <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <div class="spinner-grow spinner-grow-sm" role="status">
    <span class="visually-hidden">Loading...</span>
     </div>
     Lenguajes
      </button>
      <ul id="ulcaptions${id}" class="dropdown-menu" style=""> </ul>
      </div>
      `)

      if (response.player_response.captions){
        console.log(response.player_response.captions.playerCaptionsTracklistRenderer.captionTracks);
        console.log("tiene caption")
        var sarchCaption = response.player_response.captions.playerCaptionsTracklistRenderer.captionTracks;
        var titulo = response.videoDetails.title;
        for (var k in sarchCaption ) {
        var url = sarchCaption[k].baseUrl;
        var languageCode = sarchCaption[k].languageCode;
        var simpleText = sarchCaption[k].name.simpleText;
        const urlSinInteroga = url.replace(/&/g , "@i");
        const urlSInigualdas = urlSinInteroga.replace(/=/g, "@al");
       // console.log(urlSInigualdas)


        $("#ulcaptions"+id).append(`
         <li >
          <i class="bi bi-badge-cc-fill"></i>
          <a href="/downloadCaption/?url=${urlSInigualdas}&tipo=${languageCode}&titulo=${titulo}&tipo=${languageCode}" target="_blank">${languageCode} ${simpleText}</a>
          </li>
          `)


        }


      } else{
        $("#formatos"+id).html(`Sin subtítulos disponibles`)
        console.log("no tiene caption")
      }

        },

    error: function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

       console.log(msg);

        //return
    },
});
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function ntifFormat(titulo){
  $("#notifiContainer").html(`   
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
  <div class="toast-header">
    <img id="ico" src="./image/ico.ico" class="rounded me-2" alt="...">
    <strong class="me-auto">notificacion</strong>
    <small id="notifiHora">Hora:</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div id="textoContenido" class="toast-body">
  Cragando lista de formatos espere 
  <div class="spinner-grow text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
  </div>
</div> 
     `)
     const toastLiveExample = document.getElementById('liveToast')
     const toast = new bootstrap.Toast(toastLiveExample)
     const myToast = bootstrap.Toast.getInstance(toastLiveExample)
     var hoy = new Date();
     var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
     document.getElementById('notifiHora').innerHTML = fecha;
     toast.show()
}


////////////////////////////////////////////////////////////////////////
function setFormatGET(id){
  $("#iconoDescarga"+id).hide();
  $("#iconoCaption"+id).show();
  $("#formatos"+id).html(`
  <div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>
  Espere...
    `)
  setTimeout(() => {
    $("#formatos"+id).html(`
    <div class="dropdown">
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <div class="spinner-grow spinner-grow-sm" role="status">
  <span class="visually-hidden">Loading...</span>
   </div>
   Formatos
    </button>
    <ul class="dropdown-menu" style="">
      <li><h6 class="dropdown-header">Formatos Disponibles</h6></li>
     
      <li><a href="/downloadUrl/?id=${id}&tipo=video&formato=144p" class="dropdown-item" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
      <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg><strong>144p</strong></a></li>

      <li><a href="/downloadUrl/?id=${id}&tipo=video&formato=240p" class="dropdown-item" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
      <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg><strong>240p</strong></a></li>

      <li><a href="/downloadUrl/?id=${id}&tipo=video&formato=360p" class="dropdown-item" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
      <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg><strong>360p</strong></a></li>

      <li><a href="/downloadUrl/?id=${id}&tipo=video&formato=480p" class="dropdown-item" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
      <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg><strong>480p</strong></a></li>

      <li><a href="/downloadUrl/?id=${id}&tipo=video&formato=720p" class="dropdown-item" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
      <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg><strong>720p</strong></a></li>

      <li><a href="/downloadUrl/?id=${id}&tipo=video&formato=1080p" class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
      <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg><strong>1080p</strong></a></li>

      <li><hr class="dropdown-divider"></li>
      <li  ><a href="/downloadUrl/?id=${id}&tipo=audio&formato=mp4" class="dropdown-item"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
      <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
      </svg><strong>audio.mp4</strong></a>
      
      <a href="/downloadUrl/?id=${id}&tipo=audio&formato=mp3" class="dropdown-item"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
      <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
      </svg><strong>audio.mp3</strong></a>
      </li>
    </ul>
  </div>
  `)
  }, 1000);
}
/////////////////////////////////////////////////////////////////////////
function mostrarVideo(id, titulo){
   var urlVideoEs = `https://www.youtube.com/watch?v=${id}`
  console.log('id es :' +id +'y el titule es:'+ titulo )
  $("#descrip").html(`
  <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${id}" title="© 2022 M_R_B_Tools" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `); 
window.scroll({top: 100, /* left: 100, */ behavior: 'smooth'});
 }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
 function getAudioId(id){
  $("#descrip").html(`
  <video id="videoid" controls width="100%" height="100%" poster="./image/loading.gif" preload="none" name="media" source src="" type="video/mp4"></video>
 </audio>
`)
  $.post("/up", {bd: id}, function(resp){
    console.log(resp)
    for (var k in resp) {
      var url = resp[k]["url"];
      var mimeType = resp[k]["mimeType"];
      var tipo = mimeType.substr(0,9);
  if (tipo === 'audio/mp4'){
        console.log(tipo)
        $("#descrip").html(`
          <video id="videoid" controls autoplay="autoplay" width="100%" height="100%" poster="https://img.youtube.com/vi/${id}/3.jpg" preload="none" name="media" source src="${url}" type="audio/mp4"></video>
         </audio>
        `)
      }
    }
    window.scroll({top: 100, /* left: 100, */ behavior: 'smooth' });
  });
 }

 /* function getInfoVideoId(id, titulo){
  $("#iconoDescarga"+id).html("");
  $("#formatos"+id).html(`
<div class="spinner-border spinner-border-sm" role="status">
<span class="visually-hidden">Loading...</span>
</div>
Espere...
  `)
  $.post("/up", {bd: id}, function(resp){
    console.log(resp)
    $("#formatos"+id).html(`
    Escoja un formato
    <div class="spinner-grow spinner-grow-sm" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
   `);
      
     for (var k in resp) {
      var url = resp[k]["url"];
      var qualityLabel = resp[k]["qualityLabel"];
      var audioCodec = resp[k]["audioCodec"];
      var container = resp[k]["container"];
      var quality = resp[k]["quality"];
      var audioQuality = resp[k]["audioQuality"];
      var mimeType = resp[k]["mimeType"];
      var tipo = mimeType.substr(0,9);
 
      if (audioCodec !== null && qualityLabel !== null ) {
        $("#formatos"+id).append(`
        <a id="formatItems" class="dropdown-item" onclick="setFormatGET('${id}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
        <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
        </svg>
        <strong> ${tipo} </strong>
        <strong> ${quality}</strong>
        </a>
       `)
 
      } else if (tipo === 'audio/mp4'){
        //href="/downloadUrl/?id= ">
        $("#formatos"+id).append(`
        <a id="formatItems" class=""   href="/downloadUrl/?id=${id}&tipo=audio ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
        <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
        <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
        </svg>
        <strong> ${tipo} </strong>
        </a>
        `)
      }
     }
 });

 
} */

 /* function mostrarVideo2(id, titulo){
  descaYouTube(id);
 var urlVideoEs = `https://www.youtube.com/watch?v={id}`
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
        <h1 class="modal-title fs-5" id="staticBackdropLabel">{titulo}</h1>
              </div>
      <div id="modal-body" class="modal-body">
      <video id="videoid" controls width="100%" height="100%" poster="https://img.youtube.com/vi/{id}/3.jpg" preload="none" name="media" source src="" type="video/mp4"></video>
            
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
 } */
/*  function descaYouTube(id){
  console.log(id);
 $.post("/up", {bd: id}, function(resp){
   $("#btoDes").html(`
 <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
 <div class="btn-group" role="group">
   <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
     Formatos..
   </button>
   <ul id="format" class="dropdown-menu">
   </ul>
 </div>
</div>
    `) 

    for (var k in resp) {
     var fps = resp[k]["fps"];
     var url = resp[k]["url"];
     var qualityLabel = resp[k]["qualityLabel"];
     var audioCodec = resp[k]["audioCodec"];
     var container = resp[k]["container"];
     var short_view_count_text = resp[k]["short_view_count_text"];
     var title = resp[k]["title"];
     var quality = resp[k]["quality"];
     var audioQuality = resp[k]["audioQuality"];
     var mimeType = resp[k]["mimeType"];
     var tipo = mimeType.substr(0,9);

     if (audioCodec !== null && qualityLabel !== null ) {
       $("#format").append(`
       <li id="${audioCodec}">
       <a id="formatItems"
       class="dropdown-item"
       onclick="downloadDataUrlFromJavascript('${id}','${url}' )
       ">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
       <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
       </svg>
       <strong> ${tipo} </strong>
       <small class="text-muted">calidad:</small>
       <strong> ${quality}</strong>
       </a>
       </li>
   `)

     } else if (tipo === 'audio/mp4'){
        $("#format").append(`
       <li id="${audioCodec}">
       <a id="formatItems"
       class="dropdown-item"
       onclick="downloadDataUrlFromJavascript('${id}','${url}' )
       ">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
 <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
 <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
 <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
 </svg>
 <strong> ${tipo} </strong>
   </a></li>
 `)
  }
console.log(tipo)
    }
    if (audioCodec !== null && qualityLabel !== null ) {
     $("#modal-body").html(`
     <video 
     width="100%" height="100%" 
     poster="https://img.youtube.com/vi/${id}/3.jpg" 
     preload="none" 
     name="media" 
     controls 
     source
     src='${url}'; 
     type="video/mp4">
     Este es un elemento de video no soportado por tu navegador, prueba con otro...
     </video>
     `)
    }
});


}
 function downloadUrl2(url, titulo, type){
  $.get("/downloadUrl", {
    url: `${url}`,
    titulo: `${titulo}`,
    type: `${type}`
  }, function(respuesta){
    console.log("descargando");
  })
}
function downloadUrl(url, titulo, type){
  var objJSON = {
    url:`${url}`,
    titulo: `${titulo}`,
    type: `${type}`
   };

   var data = objJSON;
  $.ajax({
    url : '/downloadUrl',
    data : data,
    method : 'post', //en este caso
    dataType : 'json',
    success : function(response){
        alert("funciona bien");
    },
    error: function(error){
        alert("No funciona");
    }
  });
}
 */

/////////////////////////// fin  ///////////////////////////////////////
/*       
  $("#notifiContainer").html(`   
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="falce">
  <div class="toast-header">
    <img id="ico" src="./image/ico.ico" class="rounded me-2" alt="...">
    <strong class="me-auto">notificacion</strong>
    <small id="notifiHora">Hora:</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div id="textoContenido" class="toast-body">
  Cragando lista de formatos espere 
  <div class="spinner-grow text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
  </div>
</div> 
     `)
     const toastLiveExample = document.getElementById('liveToast')
     const toast = new bootstrap.Toast(toastLiveExample)
     const myToast = bootstrap.Toast.getInstance(toastLiveExample)
     var hoy = new Date();
     var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
     document.getElementById('notifiHora').innerHTML = fecha;
     toast.show()
    */



/* function downloadDataUrlFromJavascript(id, url) {
  $("#modal-body").html(`

  <video 
  width="100%" height="100%" 
  poster="https://img.youtube.com/vi/${id}/3.jpg" 
  preload="none" 
  name="media" 
  controls 
  source
  src='${url}'; 
  type="video/mp4">
  Este es un elemento de video no soportado por tu navegador, prueba con otro...
  </video>
          
  `)
 // DownloadFromUrl(url, 'mi.mp4')
 // console.log(url)
  //$.post("/downloadDataUrl", {data: url}, function(data){

  //});
} */

/* 
function DownloadFromUrl(fileURL, fileName) {
  console.log('intentando degargar atento')
  var link = document.createElement('a');
  link.href = fileURL;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}  
 */
 
/* document.addEventListener("DOMContentLoaded", */
/* function emmbeber() {
var div, n,
v = document.getElementsByClassName("youtube-player");
for (n = 0; n < v.length; n++) {
div = document.createElement("div");
div.setAttribute("data-id", v[n].dataset.id);
div.innerHTML = labnolThumb(v[n].dataset.id);
div.onclick = labnolIframe;
v[n].appendChild(div);
}
};

function labnolThumb(id) {
var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
play = '<div class="play"></div>';
return thumb.replace("ID", id) + play;
}

function labnolIframe() {
var iframe = document.createElement("iframe");
var embed = "https://www.youtube.com/embed/ID?autoplay=1";
iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
iframe.setAttribute("frameborder", "0");
iframe.setAttribute("allowfullscreen", "1");
this.parentNode.replaceChild(iframe, this);
}
 */










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