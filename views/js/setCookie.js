$(document).ready(function (){
 // var ahora = new Date();
  //var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
setCantidadResultados();
setapiKei();
setAbuscar();
setRegionCode();
setordenResult();
settypeRecursoResul();
setvideoDuration();
setLanguageResult();
});



/////////////////////////// setCookie ///////////////////////////////////
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
  }
  function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  }
  function eraseCookie(key) {
    var keyValue = getCookie(key);
    setCookie(key, keyValue, '-1');
  }
////////////// optemer id //////////////////////////////////

  function setId(){
      if (cookieId === null || cookieId === "undefined" ){
    console.log("1 es \n"+cookieId)
       $.getJSON('./get_id', function(data) {
      setCookie('id',data,'30');
      crearNecBd();
      location.reload();
     }) 
    }
  }
  ////////////// optemer ip /////////////////////////////////////////////////////////
  function setIp(){
    const cookieIp = getCookie('ip');
      if (cookieIp === null || cookieIp === "undefined" ){
    console.log("1 es \n"+cookieIp)
       $.getJSON('./get_ip', function(data) {
      setCookie('ip',data,'30');
      location.reload();
     }) 
    }
  }

  ////////////// setCantidadResultados ///////////////////////
function setCantidadResultados(ct){
  var cookeCantiVideos = getCookie('CantiVideos');
  if(ct){
          setCookie('CantiVideos',ct,'30');
          var cookeCantiVideos = getCookie('CantiVideos');
          location.reload();
  } else {
    if (cookeCantiVideos === null || cookeCantiVideos === "undefined"){
           setCookie('CantiVideos','50','30')
           var cookeCantiVideos = getCookie('CantiVideos');
  } else {
          var cookeCantiVideos = getCookie('CantiVideos');
         }
      }
    }
    ////////////// setRegionCode ///////////////////////
function setRegionCode(ct){
  var cookeRegionCode = getCookie('RegionCode');
  if(ct){
          setCookie('RegionCode',ct,'30');
          var cookeRegionCode = getCookie('RegionCode');
          location.reload();
  } else {
    if (cookeRegionCode === null || cookeRegionCode === "undefined"){
           setCookie('RegionCode','ES','30')
           var cookeRegionCode = getCookie('RegionCode');
  } else {
          var cookeRegionCode = getCookie('RegionCode');
         }
      }
    }
     ////////////// setordenResult ///////////////////////
function setordenResult(ct){
  var cookeordenResult = getCookie('ordenResult');
  if(ct){
          setCookie('ordenResult',ct,'30');
          var cookeordenResult = getCookie('ordenResult');
          location.reload();
  } else {
    if (cookeordenResult === null || cookeordenResult === "undefined"){
           setCookie('ordenResult','rating','30')
           var cookeordenResult = getCookie('ordenResult');
  } else {
          var cookeordenResult = getCookie('ordenResult');
         }
      }
    }
    ////////////// settypeRecursoResul ///////////////////////
function settypeRecursoResul(ct){
  var cooketypeRecursoResul = getCookie('typeRecursoResul');
  if(ct){
          setCookie('typeRecursoResul',ct,'30');
          var cooketypeRecursoResul = getCookie('typeRecursoResul');
          location.reload();
  } else {
    if (cooketypeRecursoResul === null || cooketypeRecursoResul === "undefined"){
           setCookie('typeRecursoResul','video','30')
           var cooketypeRecursoResul = getCookie('typeRecursoResul');
  } else {
          var cooketypeRecursoResul = getCookie('typeRecursoResul');
         }
      }
    }
    ////////////// settypeRecursoResul ///////////////////////
function setvideoDuration(ct){
  var cookevideoDuration = getCookie('videoDuration');
  if(ct){
          setCookie('videoDuration',ct,'30');
          var cookevideoDuration = getCookie('videoDuration');
          location.reload();
  } else {
    if (cookevideoDuration === null || cookevideoDuration === "undefined"){
           setCookie('videoDuration','any','30')
           var cookevideoDuration = getCookie('videoDuration');
  } else {
          var cookevideoDuration = getCookie('videoDuration');
         }
      }
    }
///////////////////////////////////set apiKei/////////////////////////////
function setapiKei(ct){
  var cookieApiKei = getCookie('apiKei');
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
///////////////////////////////////////////////////////////////////
function setLanguageResult(ct){
 var cookieLanguageResult = getCookie('LanguageResult');
     if(ct){
           setCookie('LanguageResult',ct,'30');
           var  cookieLanguageResult = getCookie('LanguageResult');
           location.reload();
   } else {
     if (cookieLanguageResult === null || cookieLanguageResult === "undefined"){
           setCookie('LanguageResult',"es",'30');
           var cookieLanguageResult = getCookie('LanguageResult');
   } 
   }
  }