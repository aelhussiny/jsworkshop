require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GraphicsLayer",
    "esri/tasks/Geoprocessor",
    "esri/tasks/support/LinearUnit",
    "esri/tasks/support/FeatureSet"
], function(Map, MapView, GraphicsLayer, Geoprocessor, LinearUnit, FeatureSet) {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [55.3142381, 25.2627104],
        zoom: 20
    });

    view.when(() => {
        const graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);
    });
});
