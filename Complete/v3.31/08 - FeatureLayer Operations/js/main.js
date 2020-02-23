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

    on(
        this.filter,
        "click",
        function(clickEvent) {
            featureLayer.setDefinitionExpression("Confirmed >= 100");
        }.bind(this)
    );

    function populateMap(mapEvent) {
        featureLayer = new FeatureLayer(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1",
            {
                outFields: ["*"]
            }
        );

        featureLayer.setRenderer(createBreaksRenderer());
        featureLayer.setInfoTemplate(createInfoTemplate());

        on(
            featureLayer,
            "click",
            function(clickEvent) {
                this.lastSelectedDiv.innerText =
                    clickEvent.graphic.attributes.Country_Region +
                    " - " +
                    clickEvent.graphic.attributes.Province_State;
            }.bind(this)
        );

        mapEvent.map.addLayer(featureLayer);
    }

    function createInfoTemplate() {
        var template = new InfoTemplate();
        template.setTitle("<b>${Country_Region} - ${Province_State}</b>");
        template.setContent(
            "The province/state of ${Province_State} in ${Country_Region} has ${Confirmed} cases, ${Recovered} of which recovered, and ${Deaths} of which died. <br/> This information was last updated on ${Last_Update}."
        );
        return template;
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
