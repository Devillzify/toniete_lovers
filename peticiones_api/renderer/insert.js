const { ipcRenderer } = require('electron');
var $ = { jquery } = require('jquery');
const Swal = require('sweetalert2')

boton.addEventListener('click', () => {
    console.log("recibiendo click");
   var casa = {
    "nom": document.getElementById("nombreAlojamiento").value ,
    "descripcio": document.getElementById("descripcion").value ,
    "nregistre": document.getElementById("numeroRegistro").value  ,
    "npersones": document.getElementById("nPersonas").value ,
    "nbanys": document.getElementById("nBanos").value ,
    "nllits": document.getElementById("nCamas").value ,
    "nhabitacions": document.getElementById("nHabitaciones").value ,
    "carrer": document.getElementById("calle").value ,
    "numero": document.getElementById("numero").value ,
    "pisporta": document.getElementById("piso").value ,
    "municipi_id": document.getElementById("idMunicipio").value ,
    "tipus_allotjament_id": document.getElementById("tipoAlojamiento").value ,
    "tipus_vacances_id": document.getElementById("tipoVacaciones").value ,
    "propietari_id": document.getElementById("propietarioID").value ,
    "categoria_id": document.getElementById("categoriaID").value,
    "longitud": document.getElementById("longitud").value,
    "latitud": document.getElementById("latitud").value,
  };
  ipcRenderer.send('casaInsert',casa)
  })

  ipcRenderer.on('salio', (e,args) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha insertado correctamente',
      showConfirmButton: false,
      timer: 1500,
      position: 'center'
    })
  }); 