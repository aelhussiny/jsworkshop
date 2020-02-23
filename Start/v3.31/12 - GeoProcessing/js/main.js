require([
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/tasks/Geoprocessor",
    "esri/tasks/FeatureSet",
    "esri/tasks/LinearUnit"
], function(
    Map,
    GraphicsLayer,
    Graphic,
    Point,
    SimpleMarkerSymbol,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    Geoprocessor,
    FeatureSet,
    LinearUnit
) {
    var graphicsLayer;

    var map = new Map("map", {
        center: [55.3142381, 25.2627104],
        zoom: 20,
        basemap: "topo"
    });

    map.on("load", populateMap);

    function populateMap(mapEvent) {
        graphicsLayer = new GraphicsLayer();

        mapEvent.map.addLayer(graphicsLayer);
    }
});
