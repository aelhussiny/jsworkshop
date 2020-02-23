require(["esri/map", "esri/layers/FeatureLayer"], function(Map, FeatureLayer) {
    var map = new Map("map", {
        center: [55.3142381, 25.2627104],
        zoom: 5,
        basemap: "topo"
    });

    map.on("load", populateMap);

    function populateMap(mapEvent) {
        var featureLayer = new FeatureLayer(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1"
        );

        mapEvent.map.addLayer(featureLayer);
    }
});
