const { ipcRenderer } = require('electron');

function info()
{
   var usuario = document.getElementById("validationCustom01");
   var password = document.getElementById("validationCustom02");
   console.log(usuario.value);
   console.log(password.value);
   ipcRenderer.send("login", {
    "user" : usuario.value,
    "password" : password.value
   });
}