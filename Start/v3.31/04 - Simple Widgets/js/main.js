require([
    "esri/arcgis/utils",
    "esri/dijit/Legend",
    "esri/dijit/BasemapGallery",
    "dojo/on",
    "dojo/dom-style",
    "esri/dijit/LocateButton",
    "esri/dijit/HomeButton"
], function(
    arcgisUtils,
    Legend,
    BasemapGallery,
    on,
    domStyle,
    LocateButton,
    HomeButton
) {
    arcgisUtils
        .createMap("589fa53e765a423692c07d0e0e7754a3", "map")
        .then(function(response) {
            var map = response.map;
        });
});
