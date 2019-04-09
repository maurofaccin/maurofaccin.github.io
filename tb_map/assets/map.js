var map = L.map('mapid').setView(center, 8);
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);
var osm_hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
});
var baseLayers = {
    "CartoDB Positron": CartoDB_Positron,
    "OSM Hot": osm_hot,
};

var overlayLayers = {};

// function featStyle(feat, interactive=false) {
//   return {
//       color: feat.properties.stroke,
//       fillOpacity: feat.properties["fill-opacity"],
//       fillColor: feat.properties.fill,
//       opacity: feat.properties["stroke-opacity"],
//       weight: feat.properties["stroke-width"],
//       interactive: interactive,
//   };
// };

// if ( typeof TBIncidence != 'undefined' ) {
// 	var TBInclayer = new L.GeoJSON(TBIncidence, {
// 		style: function (feature) { return featStyle(feature) }
// 	}).addTo(map);
//   overlayLayers['TB Rate'] = TBInclayer;
// }

// if ( typeof TBIncidenceAbs != 'undefined' ) {
// 	var TBInclayerAbs = new L.GeoJSON(TBIncidenceAbs, {
// 		style: function (feature) { return featStyle(feature) }
// 	});
//   overlayLayers['TB Cases'] = TBInclayerAbs;
// }

// if ( typeof hz != 'undefined' ) {
//   var HZlayer = new L.GeoJSON(hz, {
// 	style: function (feature) { return featStyle(feature, true) }
//   }).bindTooltip(function (layer) {
//     return "<b>" + layer.feature.properties.tbmap_name + "</b><br>" +
//       "Incidence rate: " + layer.feature.properties.tbmap_incidence
//   });
//   overlayLayers['Health Zones'] = HZlayer;
// }

// if ( typeof screening != 'undefined' ){
//   var screeningLayer = new L.GeoJSON(screening, {
//       pointToLayer: function (feature, latlng) {
//           var circ = L.circle(latlng, {
//               radius: 2000,
//               color: "blue",
//               opacity: 0.8,
//               weight: 1,
//               fillColor: "blue",
//               fillOpacity: 0.5
//           }).bindPopup(
//               "<b>" + feature.properties.name + "</b><br>" +
//               "<b>POP:</b>" + feature.properties.pop + "<br>" +
//               "<b>TB:</b>" + feature.properties.tb + "<br>" +
//               "<b>NNS:</b>" + feature.properties.nns
//           );
//           circ.on('mouseover', function (e) {this.openPopup();});
//           circ.on('mouseout', function (e) {this.closePopup();});
//           return circ;
//       }
//   });
//   overlayLayers['Screening'] = screeningLayer;
// }

// if ( typeof mines != 'undefined' ) {
//   var minesLayer = new L.GeoJSON(mines, {
//       pointToLayer: function (feature, latlng) {
//           return L.circle(latlng, {
//               radius: feature.properties.radius * 100,
//               color: "black",
//               opacity: 0.5,
//               weight: 1,
//               fillColor: "black",
//               fillOpacity: 0.3
//           });
//       }
//   });
//   overlayLayers['Mines'] = minesLayer;
// }

// if ( typeof hfacs != 'undefined' ) {
//   var healthIcon = L.icon({
//       iconUrl: '../assets/health-icon.png',

//       iconSize:     [28, 40], // size of the icon
//       iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
//       popupAnchor:  [0, -46] // point from which the popup should open relative to the iconAnchor
//   });

//   var hfacsLayer = new L.GeoJSON(hfacs, {
//       pointToLayer: function (feature, latlng) {
//           return L.marker(latlng, {
//               icon: healthIcon
//           }).bindPopup(
//               "<b>" + feature.properties.name + "</b>"
//           );
//       }
//   });

//   overlayLayers['Health Facilities'] = hfacsLayer;
// }

// var control = L.control.layers(baseLayers, overlayLayers).addTo(map);

// map.on("overlayadd", function(eo) {
//     if (eo.name === "TB Rate") {
//         setTimeout(function() {
//             map.removeLayer(TBInclayerAbs)
//         }, 10);
//     } else if (eo.name === "TB Cases") {
//         setTimeout(function() {
//             map.removeLayer(TBInclayer)
//         }, 10);
//     }
// });

for (i=0; i<missions.length; i++) {
  L.imageOverlay(
	missions[i][0],
	[[missions[i][2], missions[i][1]], [missions[i][4], missions[i][3]]]
  ).addTo(map);
}

console.log(missions.length);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend'),
        grades = [1, 2, 5, 10],
        opacity = [0.1, 0.35, 0.6, 0.7],
        colors = ['#cccc00', '#cc8800', '#cc4400', '#cc0000'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '; opacity:' + opacity[i] + '"></i> >' + grades[i] + 'x<br>';
    }

    return div;
};

legend.addTo(map);
