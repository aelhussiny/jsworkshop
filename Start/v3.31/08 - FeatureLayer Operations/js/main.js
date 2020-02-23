require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/ClassBreaksRenderer",
    "esri/Color",
    "dojo/on",
    "esri/InfoTemplate"
], function(
    Map,
    FeatureLayer,
    SimpleMarkerSymbol,
    ClassBreaksRenderer,
    Color,
    on,
    InfoTemplate
) {
    var featureLayer;

    var map = new Map("map", {
        center: [107.3326697, 31.6252114],
        zoom: 5,
        basemap: "topo"
    });

    map.on("load", populateMap.bind(this));

    function populateMap(mapEvent) {
        featureLayer = new FeatureLayer(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1",
            {
                outFields: ["*"]
            }
        );

        featureLayer.setRenderer(createBreaksRenderer());
        
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
});
