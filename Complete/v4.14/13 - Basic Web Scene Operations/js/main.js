require([
    "esri/views/SceneView",
    "esri/WebScene",
    "esri/layers/SceneLayer"
], function(SceneView, WebScene, SceneLayer) {
    //esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";
    const webscene = new WebScene({
        portalItem: {
            id: "e88c3195d7254dbabdd2291d5953d2ba"
        }
    });
    const view = new SceneView({
        map: webscene,
        container: "viewDiv"
    });

    view.on("click", () => {
        webscene.add(
            new SceneLayer(
                "https://tiles.arcgis.com/tiles/hUPR9iC6qnMcwWsa/arcgis/rest/services/Buildings_AbuDhabi/SceneServer"
            )
        );
    });
});
