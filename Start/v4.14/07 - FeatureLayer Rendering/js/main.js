require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "dojo/on"
], function(Map, MapView, FeatureLayer, on) {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [107.3326697, 31.6252114],
        zoom: 3
    });

    view.when(() => {
        const featureLayer = new FeatureLayer({
            url:
                "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1"
        });
        
        map.add(featureLayer);
    });
});
