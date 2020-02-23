var map, toolbar, symbol, geomTask;

require([
    "esri/arcgis/utils",
    "esri/toolbars/draw",
    "esri/graphic",

    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",

    "dojo/parser",
    "dijit/registry",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Button",
    "dijit/WidgetSet",
    "dojo/domReady!"
], function(
    arcgisUtils,
    Draw,
    Graphic,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    parser,
    registry
) {
    parser.parse();

    arcgisUtils
        .createMap("589fa53e765a423692c07d0e0e7754a3", "map")
        .then(function(response) {
            map = response.map;
        });
});
