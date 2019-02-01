var mines = new L.GeoJSON.AJAX("./data/mines.json", {
    pointToLayer: function (feature, latlng) {
	return L.circle(latlng, {
	    radius: feature.properties.radius * 100,
	    color: "black",
	    opacity: 0.5,
	    weight: 1,
	    fillColor: "black",
	    fillOpacity: 0.3
	});
    }
});

control.addOverlay(mines, "Mines");
