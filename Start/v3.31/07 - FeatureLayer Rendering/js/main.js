require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/ClassBreaksRenderer",
    "esri/renderers/HeatmapRenderer",
    "esri/Color",
    "dojo/on"
], function(
    Map,
    FeatureLayer,
    SimpleMarkerSymbol,
    ClassBreaksRenderer,
    HeatmapRenderer,
    Color,
    on
) {
   var map = new Map("map", {
        center: [107.3326697, 31.6252114],
        zoom: 5,
        basemap: "topo"
    });

    map.on("load", populateMap);
    function populateMap(mapEvent) {
        featureLayer = new FeatureLayer(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1"
        );

        mapEvent.map.addLayer(featureLayer);
    }
});
