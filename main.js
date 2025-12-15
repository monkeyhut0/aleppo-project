// Initialize the map on the 'map' div with settings
const map = L.map('map', {
    center: [36.231908, 37.105085],
    maxBounds: [[36.377826, 36.963714],
                [36.074136, 37.469514]],
    maxBoundsViscosity: 0.1,
    zoom: 12,
    minZoom: 11,

});

// Add the base tile layer from openstreetmap
/*
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// import locations
console.log("Fetching locations.json");
fetch("./locations.json")
    .then(response => response.json())
    .then(data => {
        const locations = data.locations;

        for (const loc of locations ) {
            console.log("Marking " + loc.name + "...")
            var marker = L.marker(loc.coordinates).addTo(map);

            // create popup
            var popupElement = 
                `<b>${loc.name}</b><br>
                ${loc.description}`;
            for (const img of loc.images) {
                popupElement += `<br><a href="./images/${img.file}" target="_blank">
                <img class="image" src="./images/${img.file}">
                </a><br>
                ${img.year} <a href="${img.source}" target="_blank">Source</a>`
            }
            marker.bindPopup(popupElement);
        }
    });