/* comprovar si las api estan bloquiadas */

$(document).ready(function (){

});
//const YOUTUBE_API_KEY = YOUTUBE_API_KEY_1;
const apikey =[]

  $.getJSON( "./priv/data.json", function(json){  
    var datos = json.YOUTUBE_API_KEY;        
    
    for(i in datos)
    { 
       
      
        
        const apikey = datos[i].YOUTUBE_API_KEY_1;
        var urlTstApi = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&q=casa`;
        console.log("la api actaules \n "+apikey)

        $.getJSON(urlTstApi, async function(dataYoubtube, status, xhr){
            console.log("la api \n"+YOUTUBE_API_KEY+"\nesta lista para usarce")
        }).fail(function(jqXHR) {
            console.log("esto es una apiiiiiiiiii"+datos[i].YOUTUBE_API_KEY_2)
             // console.log(datos[i].YOUTUBE_API_KEY_2)
               if (jqXHR.status == 403) {
             //   console.log("la api "+apikey+"\n esta bloqueda");
                let apinec = datos[i].YOUTUBE_API_KEY_2;
                const urlTstApi = `https://www.googleapis.com/youtube/v3/search?key=${apinec}&type=video&part=snippet&q=casa`;
                console.log("la api se actualiso a \n"+apinec);
            } 
        });
       

        $.getJSON(urlTstApi, async function(dataYoubtube, status, xhr){
            console.log("la api \n"+YOUTUBE_API_KEY+"\nesta lista para usarce")
        }).fail(function(jqXHR) {
            //console.log(datos[i].YOUTUBE_API_KEY_2)
             if (jqXHR.status == 403) {
            //  console.log("la api \n"+apikey+"\nesta bloqueda");
            var apinec = datos[i].YOUTUBE_API_KEY_3;
            const urlTstApi = `https://www.googleapis.com/youtube/v3/search?key=${apinec}&type=video&part=snippet&q=casa`;
              console.log("la api se actualiso a \n"+apinec);
          } 
      });


      $.getJSON(urlTstApi, async function(data, status, xhr){
        console.log("la api \n"+YOUTUBE_API_KEY+"\nesta lista para usarce")
    }).fail(function(jqXHR) {
        //console.log(datos[i].YOUTUBE_API_KEY_2)
         if (jqXHR.status == 403) {
          console.log("nos quedamos sin apy");
          
      } 
  });

      

/* 
fin del for */
    }

   /*    if (status  == 403) {
                console.log("la api \n"+apikey+"\nesta bloqueda");
                const apikey = datos[i].YOUTUBE_API_KEY_2;
                const urlTstApi = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&q=casa`;
            } */
           





/* fin */
});    














/* 


$(document).ready(function ()
{
  $.getJSON( "./priv/data.json", function( json ){  
    
    var datos = json.YOUTUBE_API_KEY;        
    for(i in datos)
    { 
const apikey = datos[i].YOUTUBE_API_KEY_1;

        const urlTstApi = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&q=casa`;

        $.getJSON(urlTstApi).fail(function(error) {
       
        if (error.status == 403) {
            console.log("la api \n"+apikey+"\nesta bloqueda");
            const apikey = datos[i].YOUTUBE_API_KEY_2;
            const urlTstApi = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&q=casa`;
        }

            $.getJSON(urlTstApi).fail(function(error) {
            if (error.status == 403) {
                console.log("la api \n"+apikey+"\nesta bloqueda");
                const apikey = datos[i].YOUTUBE_API_KEY_3;
                const urlTstApi = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&q=casa`;
            

            
                console.log("hay un herror del tipo "+error.status)
            }
        
        });


     

    }

}
    
    
    
    //comprovarEstadoApi(json);
  
  });
});    






 */












/* function comprovarEstadoApi(dta){
    var datos = dta.YOUTUBE_API_KEY;        
    for(i in datos)
    {   
    const resYOUTUBE_API_KEY_1 = datos[i].YOUTUBE_API_KEY_1
    const resYOUTUBE_API_KEY_2 = datos[i].YOUTUBE_API_KEY_2
    const resYOUTUBE_API_KEY_3 = datos[i].YOUTUBE_API_KEY_3
   // console.log("estos spon los datos "+datos[i])  

   




    }   
    
    
   


    $.getJSON(urlTstApi, function(data) {
        console.log("la api \n"+YOUTUBE_API_KEY+"\nesta lista para usarce")
    
    }).fail(function(error) {
        if (error.status == 403) {
            console.log("la api \n"+YOUTUBE_API_KEY+"\nesta bloqueda");
    const YOUTUBE_API_KEY = YOUTUBE_API_KEY_2
        } else {
            console.log("hay un herror del tipo "+error)
        }
    });

}
 */
