require([
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Color"
], function(
    Map,
    GraphicsLayer,
    Graphic,
    QueryTask,
    Query,
    SimpleMarkerSymbol,
    Color
) {
    var graphicsLayer;
    var map = new Map("map", {
        center: [55.3142381, 25.2627104],
        zoom: 5,
        basemap: "topo"
    });

    map.on("load", populateMap);

    function populateMap(mapEvent) {
        graphicsLayer = new GraphicsLayer();

        mapEvent.map.addLayer(graphicsLayer);
    }
});
