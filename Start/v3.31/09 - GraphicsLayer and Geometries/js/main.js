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
        //55.3142381, 25.2627104
        /*
        [
            [55.31447949881032, 25.262177354799324],
            [55.314809410519054, 25.26255940108485],
            [55.315277455992, 25.262201611742082],
            [55.31496229643286, 25.26184018279316],
            [55.31447949881032, 25.262177354799324]
        ]
        */
        /*
        [
            [
                [55.31430783743347, 25.262518164400824],
                [55.31397524351558, 25.26255212402402],
                [55.31376066679435, 25.26266855694573],
                [55.31370702261405, 25.26277528702586],
                [55.31370165819601, 25.262877165651208],
                [55.31374457354026, 25.262998449617527]
            ]
        ]
        */
    }
});
