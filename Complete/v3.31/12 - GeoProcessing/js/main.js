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

    map.on("click", addPointAndCalculateViewshed);

    var gp = new Geoprocessor(
        "https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed"
    );
    gp.setOutputSpatialReference({
        wkid: 4326
    });

    function populateMap(mapEvent) {
        graphicsLayer = new GraphicsLayer();

        mapEvent.map.addLayer(graphicsLayer);
    }

    function addPointAndCalculateViewshed(clickEvent) {
        var symbol = new SimpleMarkerSymbol().setColor(
            new Color([150, 150, 150, 0.5])
        );

        var graphic = new Graphic(clickEvent.mapPoint, symbol);

        graphicsLayer.add(graphic);

        computeViewShed(graphic);
    }

    function computeViewShed(graphic) {
        var featureSet = new FeatureSet();
        featureSet.features = [graphic];

        var vsDistance = new LinearUnit();
        vsDistance.distance = 5;
        vsDistance.units = "esriMiles";

        var params = {
            Input_Observation_Point: featureSet,
            Viewshed_Distance: vsDistance
        };
        gp.execute(params, drawViewshed);
    }

    function drawViewshed(results) {
        var polySymbol = new SimpleFillSymbol();
        polySymbol.setOutline(
            new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,
                new Color([0, 0, 0, 0.5]),
                1
            )
        );
        polySymbol.setColor(new Color([255, 127, 0, 0.7]));
        var features = results[0].value.features;
        for (var f = 0, fl = features.length; f < fl; f++) {
            var feature = features[f];
            feature.setSymbol(polySymbol);
            map.graphics.add(feature);
        }
    }
});
