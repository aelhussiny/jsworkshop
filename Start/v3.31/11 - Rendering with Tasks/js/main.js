require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/tasks/ClassBreaksDefinition",
    "esri/tasks/AlgorithmicColorRamp",
    "esri/tasks/GenerateRendererTask",
    "esri/tasks/GenerateRendererParameters",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Color"
], function(
    Map,
    FeatureLayer,
    ClassBreaksDefinition,
    AlgorithmicColorRamp,
    GenerateRendererTask,
    GenerateRendererParameters,
    SimpleMarkerSymbol,
    Color
) {
    var featureLayer;

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
