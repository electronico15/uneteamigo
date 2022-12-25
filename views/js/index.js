$('body').hide();
$('html').append(`
<div class="position-absolute top-50 start-50">
<div id="spinnerPreload" class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>
`);
cookieActiva = getCookie('cookieActiva');
 if (cookieActiva === null || cookieActiva === "undefined" ){
  $("body").append(`
  <div id="cookiesdirective" style="bottom: 0px;">
  <div style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgb(0, 0, 0); opacity: 0.66; z-index: 9999;">
  </div>
  <div style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; z-index: 10000">
  <div class="cookie-wrapper" style="font-family: sans-serif;position: relative; width: 100%; max-width: 500px; margin-right: auto; margin-left: auto; padding: 1rem; text-align: center; border-radius: .3rem; box-shadow: 0 10px 40px 0 rgba(0,0,0,0.2); color:#424a4d; background:rgb(234, 239, 241);">
  <div class="mbr-text">
  <p class="display-7 accept-text">Usamos cookies para darte la mejor experiencia. para mas detalles Lea nuestro <a style="color: #424a4d; text-decoration: underline;" href="politicadecookies.html">
política de cookies</a> .</p>
</div>
<div class="mbr-section-btn">
<a class="btn btn-sm btn-primary" style="margin:0; background-color:#6592e6!important;color:#FFFFFF!important" id="impliedsubmit" onclick="closeDivcookie();">Aceptar y cerrar</a>
</div></div></div></div>
  `)
  function closeDivcookie(){
    $('#cookiesdirective').hide();
    setCookie('cookieActiva','acectada','30');
  }
 }

  $(document).ready(function (){
    var ahora = new Date();
    setTimeout(() => {
      $('body').show();
      $("#spinnerPreload").hide();
    }, 2000);
    ir()
  uPagina();
   });

  function ir(){
    var hash = window.location.hash;
    var ir = hash.slice(1);
        if (ir){
      if (ir === 'YouTubeDownload' ) {
         console.log("rediriguiendo "+ir)
         loadPage(ir+".html")
        } else if(ir === 'shop' ) {
          loadPage(ir+".html")
        }else if(ir === 'PolíticadePrivacidad' ) {
          loadPage(ir+".html")
        }
     } 
  }
  
 ///////////////// Ultima pagina ////////////////////////////
    function uPagina(p){
        var uPagina = getCookie("uPagina")
        if (p){
            setCookie('uPagina',p,'30');
            return
            }  
      if (uPagina === null || uPagina === "undefined" ){
      setCookie('uPagina','YouTubeDownload.html','30');
      location.reload();
      } else{
      loadPage(uPagina);
      }
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
      $("#status").html(`
    <div class="spinner-border text-secondary spinner-border-sm" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`)
        if (page){
console.log(page)
          $.ajax({
            url: page,
            success: function (response) {
                $("#contenido").html(response);
                uPagina(page)
                $('#closeMenu').trigger('click');
                setTimeout(() => { $("#status").html(''); }, 1000);
                 //return
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
                $("#contenido").html("😢lo sentimos no pudimos cargar "+page+" por "+msg+".<br>Cargue de nuevo la pagina si el problema persiste diríjase la pagina de soporte <br> ,para resibir asistencia en línea.<br>Gracias por su comprensión" );

                //return
            },
        });
          
        } else {
          
        $.ajax({
          url: "default.html",
          success: function (response) {
              $("#contenido").html(response.responseText);
              //uPagina("default.html")
              //$('#closeMenu').trigger('click');
              setTimeout(() => { $("#status").html(''); }, 1000);
             
               
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
              $("#contenido").html('inicio no etsa disponible por '+msg);
              setTimeout(() => { $("#status").html(''); }, 1000);
          },
      });


        }





        /*  $.get("default.html", function(setPage){
            $("#contenido").html(setPage);
            //uPagina('default.html')
                 }); */
              }
        
////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////
 /*  <div class="offcanvas-body">

                
  <p>personalizar tus 🔍 búsquedas para mejores resultados</p>

 
  <div class="dropdown mt-3 ">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      Cantidad de videos a mostrar <label for="">10</label>
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">5</a></li>
      <li><a class="dropdown-item" href="#">10</a></li>
      <li><a class="dropdown-item" href="#">15</a></li>
      <li><a class="dropdown-item" href="#">20</a></li>
      <li><a class="dropdown-item" href="#">25</a></li>
      <li><a class="dropdown-item" href="#">30</a></li>
      <li><a class="dropdown-item" href="#">40</a></li>
      <li><a class="dropdown-item" href="#">50</a></li>
    </ul>
  </div>

  <div class="dropdown mt-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      Region preferida de resultados
      <label for="">cu</label>
    </button>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">us</a></li>
      <li><a class="dropdown-item" href="#">es</a></li>
      <li><a class="dropdown-item" href="#">er</a></li>
      <li><a class="dropdown-item" href="#">20</a></li>
      <li><a class="dropdown-item" href="#">25</a></li>
      <li><a class="dropdown-item" href="#">30</a></li>
      <li><a class="dropdown-item" href="#">40</a></li>
      <li><a class="dropdown-item" href="#">50</a></li>
      
    </ul>
  </div>

  <div class="dropdown mt-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      Tipos de videos
      <label for="">cu</label>
    </button>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">us</a></li>
      <li><a class="dropdown-item" href="#">es</a></li>
      <li><a class="dropdown-item" href="#">er</a></li>
      <li><a class="dropdown-item" href="#">20</a></li>
      <li><a class="dropdown-item" href="#">25</a></li>
      <li><a class="dropdown-item" href="#">30</a></li>
      <li><a class="dropdown-item" href="#">40</a></li>
      <li><a class="dropdown-item" href="#">50</a></li>
      
    </ul>
  </div>

  <div class="dropdown mt-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
      Oredenar por
      <label for="">cu</label>
    </button>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">us</a></li>
      <li><a class="dropdown-item" href="#">es</a></li>
      <li><a class="dropdown-item" href="#">er</a></li>
      <li><a class="dropdown-item" href="#">20</a></li>
      <li><a class="dropdown-item" href="#">25</a></li>
      <li><a class="dropdown-item" href="#">30</a></li>
      <li><a class="dropdown-item" href="#">40</a></li>
      <li><a class="dropdown-item" href="#">50</a></li>
      
    </ul>
  </div>

  <div class="dropdown mt-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
     Idioma preferido
      <i>Español</i>
    </button>
    
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">us</a></li>
      <li><a class="dropdown-item" href="#">es</a></li>
      <li><a class="dropdown-item" href="#">er</a></li>
      <li><a class="dropdown-item" href="#">20</a></li>
      <li><a class="dropdown-item" href="#">25</a></li>
      <li><a class="dropdown-item" href="#">30</a></li>
      <li><a class="dropdown-item" href="#">40</a></li>
      <li><a class="dropdown-item" href="#">50</a></li>
      
    </ul>
  </div>

</div> 

   <div class="offcanvas offcanvas-start text-bg-dark" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
          <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Menu principal</p>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <p>Try scrolling the rest of the page to see this option in action.</p>
          </div>
        </div>

           
             <div class="offcanvas offcanvas-start text-bg-dark" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions2" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div class="offcanvas-header">
                <p class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Filtros de YouTube</p>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              
                      
                
              </div>
*/
