const { ipcRenderer } = require('electron');

ipcRenderer.send('mapa',)

var map = L.map('map').setView([39.648198, 2.8902929], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var circle1 = L.circle([39.648198, 2.890292], {
    color: 'purple',
    fillColor: 'purple',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


var circle2 = L.circle([39.700000, 2.890292], {
    color: 'purple',
    fillColor: 'purple',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle1.bindPopup("I am a circle.");
circle2.bindPopup("I am a circle.");

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
