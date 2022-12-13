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
