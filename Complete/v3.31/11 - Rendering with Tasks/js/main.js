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

        generateRenderer();

        mapEvent.map.addLayer(featureLayer);
    }

    function generateRenderer() {
        var classDef = new ClassBreaksDefinition();
        classDef.classificationField = "Confirmed";
        classDef.classificationMethod = "quantile";
        classDef.breakCount = 5;
        classDef.baseSymbol = createSymbol(new Color([150, 150, 150, 0.5]));

        var colorRamp = new AlgorithmicColorRamp();
        colorRamp.fromColor = Color.fromHex("#FF0000");
        colorRamp.toColor = Color.fromHex("#00FF00");
        colorRamp.algorithm = "hsv"; 
        classDef.colorRamp = colorRamp;

        var params = new GenerateRendererParameters();
        params.classificationDefinition = classDef;
        var generateRenderer = new GenerateRendererTask(featureLayer.url);
        generateRenderer.execute(params, applyRenderer);
    }

    function applyRenderer(renderer) {
        featureLayer.setRenderer(renderer);
    }

    function createSymbol(color) {
        var symbol = new SimpleMarkerSymbol();
        symbol.setColor(color);
        symbol.setSize(20);

        return symbol;
    }
});
