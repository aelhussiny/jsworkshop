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

        const gp = new Geoprocessor({
            url:
                "https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed",
            outputSpatialReference: { wkid: 4326 }
        });

        const computeViewShed = graphic => {
            gp.execute({
                Input_Observation_Point: new FeatureSet({
                    features: [graphic]
                }),
                Viewshed_Distance: new LinearUnit({
                    distance: 5,
                    units: "esriMiles"
                })
            }).then(response => {
                response.results[0].value.features.forEach(feature => {
                    graphicsLayer.add({
                        geometry: feature.geometry,
                        symbol: {
                            type: "simple-fill",
                            color: [255, 127, 0, 0.7],
                            style: "solid",
                            outline: {
                                width: 1,
                                color: "black"
                            }
                        }
                    });
                });
            });
        };

        view.on("click", event => {
            const graphic = {
                geometry: event.mapPoint,
                symbol: {
                    type: "simple-marker",
                    color: [150, 150, 150, 0.5],
                    style: "circle",
                    outline: {
                        width: 1,
                        color: "black"
                    },
                    size: 20
                }
            };
            graphicsLayer.add(graphic);
            computeViewShed(graphic);
        });
    });
});
