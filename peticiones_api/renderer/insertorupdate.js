const { ipcRenderer } = require('electron');

var boton = document.getElementById('boton');

boton.addEventListener('click', () => {
    console.log("recibiendo click");
   var alojamiento = document.getElementById("nombreAlojamiento");
   var calle = document.getElementById("calle");
   var numeroRegistro = document.getElementById("numeroRegistro");
   var latitud = document.getElementById("latitud");
   var longitud = document.getElementById("longitud");
   var numero = document.getElementById("numero");
   var piso = document.getElementById("piso");
   var idMunicipio = document.getElementById("idMunicipio");
   var nPersonas = document.getElementById("nPersonas");
   var nBanos = document.getElementById("nBanos");
   var nHabitaciones = document.getElementById("nHabitaciones");
   var nCamas = document.getElementById("nCamas");
   var tipoAlojamiento = document.getElementById("tipoAlojamiento");
   var tipoVacaciones = document.getElementById("tipoVacaciones");
   var propietario_id = document.getElementById("propietarioID");
   var categoria_id = document.getElementById("categoriaID");
   var descripcion = document.getElementById("descripcion");
   
   var casa = {
    "nom": alojamiento.value,
    "descripcio": descripcion.value,
    "nregistre": numeroRegistro.value,
    "npersones": nPersonas.value,
    "nbanys": nBanos.value,
    "nllits": nCamas.value,
    "nhabitacions": nHabitaciones.value,
    "carrer": calle.value,
    "numero": numero.value,
    "pisporta": piso.value,
    "municipi_id": idMunicipio.value,
    "tipus_allotjament_id": tipoAlojamiento.value,
    "tipus_vacances_id": tipoVacaciones.value,
    "propietari_id": propietario_id.value,
    "categoria_id": categoria_id.value,
    "longitud": longitud.value,
    "latitud": latitud.value,
  };

  ipcRenderer.send('casaInsert',casa)
  })