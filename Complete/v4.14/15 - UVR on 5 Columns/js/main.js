require(["esri/views/MapView", "esri/WebMap", "esri/widgets/Legend"], function(MapView, WebMap, Legend) {
    //esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";
    const webmap = new WebMap({
        portalItem: {
            id: "148e69e0dd2241b88a86c81a8da007f1"
        }
    });

    const mapview = new MapView({
        map: webmap,
        container: "viewDiv"
    });
    
    mapview.when(() => {
        const ourLayer = webmap.layers.getItemAt(0);

        ourLayer.renderer = {
            type: "unique-value",
            defaultSymbol: {
                type: "simple-marker",
                color: "red"
            },
            defaultLabel: "Not one of those categories",
            valueExpression: "Upper(Concatenate([$feature.ClassName, $feature.CategoryName, $feature.TypeName, $feature.InventoryStatus, $feature.Ownership], '_'))",
            uniqueValueInfos: [{
                value: "STRUCTURE_MANHOLE_STANDARD_IN-PLACE_OWN",
                label: "An owned standard manhole structure that is in place",
                symbol: {
                    type: "simple-marker",
                    color: "blue"
                }
            }]
        };

        const legend = new Legend({
            view: mapview,
            layerInfos: [
                {
                    layer: ourLayer
                }
            ]
        });

        mapview.ui.add(legend, "bottom-right");

    });
});
