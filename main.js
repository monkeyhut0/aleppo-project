// Initialize the map on the 'map' div with settings
const map = L.map('map', {
    center: [36.1976903, 37.1550053],
    maxBounds: [[36.261535, 37.076000],
                [36.136501, 37.252786]],
    maxBoundsViscosity: 0.9,
    zoom: 13,
    minZoom: 12,

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
                popupElement += `<br><img class="image" src="./images/${img.file}"><br>${img.year}`
            }
            marker.bindPopup(popupElement);
        };
    });