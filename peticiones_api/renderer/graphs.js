const { ipcRenderer } = require("electron");
const {Chart} = require("chart.js/auto");
const { nodeName } = require("jquery");

let banys;
let valoracion;
let personasmax;
let camas;

ipcRenderer.send("graph", "comienza el programa")

ipcRenderer.on('resgraph', (e, resultado) => {
  console.log(resultado)
  let obj;
try{
    obj = JSON.parse(resultado);
}
catch{
  ipcRenderer.send("graph", "comienza el programa")
}
  

    banys = obj.data.sort(function(a, b){
      return a.nbanys - b.nbanys;
    }).reverse();

  console.log(obj);

  // 4
    // 
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
              type: 'polarArea',
              data: {
                labels: [banys[0].nom,banys[1].nom,banys[2].nom,banys[3].nom,banys[4].nom,banys[5].nom],
                datasets: [{
                  label: '# de baños',
                  data: [banys[0].nbanys,banys[1].nbanys,banys[2].nbanys,banys[3].nbanys,banys[4].nbanys,banys[5].nbanys],
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

            
            valoracion = obj.data.sort(function(a, b){
              return a.valoracio - b.valoracio;
            }).reverse();

        // valoracion
        const txc = document.getElementById('myChart2');
        new Chart(txc, {
          type: 'doughnut',
          data: {
            labels: [valoracion[0].nom,valoracion[1].nom,valoracion[2].nom,valoracion[3].nom,valoracion[4].nom,valoracion[5].nom],
            datasets: [{
              label: '# de Valoracion',
              data: [valoracion[0].valoracio,valoracion[1].valoracio,valoracion[2].valoracio,valoracion[3].valoracio,valoracion[4].valoracio,valoracion[5].valoracio],
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

              
        personasmax = obj.data.sort(function(a, b){
          return a.npersones - b.npersones;
        }).reverse();

    // valoracion
    const cxt = document.getElementById('myChart3');
    new Chart(cxt, {
      type: 'bar',
      data: {
        labels: [personasmax[0].nom,personasmax[1].nom,personasmax[2].nom,personasmax[3].nom,personasmax[4].nom,personasmax[5].nom],
        datasets: [{
          label: '# de Personas',
          data: [personasmax[0].npersones,personasmax[1].npersones,personasmax[2].npersones,personasmax[3].npersones,personasmax[4].npersones,personasmax[5].npersones],
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

    camas = obj.data.sort(function(a, b){
      return a.nllits - b.nllits;
    }).reverse();

// valoracion
const tcx = document.getElementById('myChart4');
new Chart(tcx, {
  type: 'line',
  data: {
    labels: [camas[0].nom,camas[1].nom,camas[2].nom,camas[3].nom,camas[4].nom,camas[5].nom],
    datasets: [{
      label: '# de Camas',
      data: [camas[0].nllits,camas[1].nllits,camas[2].nllits,camas[3].nllits,camas[4].nllits,camas[5].nllits],
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
        // Load the Visualization API and the controls package.
        google.charts.load('current', {'packages':['corechart', 'controls']});
});














