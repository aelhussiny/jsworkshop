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

        var queryTask = new QueryTask(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1"
        );
        var query = new Query();
        query.where = "1=1";
        query.outSpatialReference = { wkid: 4326 };
        query.returnGeometry = true;
        query.outFields = ["*"];
        queryTask.execute(query, addPointsToMap);
    }

    function addPointsToMap(result) {
        var symbol = new SimpleMarkerSymbol().setColor(
            new Color([150, 150, 150, 0.5])
        );
        for (var i = 0; i < result.features.length; i++) {
            var feature = result.features[i];
            graphicsLayer.add(
                new Graphic(feature.geometry, symbol, feature.attributes)
            );
        }
    }
});
