const { ipcRenderer } = require('electron');

var $ = {jquery} = require('jquery');


ipcRenderer.send('empiesa','hola');
let habitacion = 1;
let banio = 1;
let valoracion = 1;
let obj;
let contador;
let contadorb;
let contadorv;


ipcRenderer.on('resposta', (e, args) => {

obj = JSON.parse(args);
var resposta = $('#respuesta')           
resposta.empty();


    obj.data.forEach(element => {
   
    let nombre = $(`<div id="cuadrogrande"><div class="row"><div class="col-12 nombrecasa"><u>${element.nom}</u></div></div>`);
    let habitacions = $(`<div class="row">
    <div class="col-4 desc">Habitaciones: ${element.nhabitacions}</div>
    <div class="col-4 desc">Número de baños:${element.nbanys}</div>
    <div class="col-4 desc">Valoracion:${element.valoracio}</div>
    </div>`);
    let imagen = $(`<div class="row" id="contenedorImagen"><div class="col-12"><img src="../imagenes/casalarga.png" class="imagen"></div></div>`);    
    let value = $(`<div id="descripcion">Descripcio: ${element.descripcio}</div></div>`);
    //let contacto = $(`<div id="contacto">Contacte:email: ${element.propietari.email} numero: ${element.propietari.telefon}</div></div>`);
    resposta.append(nombre.append(habitacions,imagen,value));
    
}); 
    resposta.removeAttr('style')
});

function pillarvalorhabitacion(){
    habitacion = event.target.value;
    
    var resposta = $('#respuesta')           
    resposta.empty();
    obj.data.forEach(element => {
    if(element.nhabitacions == habitacion){
    contador = contador + 1;
    
    let nombre = $(`<div id="cuadrogrande"><div class="row"><div class="col-12 nombrecasa"><u>${element.nom}</u></div></div>`);
    let habitacions = $(`<div class="row">
    <div class="col-4 desc">Habitaciones: ${element.nhabitacions}</div>
    <div class="col-4 desc">Número de baños:${element.nbanys}</div>
    <div class="col-4 desc">Valoracion:${element.valoracio}</div></div>`);
    let imagen = $(`<div class="row" id="contenedorImagen"><div class="col-12"><img src="../imagenes/casalarga.png" class="imagen"></div></div>`);    
    let value = $(`<div id="descripcion">Descripcio: ${element.descripcio}</div></div>`);
    //let contacto = $(`<div id="contacto">Contacte:email: ${element.propietari.email} numero: ${element.propietari.telefon}</div></div>`);
    resposta.append(nombre.append(habitacions,imagen,value));
    }  
}); 
    if(contador == 0){
      resposta.append('<div id="notFound">No se han encontrado casas con ese filtro</div>')
    }
    contador = 0;
    resposta.removeAttr('style')
 }
 
 function pillarvalorbanios(){
    banios = event.target.value;
    
    var resposta = $('#respuesta')           
    resposta.empty();


    obj.data.forEach(element => {
    if(element.nbanys == banios){
    contadorb = contadorb + 1;
    let nombre = $(`<div id="cuadrogrande"><div class="row"><div class="col-12 nombrecasa"><u>${element.nom}</u></div></div>`);
    let habitacions = $(`<div class="row">
    <div class="col-4 desc">Habitaciones: ${element.nhabitacions}</div>
    <div class="col-4 desc">Número de baños:${element.nbanys}</div>

    <div class="col-4 desc">Valoracion:${element.valoracio}</div></div>`);
    let imagen = $(`<div class="row" id="contenedorImagen"><div class="col-12"><img src="../imagenes/casalarga.png" class="imagen"></div></div>`);    
    let value = $(`<div id="descripcion">Descripcio: ${element.descripcio}</div></div>`);
    //let contacto = $(`<div id="contacto">Contacte:email: ${element.propietari.email} numero: ${element.propietari.telefon}</div></div>`);
    resposta.append(nombre.append(habitacions,imagen,value));
    }  
}); 
if(contadorb == 0)
{
  resposta.append('<div id="notFound">No se han encontrado casas con ese filtro</div>')
}
    resposta.removeAttr('style')
  }
 
  function pillarvalorvaloracion(){
    valoracion = event.target.value;
   
    var resposta = $('#respuesta')           
    resposta.empty();


    obj.data.forEach(element => {
    if(element.valoracio >= valoracion){
    let nombre = $(`<div id="cuadrogrande"><div class="row"><div class="col-12 nombrecasa"><u>${element.nom}</u></div></div>`);
    let habitacions = $(`<div class="row">
    <div class="col-4 desc">Habitaciones: ${element.nhabitacions}</div>
    <div class="col-4 desc">Número de baños:${element.nbanys}</div>

    <div class="col-4 desc">Valoracion:${element.valoracio}</div></div>`);
    let imagen = $(`<div class="row" id="contenedorImagen"><div class="col-12"><img src="../imagenes/casalarga.png" class="imagen"></div></div>`);    
    let value = $(`<div id="descripcion">Descripcio: ${element.descripcio}</div></div>`);
    //let contacto = $(`<div id="contacto">Contacte:email: ${element.propietari.email} numero: ${element.propietari.telefon}</div></div>`);
    resposta.append(nombre.append(habitacions,imagen,value));
    }  
}); 
    resposta.removeAttr('style')
  }
 