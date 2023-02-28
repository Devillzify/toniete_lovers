const { ipcRenderer } = require('electron');
var $ = { jquery } = require('jquery');

var boton = $('boton');

boton.addEventListener('click', () => {
    console.log("recibiendo click");
   var casa = {
    "nom": $("#nombreAlojamiento").value,
    "descripcio": $("#descripcion").value,
    "nregistre": $("#numeroRegistro").value,
    "npersones": $("#nPersonas").value,
    "nbanys": $("#nBanos").value,
    "nllits": $("#nCamas").value,
    "nhabitacions": $("#nHabitaciones").value,
    "carrer": $("#calle").value,
    "numero": $("#numero").value,
    "pisporta": $("#piso").value,
    "municipi_id": $("#idMunicipio").value,
    "tipus_allotjament_id": $("#tipoAlojamiento").value,
    "tipus_vacances_id": $("#tipoVacaciones").value,
    "propietari_id": $("#propietarioID").value,
    "categoria_id": $("#categoriaID").value,
    "longitud": $("#longitud").value,
    "latitud": $("#latitud").value,
  };
  ipcRenderer.send('casaInsert',casa)
  })