const { ipcRenderer } = require("electron");
const { Chart } = require("chart.js/auto");
const { nodeName } = require("jquery");

let banys;
let valoracion;
let personasmax;
let camas;
let listabanios = [];
let cantidadbanios = [];
let stringBanios = [];
let listacamas = [];
let cantidadcamas = [];
let stringcamas = [];
let listapersonas = [];
let cantidadpersonas = [];
let stringpersonas = [];

let contador = 0;
ipcRenderer.send("graph", "comienza el programa")

ipcRenderer.on('resgraph', (e, resultado) => {
  let obj;
  try {  obj = JSON.parse(resultado);  }
  catch {
    ipcRenderer.send("graph", "comienza el programa")
  }

  banys = obj.data.sort(function (a, b) {
    return a.nbanys - b.nbanys;
  }).reverse();
  // 4
  // 
  obj.data.forEach(element => {
    if(!listabanios.includes(element.nbanys))
    {
      listabanios.push(element.nbanys)
    }
  });

  listabanios.forEach(campo =>{
    banys.forEach(banio=>{
      if(banio.nbanys == campo){
        contador = contador + 1}
    })
    cantidadbanios.push(contador);
    contador = 0;
  })

  listabanios.forEach(elemento =>{
    stringBanios.push(`Baños: ${elemento}`)
  })

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: stringBanios,
      datasets: [{
        label: '#casas',
        data: cantidadbanios,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  valoracion = obj.data.sort(function (a, b) {
    return a.valoracio - b.valoracio;
  }).reverse();

  // valoracion
  const txc = document.getElementById('myChart2');
  new Chart(txc, {
    type: 'doughnut',
    data: {
      labels: [valoracion[0].nom, valoracion[1].nom, valoracion[2].nom, valoracion[3].nom, valoracion[4].nom, valoracion[5].nom],
      datasets: [{
        label: '#Valoracion',
        data: [valoracion[0].valoracio, valoracion[1].valoracio, valoracion[2].valoracio, valoracion[3].valoracio, valoracion[4].valoracio, valoracion[5].valoracio],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  personasmax = obj.data.sort(function (a, b) {
    return a.npersones - b.npersones;
  }).reverse();

  obj.data.forEach(element => {
    if(!listapersonas.includes(element.npersones))
    {
      listapersonas.push(element.npersones)
    }
  });

  listapersonas.forEach(campo =>{
    personasmax.forEach(persona=>{
      if(persona.npersones == campo){
        contador = contador + 1}
    })
    cantidadpersonas.push(contador);
    contador = 0;
  })

  listapersonas.forEach(elemento =>{
    stringpersonas.push(`Personas: ${elemento}`)
  })


  // valoracion
  const cxt = document.getElementById('myChart3');
  new Chart(cxt, {
    type: 'bar',
    data: {
      labels: stringpersonas,
      datasets: [{
        label: '#Casas',
        data: cantidadpersonas,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  camas = obj.data.sort(function (a, b) {
    return a.nllits - b.nllits;
  }).reverse();

  obj.data.forEach(element => {
    if(!listacamas.includes(element.nllits))
    {
      listacamas.push(element.nllits)
    }
  });

  listacamas.forEach(campo =>{
    camas.forEach(cama=>{
      if(cama.nllits == campo){
        contador = contador + 1}
    })
    cantidadcamas.push(contador);
    contador = 0;
  })

  listacamas.forEach(elemento =>{
    stringcamas.push(`Camas: ${elemento}`)
  })

  // valoracion
  const tcx = document.getElementById('myChart4');
  new Chart(tcx, {
    type: 'line',
    data: {
      labels: stringcamas,
      datasets: [{
        label: '#Casas',
        data: cantidadcamas,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
  // Load the Visualization API and the controls package.
  google.charts.load('current', { 'packages': ['corechart', 'controls'] });
});














