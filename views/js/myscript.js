//alert('ok')
function buscarVideos(valInput){
   // var telefono = $("#tel").val();
    //var correo = $("#emailinput").val();
   // var titulo =  $("#titulo").html();
    /* 
       $.ajax({
              type: 'POST',
              url: 'http://localhost/buscarVideo',
              data: 
              {
                'aBuscar' :valInput
                
              },
              datatype: 'JSON',
              success: function(data){
                  $('#infoproceso').html(data);
              },
              error: function(data){
                  $('#infoproceso').html(data);
              },
          });
          */
         console.log(idInput.value)
          //document.getElementById("infoproceso").innerHTML = `${idInput.value}`;
          //document.write('Ancho de la pantalla: '+screen.width+' pixeles');


var http = new XMLHttpRequest();
var url = 'http://localhost/buscarVideo';
var params = 'aBuscar=aBuscar&name=binny';

$.ajax({
    type: 'GET',
    url: 'http://localhost/buscarVideo',
    data: 
    {
      'aBuscar' :valInput
      
    },
    datatype: 'JSON',
    success: function(data){
        $('#infoproceso').html(JSON.stringify(data));
        console.log(JSON.stringify(data));
    },
    error: function(data){
        $('#infoproceso').html(data);
    },
});

    }
    