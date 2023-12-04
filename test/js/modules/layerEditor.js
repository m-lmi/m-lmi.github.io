// mapConfig.js  Define the webScene and setting the environment
define([
    "esri/config",
    "esri/Map",
    "esri/widgets/Editor",
    "esri/widgets/Expand",
    //"esri/core/promiseUtils",
    //"esri/core/reactiveUtils", 
    "esri/widgets/LayerList",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    ], function(
      esriConfig,
      Map,
      Editor,
      Expand,
      //promiseUtils,
      //reactiveUtils, 
      LayerList, 
      FeatureLayer,
      GroupLayer,
      ) {
      return {
        editLayer: function(map, mapView) {
    
        const obnDynamicLayer = new FeatureLayer({
          title: "Óbyggðanefnd breytilegt",
          url: "https://services.arcgis.com/oMbONQQmfNuIEo3g/arcgis/rest/services/obnEditFeatures/FeatureServer/",
          editable: true,
          visible: true,
          elevationInfo: {
            mode: "on-the-ground"
          },
          renderer: {
            type: "unique-value",
            field: "fid",
            symbol: {
              type: "simple-line",
              style: "solid",
              color: "black",
              width: 3,
            },
            uniqueValueInfos: [
          { value:1, symbol: {type: "simple-line", color: "red", width: 6,}},
          { value:2, symbol: {type: "simple-line", color: "green", width: 3}},
          { value:3, symbol: {type: "simple-line", color: "gold", width: 3}},
          { value:4, symbol: {type: "simple-line", color: "indigo", width: 3}},
          { value:5, symbol: {type: "simple-line", color: "blue", width: 3}},
          { value:6, symbol: {type: "simple-line", color: "fuchsia", width: 3}},
          { value:7, symbol: {type: "simple-line", color: "darkorange", width: 3}},
          { value:8, symbol: {type: "simple-line", color: "chartreuse", width: 3}},
          { value:9, symbol: {type: "simple-line", color: "aqua", width: 3}},
            ],
            defaultSymbol: {
                type: "simple-line",
                color: "white", // Default color if value doesn't match any uniqueValueInfos
                opacity: 0.8, // Opacity set to 70% (0.7)
                style: "solid",
                color: "black",
                width: 3
              }
          },
          popupTemplate: {
            title: "Mörk {fid}: {athugasemdir}", // Title for the popup
            content: [
                {
                    type: "text",
                    text: "{gogn}"
                }
            ]
        },
          opacity: 0.8,
          maxScale: 0
        });
        

         // Create the FeatureLayer with multiple polygons
         const obnLoadLayer = new FeatureLayer({
            url: "https://services.arcgis.com/oMbONQQmfNuIEo3g/arcgis/rest/services/obyggdanefnd_dranga_epsg3857/FeatureServer/",
        });

        // Create a GroupLayer to contain individual polygons
        const obnEditGroup = new GroupLayer({
            title: "Óbyggðanefnd óbreytt",
            visible: false,
            editable: false,
            elevationInfo: {
                mode: "on-the-ground"
            }
        });        

        // Create the Editor widget with the "test" feature layer
        const editor = new Editor({
        view: mapView,
        container: "editor-container",
        featureLayers: obnDynamicLayer // Include only the "test" feature layer
        
        });
    
        // Add the Editor widget to the top-right of the view
        map.add(obnDynamicLayer)
        mapView.ui.add(editor, "editor-container");

        return mapView;
        }    
      };
    });
    