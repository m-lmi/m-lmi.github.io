/***********************************
* Add editor widget and editable layers
***********************************/
// author:Landmælingar Íslands
define([
    "esri/widgets/Editor",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    ], function(
      Editor,
      FeatureLayer,
      GroupLayer,
      ) {
      return {
        editLayer: function(map, view) {
    
        const obnDynamicLayer = new FeatureLayer({
          title: "Óbyggðanefnd breytilegt",
          url: "https://services.arcgis.com/oMbONQQmfNuIEo3g/arcgis/rest/services/obnEditFeatures/FeatureServer/",
          copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
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
          { value:1, symbol: {type: "simple-line", color: [139,0,139], width: 6,}},
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
                color: "white",
                opacity: 0.8,
                style: "solid",
                color: "black",
                width: 3
              }
          },
          popupTemplate: {
            title: "Mörk {fid}: {athugasemdir}",
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

        // Create the Editor widget with the "test" feature layer
        const editor = new Editor({
        view: view,
        container: "editor-container",
        featureLayers: obnDynamicLayer,
        });
    
        // Add the Editor widget to the top-right of the view
        map.add(obnDynamicLayer)
        view.ui.add(editor, "editor-container");

        return view;
        }    
      };
    });
    