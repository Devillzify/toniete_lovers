const { ipcRenderer } = require("electron");
const {Chart} = require("chart.js/auto");
const { nodeName } = require("jquery");

ipcRenderer.send("graph", "comienza el programa")

ipcRenderer.on('resgraph', (e, resultado) => {
    // 4
    // implementar mejores valoradas, m2, max personas que caben,algo mas
    
    let obj = JSON.parse(resultado);
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: [obj.data[0].nom,obj.data[1].nom,obj.data[2].nom,obj.data[3].nom],
                datasets: [{
                  label: '# of cars',
                  data: [obj.data[0].nhabitacions,obj.data[1].nhabitacions,obj.data[2].nhabitacions,obj.data[3].nhabitacions],
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