// mapConfig.js  Define the webScene and setting the environment
define([
    "esri/config",
    "esri/WebMap",
    "esri/views/SceneView",
    "esri/Map",
    "esri/WebScene",
    //"esri/widgets/Search",
    "esri/widgets/Legend",
    //"esri/widgets/Home",
    "esri/widgets/Weather",
    "esri/widgets/Daylight",
    "esri/widgets/LayerList", //Layer list to turn on/off layers visibility
    //"esri/widgets/DirectLineMeasurement3D",
    //"esri/widgets/AreaMeasurement3D",
    //"esri/widgets/TimeSlider",
    "esri/widgets/Expand",
    //"esri/core/promiseUtils",
    //"esri/core/reactiveUtils",
    //"esri/geometry/ElevationLayer"
    "esri/layers/GroupLayer",  
    "esri/widgets/LayerList",
    "esri/layers/GeoJSONLayer", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
    "esri/layers/SceneLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/OGCFeatureLayer",
    "esri/layers/WMSLayer",
    "esri/layers/WFSLayer",
    "esri/renderers/UniqueValueRenderer",
    ], function(
      esriConfig,
      WebMap,
      SceneView,
      Map,
      WebScene, 
      //Search,
      Legend,
      //Home,
      Weather, 
      Daylight, 
      LayerList,
      //DirectLineMeasurement3D,
      //AreaMeasurement3D,
      //TimeSlider,
      Expand,
      //promiseUtils,
      //reactiveUtils,
      //ElevationLayer   
      GroupLayer, 
      LayerList, 
      GeoJSONLayer,
      SceneLayer,
      FeatureLayer,
      OGCFeatureLayer,
      WMSLayer,
      WFSLayer,
      UniqueValueRenderer
      ) {
      return {
        setupLayers: function() {

        // Create SceneLayer from a Scene Service URL
        const sceneLayer = new SceneLayer({
            url: "https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer",
            title: "OpenStreetMaps 3D Buildings",
            visible: false,
            copyright: "Data from ESRI"
        });

        // Print the names of all sublayers used for rendering.
        const wmsLayer = new WMSLayer({
        url: "https://gis.lmi.is/geoserver/IS_50V/wms?service=WMS&version=1.1.0",
        title: "Landmælingar Íslands IS 50V",
        visible: false, 
        sublayers: [{
            name: "IS_50V:samgongur_linur", // layer to filter out from WMS
            title: "Samgöngur línur", // title for in legend
            },
            {
            name: "IS_50V:vatnafar_linur", // Layer to filter out from WMS
            title: "Vatnafar línur", // title for in legend
            },
            {
            name: "IS_50V:ornefni_linur", // Layer to filter out from WMS
            title: "Örnefni línur", // title for in legend
            },
        ]}); 
        
        // Vatnafar Línur
        const vatnafarLinur = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/vatnafar_linur/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:vatnafar_linur&outputFormat=json",
            copyright: "Landmælingar Íslands IS50V",
            visible: true, 
            title: "Vatnafar Línur",
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-line", // Use simple-line for 2D lines
                color: "steelblue", // Set the color of the line
                width: 2 // Adjust the width of the line
              }
            },
            });

        // Vatnafar Flákar
        const vatnafarFlakar = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/vatnafar_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:vatnafar_flakar&outputFormat=json",
            copyright: "Landmælingar Íslands IS50V",
            visible: true, 
            title: "Vatnafar Flakar",
            renderer: {
              type: "simple",
              symbol: {
                type: "polygon-3d",
                symbolLayers: [
                  {
                    type: "fill",
                    material: {
                      color: "steelblue"
                    },
                    outline: {
                      color: "steelblue",
                      size: 1 // Adjust the outline size as needed
                    }
                  }
                ]
              },
              elevationInfo: {
                mode: "on-the-ground" // Set elevation mode to 'on-the-ground'
              }
            },
            });

        // Group the Vatnafar layers into one grouped layer    
        const vatnafarLayer = new GroupLayer({
            title: "Vatnafar", // Title for the group layer
            visible: false, // Set visibility of the group layer
            layers: [vatnafarLinur, vatnafarFlakar] // Add the GeoJSONLayers as sublayers
            });

        // Mörk Sveitarfélag
        const templateSveitarfelag = {
            title: "{sveitarfelag}",
            fieldInfos: [
              {
                fieldName: 'sveitarfelag',
              }
            ]
          };

        const morkSveitarfelag = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/mork_sveitarf_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:mork_sveitarf_flakar&outputFormat=json",
            copyright: "Landmælingar Íslands IS50V",
            visible: false, 
            popupTemplate: {
              title: "{sveitarfelag}",
              fieldInfos: [
                {
                  fieldName: 'sveitarfelag',
                }
              ]
            },
            renderer: {
            type: "unique-value",
            field: "nrsveitarfelags",
            symbol: {
              type: "simple-fill",
              outline: {
                color: "black",
              }
            },
            uniqueValueInfos: [
          { value:4200, symbol: {type: "simple-fill", color: "steelblue"}},
          { value:4901, symbol: {type: "simple-fill", color: "lightcoral"}},
          { value:4902, symbol: {type: "simple-fill", color: "khaki"}},
          { value:4911, symbol: {type: "simple-fill", color: "springgreen"}},
          { value:4803, symbol: {type: "simple-fill", color: "royalblue"}},
          { value:4100, symbol: {type: "simple-fill", color: "mediumorchid"}},
            ],
            defaultSymbol: {
                type: "simple-fill",
                color: "white", // Default color if value doesn't match any uniqueValueInfos
                opacity: 0.2, // Opacity set to 70% (0.7)
                outline: {
                  color: "black",
                  width: 1
                }
              }
          },
            title: "Mörk Sveitarfelag",
            opacity: 0.4,
            orderBy: {
                field: "nrsveitarfelags"
            }
            });

        // Add Feature layers
        const templateObyggdanefnd = {
            title: "{heiti}",
            fieldInfos: [
              {
                fieldName: 'heiti',
              }
            ]
          };

        // Constructing the renderer
        const rendererObyggdanefnd = {
            type: "unique-value",
            field: "fid",
            symbol: {
              type: "simple-fill",
              outline: {
                color: "black",
                width: 1,
              }
            },
            uniqueValueInfos: [
          { value:1, symbol: {type: "simple-fill", color: "steelblue"}},
          { value:2, symbol: {type: "simple-fill", color: "lightblue"}},
          { value:3, symbol: {type: "simple-fill", color: "blue"}},
          { value:4, symbol: {type: "simple-fill", color: "skyblue"}},
          { value:5, symbol: {type: "simple-fill", color: "royalblue"}},
          { value:6, symbol: {type: "simple-fill", color: "dodgerblue"}},
          { value:7, symbol: {type: "simple-fill", color: "deepskyblue"}},
          { value:8, symbol: {type: "simple-fill", color: "cadetblue"}},
          { value:9, symbol: {type: "simple-fill", color: "darkblue"}},
            ],
            defaultSymbol: {
                type: "simple-fill",
                color: "white", // Default color if value doesn't match any uniqueValueInfos
                opacity: 0.2, // Opacity set to 70% (0.7)
                outline: {
                  color: "black",
                  width: 1
                }
              }
          };

        /* 
        const obnLayer = new FeatureLayer({
            url: "https://services.arcgis.com/oMbONQQmfNuIEo3g/arcgis/rest/services/obyggdanefnd_dranga_epsg3857/FeatureServer",
            title: "Óbyggdanefnd",
            visible: true, 
            popupTemplate: templateObyggdanefnd,
            renderer: rendererObyggdanefnd,
            opacity: 0.4,
        });
        obnLayer.elevationInfo ={
            mode: "on-the-ground",
        };*/

