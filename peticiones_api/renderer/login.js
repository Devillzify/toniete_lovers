const { ipcRenderer } = require('electron');
const Swal = require('sweetalert2')

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

ipcRenderer.on('nologeado',(e,args)=>{
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'Contraseña o email incorrectos',
    showConfirmButton: false,
    timer: 1500,
    position: 'center'
  })
});
