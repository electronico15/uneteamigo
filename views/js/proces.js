

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

//setCookie('mario','pro','30');

const YOUTUBE_API_KEY_1 = "AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA";
const YOUTUBE_API_KEY_2 = "AIzaSyArU3n3mNc5LSaUX8Iu-l2hRsbzi4gG20I";
const YOUTUBE_API_KEY_3 = "AIzaSyDQkyAsw6ScH5OvlLUCpSuKurQDcPUegro";

//var cookieAPI;
var cookieAPI = getCookie('YOUTUBE_API_KEY');
var cookieUrlTest = getCookie('urlTest');
//setCookie('YOUTUBE_API_KEY','AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA','30');
//$.cookie("YOUTUBE_API_KEY", AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA, { expires : 30 });
//setCookie('YOUTUBE_API_KEY','AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA','30'); //(key,value,expiry in days)
console.log(cookieAPI)

 function comprovarQookie(){
    if (cookieAPI !== "null"){
        setCookie('YOUTUBE_API_KEY','AIzaSyC62n3tLAPVBaLZZn_cHMvycIA9pwPAnCA','30');
     } 
     if (cookieUrlTest !== "null"){
      // var cd= `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
       // &fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`

     //  https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${cookieAPI}
       // &fields=items(id)&part=snippet,statistics`
      // https://www.googleapis.com/youtube/v3/search?key=${cookieAPI}&type=video&part=snippet&q=casa
       var urlTst = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${cookieAPI} &fields=items(id)&part=snippet,statistics`;
       setCookie('urlTest',urlTst,'30');
     }
     //var cookieUrlTest = getCookie('url');
    console.log(cookieUrlTest);
     $.getJSON(cookieUrlTest, async function(dataYoubtube, status, xhr){
        console.log(dataYoubtube);
    }).fail(function(jqXHR) {
       console.log('fallo con codigo'+jqXHR.status);
    });
    
}

