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
    var activeRenderer = "breaks";
    var classBreaksRenderer = createBreaksRenderer();
    var heatMapRenderer = createHeatmapRenderer();

    var featureLayer;

    var map = new Map("map", {
        center: [107.3326697, 31.6252114],
        zoom: 5,
        basemap: "topo"
    });

    map.on("load", populateMap);

    on(this.rendererToggler, "click", function() {
        if (activeRenderer === "breaks") {
            featureLayer.setRenderer(heatMapRenderer);
            activeRenderer = "heat";
        } else {
            featureLayer.setRenderer(classBreaksRenderer);
            activeRenderer = "breaks";
        }
    });

    function populateMap(mapEvent) {
        featureLayer = new FeatureLayer(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1"
        );

        if (activeRenderer === "breaks") {
            featureLayer.setRenderer(classBreaksRenderer);
        } else {
            featureLayer.setRenderer(heatMapRenderer);
        }

        mapEvent.map.addLayer(featureLayer);
    }

    function createBreaksRenderer() {
        var defaultSymbol = new SimpleMarkerSymbol();
        defaultSymbol.setColor(new Color([150, 150, 150, 0.5]));

        var renderer = new ClassBreaksRenderer(defaultSymbol, "Confirmed");
        renderer.addBreak(0, 25, createSymbol(new Color([56, 168, 0, 0.5])));
        renderer.addBreak(25, 75, createSymbol(new Color([139, 209, 0, 0.5])));
        renderer.addBreak(75, 175, createSymbol(new Color([255, 255, 0, 0.5])));
        renderer.addBreak(
            175,
            400,
            createSymbol(new Color([255, 128, 0, 0.5]))
        );
        renderer.addBreak(
            400,
            Infinity,
            createSymbol(new Color([255, 0, 0, 0.5]))
        );

        return renderer;
    }

    function createSymbol(color) {
        var symbol = new SimpleMarkerSymbol();
        symbol.setColor(color);
        symbol.setSize(20);

        return symbol;
    }

    function createHeatmapRenderer() {
        var renderer = new HeatmapRenderer({
            field: "Confirmed",
            blurRadius: 8,
            maxPixelIntensity: 30,
            minPixelIntensity: 0
        });

        return renderer;
    }
});
