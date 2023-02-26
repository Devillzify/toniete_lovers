// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, remote } = require('electron');

const path = require('path')
let token;
let resposta;
var mainWindow;
let respostains;

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
  const { menu } = require("../js/menu");
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
  const { net } = require('electron')
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
  const { net } = require('electron')
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
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: esto ${chunk}`)
      token = JSON.parse(chunk).data.token;
      
      if(token!=null)
      {
        id = JSON.parse(chunk).data.usuari.id;
      }
      
    
      if (token != null) {
        const { menu2 } = require("../js/menu2");
        mainWindow.loadFile("./html/index.html")
      }
      else {
        console.log("no esta logeado");
      }
      console.log(token);
    })
    
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  requestdos.end();
})


ipcMain.on('empiesamapa', (e, args) => {
  var mapa;
  const { net } = require('electron')
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
  const { net } = require('electron')
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
  console.log("entra en el casa insert");
  console.log(args.nom);
  const { net } = require('electron')
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
    //console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: esto ${chunk}`)
      respostains = JSON.parse(chunk);
      console.log(`Esto es el status: ${respostains.status}`);
    })    
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  requestdos.end();
})


ipcMain.on('editarCasa', (e, idCasa) => {
  console.log(idCasa);
createModalWindow();  
})

function createModalWindow() {
  const child = new BrowserWindow({ parent: mainWindow, modal: true, show: true })
  child.loadURL('./html/modify.html')
  child.once('ready-to-show', () => {
    child.show()
  })   
}