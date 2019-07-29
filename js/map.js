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

    var toggleableLayerIds = {
        'franco': 'Francophone service provider',
        'youth': 'Services for youth',
        'women': 'Services for women',
        'volunteer': 'Find or become a mentor to a newcomer',
        'seniors': 'Services for seniors',
        'other': 'Other services',
        'lgbtq2': 'Services for LGBTQ2',
        'lang-training': 'Language training (general)',
        'lang-asses': 'Language assessment',
        'job-lang-training': 'Job-specific language training',
        'help-gar': 'Services for refugees',
        'service-general': 'Help with daily life',
        'job-search': 'Help finding a job',
    }

    var layerIds = Object.keys(toggleableLayerIds)

    // Add functionality to pop up the contact info
    map.on('click', function(e) {

        var features = map.queryRenderedFeatures(e.point, {
            layers: layerIds
        });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        var url = feature.properties['x Website en']

        // prepend http:// if it doesn't already start with http
        if (typeof url !== 'undefined') {

            if (url.substr(0, 4) !== 'http') {
                url = 'http://' + url;
            }
        }

        var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML('<p>' + '<b>' + feature.properties["x Type en"] + '</b>' + '</p>' +
                feature.properties["x Address en"] + '</br>' +
                feature.properties["x City en"] + ', ' +
                feature.properties["x Province en"] + ' ' +
                feature.properties["x Postal en"] + '</br>' +
                feature.properties["x Telephone en"] + '</br>' +
                '<a target=_blank href="' + url + '">' + url + '</a></br>'
            )
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
    });

    for (var id in toggleableLayerIds) {
        var text = toggleableLayerIds[id];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.id = id
        link.innerHTML = "<span class='checkmark'>&#10004;</span>" + "<span class='dot'></span>" + text;
        
        map.setLayoutProperty(id, 'visibility', 'visible');

        link.onclick = function(e) {
            var clickedLayer = this.id;
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

    map.addControl(new mapboxgl.ScaleControl({position: 'bottom-left'}));
});
