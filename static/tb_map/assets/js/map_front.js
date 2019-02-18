var map = L.map('mapid').setView([-3, 28], 8);
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);
var percLayer = new L.GeoJSON.AJAX("tb_map/countries.geojson", {
    style: function (feature) {
        return {
            color: 'white',
            fillOpacity: 0.7,
            fillColor: feature.properties.color,
            opacity: 0.7,
            weight: 2,
        };
    },
  onEachFeature: function (feature, layer) {
    layer.bindTooltip(feature.properties.name),
    layer.on({
      click: function (layer) {window.open(feature.properties.url, '_blank')}
    })
  }
}).addTo(map);
