require(["esri/views/MapView", "esri/WebMap"], function(MapView, WebMap) {
    //esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";
    const webmap = new WebMap({
        portalItem: {
            id: "589fa53e765a423692c07d0e0e7754a3"
        }
    });
    const view = new MapView({
        map: webmap,
        container: "viewDiv"
    });
});
