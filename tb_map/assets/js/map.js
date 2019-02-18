var map = L.map('mapid').setView([-3, 28], 8);
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

var percLayer = new L.GeoJSON.AJAX("data/tb-prev.json", {
    style: function (feature) {
        return {
            color: feature.properties.stroke,
            fillOpacity: feature.properties["fill-opacity"],
            fillColor: feature.properties.fill,
            opacity: feature.properties["stroke-opacity"],
            weight: feature.properties["stroke-width"],
	    interactive: false,
        };
    }
}).addTo(map);
var absLayer = new L.GeoJSON.AJAX("data/tb-prev-abs.json", {
    style: function (feature) {
        return {
            color: feature.properties.stroke,
            fillOpacity: feature.properties["fill-opacity"],
            fillColor: feature.properties.fill,
            opacity: feature.properties["stroke-opacity"],
            weight: feature.properties["stroke-width"],
	    interactive: false,
        };
    }
});

var screening = new L.GeoJSON.AJAX("./data/screening.json", {
    pointToLayer: function (feature, latlng) {
	var circ = L.circle(latlng, {
	    radius: 2000,
	    color: "blue",
	    opacity: 0.8,
	    weight: 1,
	    fillColor: "blue",
	    fillOpacity: 0.5
	}).bindPopup(
	    "<b>" + feature.properties.name + "</b><br>" +
	    "<b>POP:</b>" + feature.properties.pop + "<br>" +
	    "<b>TB:</b>" + feature.properties.tb + "<br>" +
	    "<b>NNS:</b>" + feature.properties.nns
	);
	circ.on('mouseover', function (e) {this.openPopup();});
	circ.on('mouseout', function (e) {this.closePopup();});
	return circ;
    }
}).addTo(map);

var overlayLayers = {
    "TB cases (abs)": absLayer,
    "TB prevalence": percLayer,
    "screening": screening,
}

var control = L.control.layers(baseLayers, overlayLayers).addTo(map);

map.on("overlayadd", function(eo) {
    if (eo.name === "TB prevalence") {
	setTimeout(function() {
	    map.removeLayer(absLayer)
	}, 10);
    } else if (eo.name === "TB cases (abs)") {
	setTimeout(function() {
	    map.removeLayer(percLayer)
	}, 10);
    }
});

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
