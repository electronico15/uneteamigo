function msgNotifi(toastTrigger){
   $("#notifiContainer").html(`   
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img id="ico" src="./image/ico.ico" class="rounded me-2" alt="...">
    <strong class="me-auto">notificacion</strong>
    <small id="notifiHora">Hora:</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div id="textoContenido" class="toast-body">
   Esto es una notificacion de prueva 
  </div>
</div> 
     `)
  
   const toastLiveExample = document.getElementById('liveToast')
   const toast = new bootstrap.Toast(toastLiveExample)
   const myToast = bootstrap.Toast.getInstance(toastLiveExample)
   var hoy = new Date();
   var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()

   if (toastTrigger) {
    document.getElementById('textoContenido').innerHTML = toastTrigger;
    document.getElementById('notifiHora').innerHTML = fecha;
    myToast.show()
 
  } 
  document.getElementById('notifiHora').innerHTML = fecha;
  toast.show()
}