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
      setupBasicWidgets: function(view) {
        const homeBtn = new Home({
          view: view  
        });
  
        view.ui.add(homeBtn, "top-left");
        view.ui.move("zoom", "top-left");
  
        const basemaps = new BasemapGallery({
          view: view,
          container: "basemaps-container"
        });
  
        const layerList = new LayerList({
          view: view,
          selectionEnabled: true,
          container: "layers-container"
        });
      },
    };
  });
  