const { ipcRenderer } = require('electron');

ipcRenderer.send('mapa',)

var map = L.map('map').setView([39.648198, 2.8902929], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([39.648198, 2.890292]).addTo(map);

var circle = L.circle([39.648198, 2.890292], {
    color: 'purple',
    fillColor: 'purple',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [39.648198, 2.890282],
    [39.648198, 2.890292],
    [39.648198, 2.890302]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([39.648198, 2.890292])
    .setContent("I am a standalone popup.")
    .openOn(map);

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
