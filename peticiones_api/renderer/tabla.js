const { ipcRenderer } = require('electron');
const { Grid } = require('gridjs');

var $ = {jquery} = require('jquery');


ipcRenderer.send('empiesa','hola');

ipcRenderer.on('resposta', async (e, args) => {
try{
   const obj = JSON.parse(args);
}
catch{
  ipcRenderer.send('empiesa','hola');
}
  
   console.log(obj.data);
   new Grid({
        columns: ["ID","NOM","DESCRIPCIO"],
        search: true,
        pagination: true,
        sort: true,
        width: 1000,
        data: () => { return new Promise(resolve => {
          setTimeout(() => resolve(obj.data),2000)
        })}
      }).render(document.getElementById("wrapper"));
});
