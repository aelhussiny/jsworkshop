require([
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/geometry/Polyline",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/InfoTemplate"
], function(
    Map,
    GraphicsLayer,
    Graphic,
    Point,
    Polygon,
    Polyline,
    SimpleMarkerSymbol,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    InfoTemplate
) {
    var map = new Map("map", {
        center: [55.3142381, 25.2627104],
        zoom: 20,
        basemap: "topo"
    });

    map.on("load", populateMap);

    function populateMap(mapEvent) {
        var graphicsLayer = new GraphicsLayer();

        mapEvent.map.addLayer(graphicsLayer);

        //First Graphic
        var geometry = new Point(55.3142381, 25.2627104);

        var symbol = new SimpleMarkerSymbol().setColor(
            new Color([150, 150, 150, 0.5])
        );

        var attributes = {
            name: "Etisalat Deira Office",
            owningEntity: "Etisalat",
            bestRestaurant: "Tim Hortons Express",
            hasParking: true
        };

        var infoTemplate = new InfoTemplate({
            title: "<b>${name}</b>",
            content:
                "${name} is owned by ${owningEntity}. The best restaurant in it is ${bestRestaurant}. It " +
                (attributes.hasParking ? "has" : "doesn't have") +
                " parking."
        });

        graphicsLayer.add(
            new Graphic(geometry, symbol, attributes, infoTemplate)
        );

        //Second Graphic
        var polygon = new Polygon([
            [55.31447949881032, 25.262177354799324],
            [55.314809410519054, 25.26255940108485],
            [55.315277455992, 25.262201611742082],
            [55.31496229643286, 25.26184018279316],
            [55.31447949881032, 25.262177354799324]
        ]);
        polygonSymbol = new SimpleFillSymbol().setColor(
            new Color([150, 150, 150, 0.5])
        );

        graphicsLayer.add(new Graphic(polygon, polygonSymbol));

        //Third Graphic
        var polyline = new Polyline({
            paths: [
                [
                    [55.31430783743347, 25.262518164400824],
                    [55.31397524351558, 25.26255212402402],
                    [55.31376066679435, 25.26266855694573],
                    [55.31370702261405, 25.26277528702586],
                    [55.31370165819601, 25.262877165651208],
                    [55.31374457354026, 25.262998449617527]
                ]
            ],
            spatialReference: { wkid: 4326 }
        });
        var polylineSymbol = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_DASH,
            new Color([150, 150, 150, 0.8]),
            3
        );
        graphicsLayer.add(new Graphic(polyline, polylineSymbol));
    }
});
