var healthIcon = L.icon({
    iconUrl: '../assets/health-icon.png',

    iconSize:     [28, 40], // size of the icon
    iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -46] // point from which the popup should open relative to the iconAnchor
});


var hfacs = new L.GeoJSON.AJAX("data/hfacs.json", {
    pointToLayer: function (feature, latlng) {
	return L.marker(latlng, {
	    icon: healthIcon
	}).bindPopup(
	    "<b>" + feature.properties.name + "</b>"
	);
    }
});

control.addOverlay(hfacs, 'Health Facilities')
