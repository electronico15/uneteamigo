
  $(document).ready(function (){
    var ahora = new Date();
  //var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
  //setId();
  //setIp();
  uPagina();
  //crearNecBd();
    
  });
 ///////////////// Ultima pagina ////////////////////////////
    function uPagina(p){
        var uPagina = getCookie("uPagina")
        if (p){
            setCookie('uPagina',p,'30');
            return
        } 
       
                
    if (uPagina === null || uPagina === "undefined" ){
        con("1")
       setCookie('uPagina','default.html','30');
      location.reload();
      } else{
        con("2")
        loadPage(uPagina);
      }
    
     // loadPage(uPagina)
    }
////////////////////////// test ////////////////////////
function test(d){
    if (d){
      alert(d);
  } else{
    alert('test')
  }
  }
  function con(d){
    if (d){
      console.log(d);
    }else{
      console.info('esto es una test')
    }
  }
/////////////// cargar la ultima pagina visitada ////////////////////
    function loadPage(page){
        if (page){
                $.get(page, function(setPage){
                $("#contenido").html(setPage);
               uPagina(page)
             });
             return
        }
         $.get("default.html", function(setPage){
            $("#contenido").html(setPage);
            //uPagina('default.html')
                 });
               
        }
        

function crearNecBd(){
    let data = {
      "users":[{
          "id": cookieId,
          "ip": cookieIp,
          "apikey": cookieApiKei,
          "name": "null",
          "region": "cu",
          
          "cantiVideos": cookeCantiVideos,
          "ultimaBusqueda": cookieAbuscar,
          "ultimaFecha": cookieultimaFecha
          }
        ]
      }
     
        $.post("/crearbd", {bd: data,}, function(htmlexterno){
    //console.log(htmlexterno);
  
  });
  
  }

  function crearOffcamba(){
    $("#offcamba").html(`
  


    `)
  }
  