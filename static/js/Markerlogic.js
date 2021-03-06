function createMap(Earthquake) {

    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the Earthquake layer.
    var overlayMaps = {
      "Earthquakes": Earthquake
    };
  console.log(Earthquake)
    
    var myMap = L.map("map", {
        center: [39.7749, -111.4194],
        zoom: 4,
        layers: [streetmap, Earthquake]
      });
  
    // // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "earthquakes" property from response.data.
    var earthquakes = response.features;
    console.log(earthquakes)
  
    // Initialize an array to hold bike markers.
    var eqMarkers = [];
  
    // Loop through the earthquakes array.
    for (var index = 0; index < earthquakes.length; index++) {
      var eqLocation = earthquakes[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      var eqMarker = L.marker([eqLocation.geometry.coordinates[1], eqLocation.geometry.coordinates[0]])
      .bindPopup(eqLocation.properties.mag + ' magnitude and the depth is ' + eqLocation.geometry.coordinates[2])       
  
      // Add the marker to the eqMarkers array.
      eqMarkers.push(eqMarker);
    }
  console.log(eqMarkers)
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(eqMarkers));

  }
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function showdata(response) {
//    console.log(response) 
// });
  