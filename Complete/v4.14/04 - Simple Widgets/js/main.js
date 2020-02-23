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
    view.when(() => {
        //Legend Widget
        const featureLayer = webmap.layers.getItemAt(0);

        const legend = new Legend({
            view: view,
            layerInfos: [
                {
                    layer: featureLayer
                }
            ]
        });

        view.ui.add(legend, "bottom-right");

        //Basemap Gallery widget inside Expand widget
        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        const bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });

        view.ui.add(bgExpand, "top-left");

        //Locate Widget
        const locateBtn = new Locate({
            view: view
        });

        view.ui.add(locateBtn, {
            position: "top-left"
        });

        //Home Widget
        const homeBtn = new Home({
            view: view
        });

        view.ui.add(homeBtn, "top-left");
    });
});
