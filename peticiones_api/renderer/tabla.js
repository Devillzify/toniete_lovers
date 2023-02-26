const { ipcRenderer } = require('electron');
const { Grid, h } = require('gridjs');

var $ = {jquery} = require('jquery');
let id;

ipcRenderer.on('id',(e,args) => {
  id=args;
});

ipcRenderer.send('empiesa','hola');

ipcRenderer.on('resposta', async (e, args) => {
      
   const obj = JSON.parse(args);
   new Grid({
        columns: ["ID","PROPIETARI_ID","NOM","DESCRIPCIO",
        {
        name: "Editar",
        formatter: (_, row) => {
          if(row.cells[1].data==id)
          {
            return h('Button', {
              className: 'bg-blue-600',
              onClick: () => {
                cambiarVentana(row.cells[0].data, row.cells[1].data);
              }
            }, 'Edit');
          }  
        }
      }
      ],
        search: true,
        pagination: true,
        sort: true,
        width: 1000,
        data: () => { return new Promise(resolve => {
          resolve(obj.data)
        })}
      }).render(document.getElementById("wrapper"));
});

function cambiarVentana(idCasa, idPropietario) {
  if(idPropietario == id){
    ipcRenderer.send('editarCasa', idCasa);
  }
}