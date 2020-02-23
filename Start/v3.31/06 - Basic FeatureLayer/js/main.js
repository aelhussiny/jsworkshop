require(["esri/map", "esri/layers/FeatureLayer"], function(Map, FeatureLayer) {
    var map = new Map("map", {
        center: [55.3142381, 25.2627104],
        zoom: 5,
        basemap: "topo"
    });
});
