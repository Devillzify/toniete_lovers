const { ipcRenderer } = require('electron');
var $ = { jquery } = require('jquery');
const Swal = require('sweetalert2')

boton.addEventListener('click', () => {
    console.log("recibiendo click");
   var casa = {
    "nom": document.getElementById("nombreAlojamiento").value || obj.nom,
    "descripcio": document.getElementById("descripcion").value || obj.descripcio,
    "nregistre": document.getElementById("numeroRegistro").value || obj.nregistre,
    "npersones": document.getElementById("nPersonas").value || obj.npersones,
    "nbanys": document.getElementById("nBanos").value || obj.nbanys,
    "nllits": document.getElementById("nCamas").value || obj.nllits,
    "nhabitacions": document.getElementById("nHabitaciones").value || obj.nhabitacions,
    "carrer": document.getElementById("calle").value || obj.carrer,
    "numero": document.getElementById("numero").value || obj.numero,
    "pisporta": document.getElementById("piso").value || obj.pisporta,
    "municipi_id": document.getElementById("idMunicipio").value || obj.municipi_id,
    "tipus_allotjament_id": document.getElementById("tipoAlojamiento").value || obj.tipus_allotjament_id,
    "tipus_vacances_id": document.getElementById("tipoVacaciones").value || obj.tipus_vacances_id,
    "propietari_id": document.getElementById("propietarioID").value || obj.propietari_id,
    "categoria_id": document.getElementById("categoriaID").value || obj.categoria_id,
    "longitud": document.getElementById("longitud").value || obj.longitud,
    "latitud": document.getElementById("latitud").value || obj.latitud,
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