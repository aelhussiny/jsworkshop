require([
    "esri/views/MapView",
    "esri/WebMap",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Locate",
    "esri/widgets/Home"
], function(MapView, WebMap, Legend, Expand, BasemapGallery, Locate, Home) {
    const webmap = new WebMap({
        portalItem: {
            id: "589fa53e765a423692c07d0e0e7754a3"
        }
    });
    const view = new MapView({
        map: webmap,
        container: "viewDiv"
    });
    view.when(() => {});
});
