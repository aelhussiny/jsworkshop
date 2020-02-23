require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GraphicsLayer",
    "esri/tasks/QueryTask"
], function(Map, MapView, GraphicsLayer, QueryTask) {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [55.3142381, 25.2627104],
        zoom: 5
    });

    const graphicsLayer = new GraphicsLayer();

    view.when(() => {
        map.add(graphicsLayer);
    });
});
