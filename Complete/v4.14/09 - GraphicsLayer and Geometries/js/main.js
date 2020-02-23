require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GraphicsLayer"
], function(Map, MapView, GraphicsLayer) {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [55.3142381, 25.2627104],
        zoom: 19
    });

    view.when(() => {
        const graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);

        //First Graphic
        graphicsLayer.add({
            geometry: {
                type: "point",
                longitude: 55.3142381,
                latitude: 25.2627104
            },
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
            attributes: {
                name: "Etisalat Deira Office",
                owningEntity: "Etisalat",
                bestRestaurant: "Tim Hortons Express",
                hasParking: true
            },
            popupTemplate: {
                title: "<b>{name}</b>",
                content:
                    "{name} is owned by {owningEntity}. The best restaurant in it is {bestRestaurant}. Has Parking: {hasParking}."
            }
        });

        //Second Graphic
        graphicsLayer.add({
            geometry: {
                type: "polygon",
                rings: [
                    [55.31447949881032, 25.262177354799324],
                    [55.314809410519054, 25.26255940108485],
                    [55.315277455992, 25.262201611742082],
                    [55.31496229643286, 25.26184018279316],
                    [55.31447949881032, 25.262177354799324]
                ]
            },
            symbol: {
                type: "simple-fill",
                color: [150, 150, 150, 0.5],
                style: "solid",
                outline: {
                    width: 1,
                    color: "black"
                }
            }
        });

        //Third Graphic
        graphicsLayer.add({
            geometry: {
                type: "polyline",
                paths: [
                    [
                        [55.31430783743347, 25.262518164400824],
                        [55.31397524351558, 25.26255212402402],
                        [55.31376066679435, 25.26266855694573],
                        [55.31370702261405, 25.26277528702586],
                        [55.31370165819601, 25.262877165651208],
                        [55.31374457354026, 25.262998449617527]
                    ]
                ]
            },
            symbol: {
                type: "simple-line",
                color: [150, 150, 150, 0.5],
                style: "dash",
                width: 3
            }
        });
    });
});
