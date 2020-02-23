require(["esri/arcgis/utils"], function(arcgisUtils) {
    //arcgisUtils.arcgisUrl = "http://pathto/portal/sharing/content/items";
    arcgisUtils
        .createMap("589fa53e765a423692c07d0e0e7754a3", "map")
        .then(function(response) {
            var map = response.map;
        });
});
