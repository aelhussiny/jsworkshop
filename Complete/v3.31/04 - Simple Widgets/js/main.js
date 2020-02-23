require([
    "esri/arcgis/utils",
    "esri/dijit/Legend",
    "esri/dijit/BasemapGallery",
    "dojo/on",
    "dojo/dom-style",
    "esri/dijit/LocateButton",
    "esri/dijit/HomeButton"
], function(
    arcgisUtils,
    Legend,
    BasemapGallery,
    on,
    domStyle,
    LocateButton,
    HomeButton
) {
    arcgisUtils
        .createMap("589fa53e765a423692c07d0e0e7754a3", "map")
        .then(function(response) {
            var map = response.map;

            //Legend Widget
            var legend = new Legend(
                {
                    map: map,
                    layerInfos: arcgisUtils.getLegendLayers(response)
                },
                "legendDiv"
            );
            legend.startup();

            //Basemap Gallery Widget
            var basemapGallery = new BasemapGallery(
                {
                    showArcGISBasemaps: true,
                    map: map
                },
                "basemapGalleryDiv"
            );
            basemapGallery.startup();

            //Locate Button Widget
            var locateButton = new LocateButton(
                {
                    map: map
                },
                "locateBtnDiv"
            );
            locateButton.startup();

            //Home Button Widget
            var homeButton = new HomeButton(
                {
                    theme: "HomeButton",
                    map: map,
                    extent: null,
                    visible: true
                },
                "homeBtnDiv"
            );
            homeButton.startup();
        });

    on(
        this.basemapToggler,
        "click",
        function(event) {
            if (domStyle.get(this.basemapGalleryDiv, "display") === "block") {
                domStyle.set(this.basemapGalleryDiv, "display", "none");
            } else {
                domStyle.set(this.basemapGalleryDiv, "display", "block");
            }
        }.bind(this)
    );
});
