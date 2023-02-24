const { ipcRenderer } = require('electron');

var email = document.querySelector('#email');
var password = document.querySelector('#password');
const boton = document.querySelector('#button')

boton.addEventListener('click', () => {
  var lista = [email.value, password.value]
  ipcRenderer.send('enviarLogin', {
    "email": email.value, 
    "password": password.value
  });
})
