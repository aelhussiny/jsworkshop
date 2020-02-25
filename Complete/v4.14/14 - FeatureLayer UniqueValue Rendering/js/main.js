require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer) {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-157.30362066931707, 20.64371310839735],
        zoom: 8
    });

    const getRenderer = () => {
        return {
            type: "unique-value",
            field: "type",
            defaultSymbol: {
                type: "simple-marker",
                color: "gray"
            },
            uniqueValueInfos: [
                {
                    value: "BED & BREAKFAST",
                    symbol: {
                        type: "picture-marker",
                        url:
                            "https://image.flaticon.com/icons/png/512/575/575426.png",
                        width: "32px",
                        height: "32px"
                    }
                },
                {
                    value: "CONDOMINIUM HOTEL",
                    symbol: {
                        type: "picture-marker",
                        url:
                            "https://cdn.iconscout.com/icon/premium/png-256-thumb/condominium-4-900358.png",
                        width: "32px",
                        height: "32px"
                    }
                },
                {
                    value: "HOSTEL",
                    symbol: {
                        type: "picture-marker",
                        url:
                            "https://cdn.iconscout.com/icon/premium/png-256-thumb/bunk-bed-23-680415.png",
                        width: "32px",
                        height: "32px"
                    }
                },
                {
                    value: "HOTEL",
                    symbol: {
                        type: "picture-marker",
                        url:
                            "https://cdn0.iconfinder.com/data/icons/hotel-icons-rounded/110/Hotel-2-512.png",
                        width: "32px",
                        height: "32px"
                    }
                },
                {
                    value: "TIMESHARE",
                    symbol: {
                        type: "picture-marker",
                        url:
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Circle-icons-clock.svg/1200px-Circle-icons-clock.svg.png",
                        width: "32px",
                        height: "32px"
                    }
                },
                {
                    value: "INDIVIDUAL VACATION UNIT",
                    symbol: {
                        type: "picture-marker",
                        url:
                            "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Beach-512.png",
                        width: "32px",
                        height: "32px"
                    }
                },
                {
                    value: "APARTMENT/ HOTEL",
                    symbol: {
                        type: "picture-marker",
                        url:
                            "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-black-round/254000/26-512.png",
                        width: "16px",
                        height: "16px"
                    }
                }
            ]
        };
    };

    view.when(() => {
        const featureLayer = new FeatureLayer({
            url:
                "http://geodata.hawaii.gov/arcgis/rest/services/BusinessEconomy/MapServer/2",
            renderer: getRenderer()
        });

        map.add(featureLayer);
    });
});
