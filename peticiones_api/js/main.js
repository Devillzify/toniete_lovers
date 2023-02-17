// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
let token;
let resposta;
var mainWindow;

function createWindow () {
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

ipcMain.on('empiesa',(e, args) =>{
  const { net } = require('electron')
  const request = net.request('http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments')
  request.on('response', (response) => {
    //console.log(`STATUS: ${response.statusCode}`)
    //console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
     // console.log(`BODY: ${chunk}`)
      e.sender.send('resposta',`${chunk}`);
      e.sender.send('maps',`${chunk}`);
    })
    response.on('end', () => {
    //  console.log('No more data in response.')
    })
  })
  request.end();
}); 

/** recoger token */

ipcMain.on('enviarLogin', (e, args) => {
  const { net } = require('electron')
  const requestdos = net.request({
    method: 'POST',
    protocol: 'http:',
    hostname: 'etv.dawpaucasesnoves.com/etvServidor/public/api',
    path: '/login',
    redirect: 'follow'
  });

  var usuario = JSON.stringify(
  {
    "email": args.email,
    "password": args.password
  });

    requestdos.setHeader("Content-Type", "application/json");
    requestdos.write(usuario);
  
  requestdos.on('response', (response) => {
    //console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: esto ${chunk}`)
    //  e.sender.send('respostaPrincipal',`${chunk}`);
      //console.log(JSON.parse(chunk).data.token)
      token = JSON.parse(chunk).data.token;
      //verificarToken(token);
      e.sender.send('token',token);
      if(token!=null)
      {
        const { menu2 } = require("../js/menu2");
        mainWindow.loadFile("./html/index.html")
      }
      else{
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


ipcMain.on('empiesamapa',(e,args)=>{
  const { net } = require('electron')
  const request = net.request('http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments')
  request.on('response', (response) => {
    //console.log(`STATUS: ${response.statusCode}`)
    //console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
     // console.log(`BODY: ${chunk}`)
      e.sender.send('resposta',`${chunk}`);
      e.sender.send('maps',`${chunk}`);
    })
    response.on('end', () => {
    //  console.log('No more data in response.')
    })
  })
  request.end();
})

// inviar datos a graficos
ipcMain.on("graph",(e,args)=>{
  const { net } = require('electron')
  const request = net.request('http://etv.dawpaucasesnoves.com/etvServidor/public/api/allotjaments')
  request.on('response', (response) => {
    response.on('data', (chunk) => {
      e.sender.send('resgraph',`${chunk}`);
    })
  })
  request.end();
})
