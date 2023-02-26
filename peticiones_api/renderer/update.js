const { ipcRenderer, webContents } = require("electron");
let obj;
ipcRenderer.send('update','hola');

ipcRenderer.on('updateListo', (e, args) => {
    obj = JSON.parse(args);
    console.log(obj)
})