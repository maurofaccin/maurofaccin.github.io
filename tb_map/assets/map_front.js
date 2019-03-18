var map = L.map('mapid').setView([-3, 28], 6);
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

function highlight(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    };
    info.update(layer.feature.properties)
}

function resetHighlight(e) {
  percLayer.resetStyle(e.target);
  info.update()
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'legend'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
    '<b>' + props.name + '</b><br />Incidence rate: ' + props.incidence + '<br><small>TB cases per 100k<small>':
    'Country TB Incidence');
};

info.addTo(map);

var percLayer = new L.GeoJSON(regions, {
    style: function (feature) {
        return {
            color: 'white',
            fillOpacity: 0.6,
            fillColor: feature.properties.color,
            opacity: 0.7,
            weight: 2,
        };
    },
  onEachFeature: function (feature, layer) {
    layer.on({
      click: function (layer) {window.open(feature.properties.url, '_blank')},
      mouseover: highlight,
      mouseout: resetHighlight
    })
  }
}).addTo(map);
