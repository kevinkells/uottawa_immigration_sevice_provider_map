// replace this with your access token
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5rZWxscyIsImEiOiJjankwcTJjY20wNGF3M21wZTZtZDU3aTIyIn0.HZrH8fPX6bOjs-8DDVDrag';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kevinkells/cjy0vt90x09ry1cpblxeanjjn', // replace this with your style URL
    center: [-96.66, 55.34],
    zoom: 4.11
});

// When the page loads, define this funtionality
map.on('load', function() {


    map.addSource('museums', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr'
    });

    map.addLayer({
        'id': 'museums',
        'type': 'circle',
        'source': 'museums',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 8,
            'circle-color': 'rgba(55,148,179,1)'
        },
        'source-layer': 'museum-cusco'
    });

    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
    });

    map.addLayer({
        'id': 'contours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'contour',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#877b59',
            'line-width': 1
        }
    });

    var toggleableLayerIds = ['franco', 'service-general'];

    // Add functionality to pop up the contact info
    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: toggleableLayerIds // Add each layer here
        });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        // prepend http:// if it doesn't already start with http
        var url = feature.properties.x_Website_en;
        if (url.substr(0, 4) !== 'http') {
            url = 'http://' + url;
        }

        var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML('<p>' + '<b>' + feature.properties.x_Type_en + '</b>' + '</p>' +
                feature.properties.x_Address_en + '</br>' +
                feature.properties.x_City_en + ', ' +
                feature.properties.x_Province_en + ' ' +
                feature.properties.x_Postal_en + '</br>' +
                feature.properties.x_Telephone_en + '</br>' +
                '<a target=_blank href="' + url + '">' + url + '</a></br>'
            )
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
    });

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        map.setLayoutProperty(id, 'visibility', 'visible');

        link.onclick = function(e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);

    }
});