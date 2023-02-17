const { ipcRenderer } = require('electron');

var map = L.map('map').setView([39.648198, 2.8902929], 10);
var circulos;

ipcRenderer.send('empiesamapa', 'hola');

ipcRenderer.on('maps', (e,args) => {
    
    let obj = JSON.parse(args);
    console.log(obj.data);
    let i = 0;
    obj.data.forEach(element => {
        if(element.aprovat == 1)
        {
            circulos = L.circle([element.latitud, element.longitud], {
                color: 'purple',
                fillColor: 'purple',
                fillOpacity: 0.5,
                radius: 2000
            }).addTo(map);
            
                circulos.bindPopup(`${element.nom}<br><div id="imagenpopup"><img src="${element.fotos[0].url}"class="imagen" width:100%></div><br>${element.descripcio}`); 
                i=i+1;
        }
    });
    
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
