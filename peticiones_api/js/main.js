// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, remote, Menu, net, ipcRenderer } = require('electron');
const { menu } = require("./menu");
const { menu2 } = require("./menu2");
const { default: swal } = require('sweetalert');

const path = require('path')
let token;
var mainWindow;
let respostains;
let respostaupd;
let idCasamod;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  mainWindow.loadFile('./html/index.html')
  Menu.setApplicationMenu(menu)
  mainWindow.webContents.openDevTools()
  module.exports.mainWindow = mainWindow;
}


app.whenReady().then(() => {
  createWindow(),

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
let id;
ipcMain.on('empiesa', (e, args) => { // request de alojamiento al comenzar
  var resp;
  const request = net.request('http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments')
  request.on('response', (response) => {
    resp = "";
    response.on('data', (chunk) => {
      resp += chunk;
    })
    response.on('end', () => {
        e.sender.send('resposta', resp);
        e.sender.send('id', id);
    })
  })
  request.end();
});

ipcMain.on('enviarLogin', (e, args) => { //request para login
  const requestdos = net.request({
    method: 'POST',
    protocol: 'http:',
    hostname: 'etv.dawpaucasesnoves.com/etvServidor/public/api',
    path: '/login',
    redirect: 'follow'
  });

  var usuario = JSON.stringify(args);

  
  requestdos.setHeader("Content-Type", "application/json");
  requestdos.write(usuario);

  requestdos.on('response', (response) => {
    response.on('data', (chunk) => {
      token = JSON.parse(chunk).data.token;
      console.log(token)
      if(token!=null)
      {
        id = JSON.parse(chunk).data.usuari.id;
       
      }
      
    
      if (token != null) {
        Menu.setApplicationMenu(menu2)
        mainWindow.loadFile("./html/index.html")
      }
      else {
        e.sender.send('nologeado','no');
        console.log("no esta logeado");
      }
    })
    
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  requestdos.end();
})


ipcMain.on('empiesamapa', (e, args) => {
  var mapa;
  const request = net.request('http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments')
  request.on('response', (response) => {
    mapa = "";
    //console.log(`STATUS: ${response.statusCode}`)
    //console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => { 
      mapa += chunk;
    
    })
    response.on('end', () => {
      e.sender.send('maps', mapa);
      //  console.log('No more data in response.')
    })
  })
  request.end();
})

// inviar datos a graficos
ipcMain.on("graph", (e, args) => {
  var graph;
  const request = net.request('http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments')
  request.on('response', (response) => {
    graph = "";
    response.on('data', (chunk) => {
      graph += chunk;
    }),
    response.on('end', () => {
      e.sender.send('resgraph', graph);
    })
  })
  request.end();
})



ipcMain.on('casaInsert', (e, args) => {
  const requestdos = net.request({
    method: 'POST',
    protocol: 'http:',
    hostname: 'etv.dawpaucasesnoves.com/etvServidor/public/api',
    path: '/allotjaments',
    redirect: 'follow'
    });

    var casa = JSON.stringify(args);

    requestdos.setHeader('Authorization', `Bearer ${token}`);
    requestdos.setHeader("Content-Type", "application/json");
    requestdos.write(casa);
  
  requestdos.on('response', (response) => {
    response.on('data', (chunk) => {
      respostains = JSON.parse(chunk);
    })    
    response.on('end', () => {
      e.sender.send('salio');
    })
  })
  requestdos.end();
})


ipcMain.on('editarCasa', (e, idCasa) => {
  idCasamod = idCasa;
  const peticionUpd = net.request({
    method: 'GET',
    protocol: 'http:',
    hostname: 'etv.dawpaucasesnoves.com/etvServidor/public/api',
    path: `/allotjaments/${idCasa}`,
    redirect: 'follow'
  });
  
  peticionUpd.on('response',(response) => {
    respostaupd = "";
    response.on('data', (chunk) => {
      respostaupd += chunk;
    });
    response.on('end', () => {
     abrirModal()
    });
  });
  peticionUpd.end();
})

function resetToken(){
  token = null;
  Menu.setApplicationMenu(menu)
  mainWindow.loadFile("./html/index.html")
  console.log("Log out realizado")
  console.log(token)
}
exports.resetToken = resetToken;


function abrirModal() {
  const child = new BrowserWindow({ parent: mainWindow, modal: true, show: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  child.loadFile('./html/modify.html');
  child.openDevTools();
  child.once('ready-to-show', () => {
    child.show()
  })  
}

ipcMain.on('update',(e, args) => {
  e.sender.send('updateListo', respostaupd)
});



ipcMain.on('casaUpdate', (e, args) => {
  var casa = JSON.stringify(args);
  console.log(casa);
  const requestdos = net.request({
    method: 'PUT',
    protocol: 'http:',
    hostname: 'etv.dawpaucasesnoves.com/etvServidor/public/api',
    path: `/allotjaments/${idCasamod}`,
    redirect: 'follow'
    });
    requestdos.setHeader("accept", "application/json");
    requestdos.setHeader('Authorization', `Bearer ${token}`);
    requestdos.setHeader("Content-Type", "application/json");
    requestdos.write(casa);
    console.log("Esperando respuesta")
  requestdos.on('response', (response) => {
    response.on('data', (chunk) => {
      console.log(JSON.parse(chunk))
      if(JSON.parse(chunk).status==='success')
      {
        e.sender.send('modificadobien');
      }
      else{
        e.sender.send('modificadomal');
      }
    })    
    response.on('end', () => {
      
    })
  })
  requestdos.end();
})