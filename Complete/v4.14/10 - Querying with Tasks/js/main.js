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

        const queryTask = new QueryTask(
            "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1"
        );
        queryTask
            .execute({
                where: "1=1",
                outSpatialReference: { wkid: 4326 },
                returnGeometry: true,
                outFields: ["*"]
            })
            .then(result => {
                result.features.forEach(feature => {
                    graphicsLayer.add({
                        geometry: feature.geometry,
                        symbol: {
                            type: "simple-marker",
                            color: [150, 150, 150, 0.5],
                            style: "circle",
                            outline: {
                                width: 1,
                                color: "black"
                            },
                            size: 20
                        },
                        attributes: feature.attributes
                    });
                });
            });
    });
});
