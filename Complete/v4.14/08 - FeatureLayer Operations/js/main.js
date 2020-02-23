require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "dojo/on"
], function(Map, MapView, FeatureLayer, on) {
    const getSymbol = color => {
        return {
            type: "simple-marker",
            color: color,
            style: "circle",
            outline: {
                width: 1,
                color: "black"
            },
            size: 20
        };
    };

    const getBreaksRenderer = () => {
        return {
            type: "class-breaks",
            field: "Confirmed",
            defaultSymbol: getSymbol(),
            defaultLabel: "No Data",
            classBreakInfos: [
                {
                    minValue: 0,
                    maxValue: 25,
                    symbol: getSymbol([56, 168, 0, 0.5]),
                    label: "< 25"
                },
                {
                    minValue: 25,
                    maxValue: 75,
                    symbol: getSymbol([139, 209, 0, 0.5]),
                    label: "25 - 75"
                },
                {
                    minValue: 75,
                    maxValue: 175,
                    symbol: getSymbol([255, 255, 0, 0.5]),
                    label: "75 - 175"
                },
                {
                    minValue: 175,
                    maxValue: 400,
                    symbol: getSymbol([255, 128, 0, 0.5]),
                    label: "175 - 400"
                },
                {
                    minValue: 400,
                    maxValue: Infinity,
                    symbol: getSymbol([255, 0, 0, 0.5]),
                    label: "400+"
                }
            ]
        };
    };

    const getPopupTemplate = () => {
        return {
            title: "<b>{Country_Region} - {Province_State}</b>",
            content:
                "The province/state of {Province_State} in {Country_Region} has {Confirmed} cases, {Recovered} of which recovered, and {Deaths} of which died. <br/> This information was last updated on {Last_Update}."
        };
    };

    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [107.3326697, 31.6252114],
        zoom: 3
    });

    view.when(() => {
        const featureLayer = new FeatureLayer({
            url:
                "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1",
            outFields: ["*"],
            renderer: getBreaksRenderer(),
            popupTemplate: getPopupTemplate()
        });

        map.add(featureLayer);

        view.on("click", event => {
            view.hitTest(event).then(response => {
                if (response.results.length > 0) {
                    const graphic = response.results.filter(function(result) {
                        return result.graphic.layer === featureLayer;
                    })[0].graphic;
                    this.lastSelectedDiv.innerText =
                        graphic.attributes.Country_Region +
                        " - " +
                        graphic.attributes.Province_State;
                }
            });
        });

        on(this.filter, "click", clickEvent => {
            featureLayer.definitionExpression = "Confirmed >= 100";
        });
    });
});
