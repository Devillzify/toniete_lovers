const { ipcRenderer, webContents } = require("electron");
var $ = { jquery } = require('jquery');
let obj;
ipcRenderer.send('update', 'hola');

ipcRenderer.on('updateListo', (e, args) => {
    obj = JSON.parse(args).data;
    var formulario = $('.center-form')
    formulario.empty();
    let fila1 = $(`
<form>
<div class="form-row">
    <div class="form-group col-md-6">
        <label for="inputEmail4">Nombre alojamiento:</label>
        <input type="text" class="form-control" id="nombreAlojamiento" placeholder="${obj.nom}">
    </div>
    <div class="form-group col-md-6">
    <label for="inputPassword4">Calle:</label>
    <input type="text" class="form-control" id="calle" placeholder="${obj.carrer}">
    </div>
</div>`);
    let fila2 = $(`<div class="form-row" >
    <div class="form-group col-md-4">
        <label for="inputAddress">Numero de registro</label>
        <input type="text" class="form-control" id="numeroRegistro" placeholder="${obj.nregistre}">
    </div>
    <div class="form-group col-md-4">
        <label for="inputAddress2">Latitud: </label>
        <input type="text" class="form-control" id="latitud"
            placeholder="${obj.latitud}">
    </div>
    <div class="form-group col-md-4">
        <label for="inputCity">Longitud:</label>
        <input type="text" class="form-control" id="longitud" placeholder="${obj.longitud}">
    </div></div>`)
    let fila3 = $(`<div class="form-row ">
    <div class="form-group col-md-4">
        <label for="inputAddress">Numero </label>
        <input type="text" class="form-control" id="numero" placeholder=${obj.numero}>
    </div>
    <div class="form-group col-md-4">
        <label for="inputAddress2">Piso</label>
        <input type="text" class="form-control" id="piso"
            placeholder="${obj.pisporta}">
    </div>
    <div class="form-group col-md-4">
        <label for="inputCity">ID Municipio</label>
        <input type="text" class="form-control" id="idMunicipio" placeholder="${obj.municipi_id}">
    </div> </div>`)
    let fila4 = $(`<div class="form-row ">
<div class="form-group col-md-3">
    <label for="inputAddress">Personas:</label>
    <select class="form-control" id="nPersonas" selected="${obj.npersones}">
        <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option>
    </select>
</div>
<div class="form-group col-md-3">
    <label for="inputAddress2">Baños:</label>
    <select class="form-control" id="nBanos" selected="${obj.nbanys}">
        <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option>
    </select>
</div>
<div class="form-group col-md-3">
<label for="inputCity">Habitaciones:</label>
<select class="form-control" id="nHabitaciones" selected="${obj.nhabitacions}">
    <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option>
</select>
</div>
<div class="form-group col-md-3">
<label for="inputState">Camas</label>
<select class="form-control" id="nCamas" selected="${obj.nllits}">
    <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option>
</select>
</div> </div>`)
    let fila5 = $( `<div class="form-row ">
    <div class="form-group col-md-3">
        <label for="inputAddress">T. Alojamiento:</label>
        <input type="text" class="form-control" id="tipoAlojamiento" placeholder="${obj.tipus_allotjament_id}">
    </div>
    <div class="form-group col-md-3">
        <label for="inputAddress2">T. vacaciones:</label>
        <input type="text" class="form-control" id="tipoVacaciones" placeholder="${obj.tipus_vacances_id}">
    </div>
    <div class="form-group col-md-3">
        <label for="inputCity" readonly>ID Propietario:</label>
        <input type="text" class="form-control" id="propietarioID" placeholder="${obj.propietari_id}"  >
    </div>
    <div class="form-group col-md-3">
        <label for="inputState">Categoria:</label>
        <select id="categoriaID" class="form-control" selected="${obj.categoria_id}">
            <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option>
        </select>
    </div> </div>`)
    let fila6 = $(`<div class="form-row">
    <div class="form-group col-md-9">
        <label for="exampleFormControlTextarea1">Descripcion:</label>
        <textarea class="form-control" id="descripcion" rows="2" placeholder="${obj.descripcio}"></textarea>
    </div>

    <div class="form-group col-md-3">
        <button type="submit" class="btn btn-primary" onclick="llamarCasa()">Sign in</button>
    </div>
</div> </form> </div>`)
    formulario.append(fila1, fila2, fila3, fila4, fila5, fila6)
})

function llamarCasa()
{
    console.log("recibiendo click");
    var casa = {
    "nom": document.getElementById("nombreAlojamiento").value,
    "descripcio":document.getElementById("descripcion").value,
    "nregistre": document.getElementById("numeroRegistro").value,
    "npersones": document.getElementById("nPersonas").value,
    "nbanys": document.getElementById("nBanos").value,
    "nllits": document.getElementById("nCamas").value,
    "nhabitacions": document.getElementById("nHabitaciones").value,
    "carrer": document.getElementById("calle").value,
    "numero": document.getElementById("numero").value,
    "pisporta": document.getElementById("piso").value,
    "municipi_id":document.getElementById("idMunicipio").value,
    "tipus_allotjament_id": document.getElementById("tipoAlojamiento").value,
    "tipus_vacances_id": document.getElementById("tipoVacaciones").value,
    "propietari_id": document.getElementById("propietarioID").value,
    "categoria_id": document.getElementById("categoriaID").value,
    "longitud": document.getElementById("longitud").value,
    "latitud": document.getElementById("latitud").value,
  };
  console.log(casa)
  ipcRenderer.send('casaUpdate',casa);
}

  







