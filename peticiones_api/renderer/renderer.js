const { ipcRenderer } = require('electron');

var $ = {jquery} = require('jquery');


ipcRenderer.send('empiesa','hola');
let habitacion = 1;
let banio = 1;
let valoracion = 1;


ipcRenderer.on('resposta', async (e, args) => {


const obj = JSON.parse(args);
var resposta = $('#respuesta')           
resposta.empty();


await obj.data.forEach(element => {
    if(element.nhabitacions == habitacion){
    let nombre = $(`<div id="cuadrogrande"><div class="row"><div class="col-12 nombrecasa">${element.nom}</div></div>`);
    let habitacions = $(`<div class="row"><div class="col-6 desc">Habitaciones: ${element.nhabitacions}</div>
    <div class="col-6 desc">Valoracion:${element.valoracio}</div></div>`);
    let imagen = $(`<div class="row"><div class="col-12"><img src="../imagenes/casalarga.png" class="imagen"></div></div>`);    
    let value = $(`<div id="descripcion">Descripcio: ${element.descripcio}</div></div>`);
    //let contacto = $(`<div id="contacto">Contacte:email: ${element.propietari.email} numero: ${element.propietari.telefon}</div></div>`);
    resposta.append(nombre.append(habitacions,imagen,value));
    }  
}); 
    resposta.removeAttr('style')
});

function pillarvalorhabitacion(){
    habitacion = event.target.value;
    ipcRenderer.send('empiesa','hola');
 }
 
 function pillarvalorbanios(){
    banios = event.target.value;
    ipcRenderer.send('empiesa','hola');
  }
 
  function pillarvalorvaloracion(){
    valoracion = event.target.value;
    ipcRenderer.send('empiesa','hola');
  }
 