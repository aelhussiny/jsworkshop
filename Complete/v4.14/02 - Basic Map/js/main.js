require(["esri/Map", "esri/views/MapView"], function(Map, MapView) {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [55.3142381, 25.2627104],
        zoom: 19
    });
});
