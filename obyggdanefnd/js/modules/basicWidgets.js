/***********************************
* Add Basemap gallery to allow for additional basemaps
***********************************/
// author:Landmælingar Íslands
define([
    "esri/widgets/Home",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
  ], function(Home, BasemapGallery, LayerList) {
    return {
      setupBasicWidgets: function(mapView) {
        const homeBtn = new Home({
          view: mapView  
        });
  
        mapView.ui.add(homeBtn, "top-left");
        mapView.ui.move("zoom", "top-left");
  
        const basemaps = new BasemapGallery({
          view: mapView,
          container: "basemaps-container"
        });
  
        const layerList = new LayerList({
          view: mapView,
          selectionEnabled: true,
          container: "layers-container"
        });
      },
    };
  });
  