// Create the FeatureLayer with multiple polygons
const obnLoadLayer = new FeatureLayer({
    url: "https://services.arcgis.com/oMbONQQmfNuIEo3g/arcgis/rest/services/obyggdanefnd_dranga_epsg3857/FeatureServer",
});

// Create a GroupLayer to contain individual polygons
const obnLayer = new GroupLayer({
    title: "Óbyggðanefnd",
    visible: true
});
obnLayer.elevationInfo ={
    mode: "on-the-ground",
};

// Fetch features from the FeatureLayer and create individual FeatureLayers for each polygon
obnLoadLayer.load().then(() => {
    // Get the features
    obnLoadLayer.queryFeatures().then((result) => {
        const features = result.features;

        // Create a FeatureLayer for each individual polygon
        features.forEach((feature, index) => {
            const singleFeatureOBNLayer = new FeatureLayer({
                source: [feature], // Provide the individual feature
                objectIdField: "fid", // Replace with your object ID field
                title: `Mörk ${index + 1}`, // Title for the layer
                visible: true, // Set initial visibility as needed
                // Add any other properties or configurations for the layer
                popupTemplate: {
                  title: `Mörk ${index + 1}`,
                  content: [
                      {
                          type: "text", // Use "text" for simple text display
                          text: `Gögn: ${feature.attributes.gogn}`,
                      },
                      {
                        type: "text",
                        text: `Heiti: ${feature.attributes.heiti}`,
                    },
                    {
                      type: "text",
                      text: `Krafa: ${feature.attributes.krafa}`,
                  },
                    {
                      type: "text",
                      text: `Stutt: ${feature.attributes.stutt}`, 
                  },
                  ],
              },
                renderer: {
                  type: "unique-value",
                  field: "fid",
                  symbol: {
                    type: "simple-fill",
                    outline: {
                      color: "black",
                      width: 1,
                    }
                  },
                  uniqueValueInfos: [
                { value:1, symbol: {type: "simple-fill", color: "steelblue"}},
                { value:2, symbol: {type: "simple-fill", color: "lightblue"}},
                { value:3, symbol: {type: "simple-fill", color: "blue"}},
                { value:4, symbol: {type: "simple-fill", color: "skyblue"}},
                { value:5, symbol: {type: "simple-fill", color: "royalblue"}},
                { value:6, symbol: {type: "simple-fill", color: "dodgerblue"}},
                { value:7, symbol: {type: "simple-fill", color: "deepskyblue"}},
                { value:8, symbol: {type: "simple-fill", color: "cadetblue"}},
                { value:9, symbol: {type: "simple-fill", color: "darkblue"}},
                  ],
                  defaultSymbol: {
                      type: "simple-fill",
                      color: "white", // Default color if value doesn't match any uniqueValueInfos
                      opacity: 0.2, // Opacity set to 70% (0.7)
                      outline: {
                        color: "black",
                        width: 1
                      }
                    }
                },
                opacity: 0.4,
            });

            obnLayer.add(singleFeatureOBNLayer); // Add the FeatureLayer to the GroupLayer
        });
    });
});

        // Örnefni

        // Define a renderer that displays only the text labels
        const ornefniFlakar = new GeoJSONLayer({
          url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_flakar&outputFormat=json",
          copyright: "Landmælingar Íslands IS50V",
          visible: true, 
          title: "Örnefni flakar",
          elevationInfo: {mode: "on-the-ground"},
          renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "polygon-3d", // autocasts as new PolygonSymbol3D()
              symbolLayers: [
                {
                  type: "fill", // autocasts as new FillSymbol3DLayer()
                  material: {
                    color: [255, 255, 255, 0.3], // Set the color of the polygons
                  },
                  outline: {
                    color: "black", // Set the outline color of the polygons
                    size: 0.5 // Set the outline size of the polygons
                  }
                }
              ]
            }
          },
          outFields: ["*"],
          // Add labels with callouts of type line to the icons
          labelingInfo: [
            {
              // When using callouts on labels, "above-center" is the only allowed position
              labelPlacement: "above-center",
              labelExpressionInfo: {
                value: "{ornefni}"
              },
              symbol: {
                type: "label-3d", // autocasts as new LabelSymbol3D()
                symbolLayers: [
                  {
                    type: "text", // autocasts as new TextSymbol3DLayer()
                    material: {
                      color: "black"
                    },
                    halo: {
                      color: [255, 255, 255, 0.7],
                      size: 2
                    },
                    size: 10
                  }
                ],
                // Labels need a small vertical offset that will be used by the callout
                verticalOffset: {
                  screenLength: 50,
                  maxWorldLength: 2000,
                  minWorldLength: 30
                },
                // The callout has to have a defined type (currently only line is possible)
                // The size, the color and the border color can be customized
                callout: {
                  type: "line", // autocasts as new LineCallout3D()
                  size: 0.5,
                  color: [0, 0, 0],
                  border: {
                    color: [255, 255, 255, 0.7]
                  }
                }
              }
            }
          ]
        });

        // Örnefni línur
        const ornefniLinur = new GeoJSONLayer({
          url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_linur/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_linur&outputFormat=json",
          copyright: "Landmælingar Íslands IS50V",
          visible: true, 
          title: "Örnefni línur",
          elevationInfo: {mode: "on-the-ground"},
          renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "line-3d", // Define the symbol type as line-3d
              symbolLayers: [
                {
                  type: "line",
                  material: {
                    color: [0, 0, 0, 0.7] // Set the color of the lines
                  },
                  size: 3 // Set the size of the lines (thicker line)
                },
                {
                  type: "line", // Define the symbol layer type as line
                  material: {
                    color: [255, 255, 255, 0.7] // Set the color of the lines
                  },
                  size: 2, // Set the size of the lines
                }
              ]
            }
          },
          outFields: ["*"],
          // Add labels with callouts of type line to the icons
          labelingInfo: [
            {
              // When using callouts on labels, "above-center" is the only allowed position
              labelPlacement: "above-center",
              labelExpressionInfo: {
                value: "{ornefni}"
              },
              symbol: {
                type: "label-3d", // autocasts as new LabelSymbol3D()
                symbolLayers: [
                  {
                    type: "text", // autocasts as new TextSymbol3DLayer()
                    material: {
                      color: "black"
                    },
                    halo: {
                      color: [255, 255, 255, 0.7],
                      size: 2
                    },
                    size: 10
                  }
                ],
                // Labels need a small vertical offset that will be used by the callout
                verticalOffset: {
                  screenLength: 50,
                  maxWorldLength: 2000,
                  minWorldLength: 30
                },
                // The callout has to have a defined type (currently only line is possible)
                // The size, the color and the border color can be customized
                callout: {
                  type: "line", // autocasts as new LineCallout3D()
                  size: 0.5,
                  color: [0, 0, 0],
                  border: {
                    color: [255, 255, 255, 0.7]
                  }
                }
              }
            }
          ]
        });

        // Örnefni punktar
        
        const ornefniPunktar = new GeoJSONLayer({
          url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_punktar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_punktar&outputFormat=json",
          copyright: "Landmælingar Íslands IS50V",
          visible: true, 
          title: "Örnefni punktar",
          //elevationInfo: {mode: "on-the-ground"}, //https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#elevationInfo
          renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "point-3d", // autocasts as new PointSymbol3D()
              symbolLayers: [
                {
                  type: "icon", // autocasts as new IconSymbol3DLayer()
                  resource: {
                    primitive: "circle"
                  },
                  material: {
                    color: "black"
                  },
                  size: 4
                }
              ]
            }
          },
          outFields: ["*"],
          // Add labels with callouts of type line to the icons
          labelingInfo: [
            {
              // When using callouts on labels, "above-center" is the only allowed position
              labelPlacement: "above-center",
              labelExpressionInfo: {
                value: "{ornefni}"
              },
              symbol: {
                type: "label-3d", // autocasts as new LabelSymbol3D()
                symbolLayers: [
                  {
                    type: "text", // autocasts as new TextSymbol3DLayer()
                    material: {
                      color: "black"
                    },
                    halo: {
                      color: [255, 255, 255, 0.7],
                      size: 2
                    },
                    size: 10
                  }
                ],
                // Labels need a small vertical offset that will be used by the callout
                verticalOffset: {
                  screenLength: 50,
                  maxWorldLength: 2000,
                  minWorldLength: 30
                },
                // The callout has to have a defined type (currently only line is possible)
                // The size, the color and the border color can be customized
                callout: {
                  type: "line", // autocasts as new LineCallout3D()
                  size: 0.5,
                  color: [0, 0, 0],
                  border: {
                    color: [255, 255, 255, 0.7]
                  }
                }
              }
            }
          ]
        });

        const ornefniLayer = new GroupLayer({
          title: "Örnefni",
          visible: false,
          layers: [ornefniFlakar, ornefniLinur, ornefniPunktar],
         });

        // Load a basemap from https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap-id
        const map = new Map({
            basemap: "satellite",
            ground: "world-elevation",
            layers:[
                morkSveitarfelag,
                wmsLayer,
                sceneLayer,
                ornefniLayer,
                vatnafarLayer,
                obnLayer,
            ],
            });
        
        return map;
        }    
      };
    });
    