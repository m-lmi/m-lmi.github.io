// mapConfig.js  Define the webScene and setting the environment
define([
    //"modules/mapConfig",
    //"modules/basicWidgets",
    //"modules/weatherDaylight",
    //"modules/measurementWidget",
    //"modules/cameraPosition",
    "esri/config",
    "esri/WebMap",
    "esri/views/SceneView",
    "esri/Map",
    "esri/WebScene",
    "esri/Basemap",
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
    "esri/symbols/LabelSymbol3D",
    "esri/symbols/TextSymbol3DLayer",
    "esri/symbols/LineSymbol3D",
    "esri/symbols/Symbol3D",
    "esri/layers/GroupLayer",  
    "esri/widgets/LayerList",
    "esri/layers/support/LabelClass",
    "esri/layers/GeoJSONLayer", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
    "esri/layers/SceneLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/OGCFeatureLayer",
    "esri/layers/WMSLayer",
    "esri/layers/WFSLayer",
    "esri/renderers/UniqueValueRenderer",
    "esri/layers/WebTileLayer",
    "esri/geometry/SpatialReference",
    "esri/layers/support/TileInfo",
    ], function(
      //MapConfig,
      //BasicWidgets,
      //WeatherDaylight,
      //MeasurementWidget,
      //CameraPosition,
      esriConfig,
      WebMap,
      SceneView,
      Map,
      WebScene, 
      Basemap,
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
      LabelSymbol3D,
      TextSymbol3DLayer,
      LineSymbol3D,
      Symbol3D,
      GroupLayer, 
      LayerList, 
      LabelClass,
      GeoJSONLayer,
      SceneLayer,
      FeatureLayer,
      OGCFeatureLayer,
      WMSLayer,
      WFSLayer,
      UniqueValueRenderer,
      WebTileLayer,
      SpatialReference, 
      TileInfo,
      ) {
      return {
        setupLayers: function() {

            /*
        // load webscene from ArcGIS Online
            const terrain3d = new WebScene({
                portalItem: {
                id: "7029fb60158543ad845c7e1527af11e4"
                }
            });
            */

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
            legendUrl: ""}, // Url for legend image as png
            {
            name: "IS_50V:vatnafar_linur", // Layer to filter out from WMS
            title: "Vatnafar línur", // title for in legend
            lengedUrl: ""}, // Url for legend image as png
            {
            name: "IS_50V:ornefni_linur", // Layer to filter out from WMS
            title: "Örnefni línur", // title for in legend
            lengedUrl: ""}, // Url for legend image as png
        ]}); 

        // Constructing the renderer
        const rendererVatnafarL = {
            type: "simple",
            symbol: {
              type: "simple-line", // Use simple-line for 2D lines
              color: "steelblue", // Set the color of the line
              width: 2 // Adjust the width of the line
            }
          };
        
        // Vatnafar Línur
        const vatnafarLinur = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/vatnafar_linur/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:vatnafar_linur&outputFormat=json",
            copyright: "Landmælingar Íslands IS50V",
            visible: true, 
            title: "Vatnafar Línur",
            renderer: rendererVatnafarL,
            });
        
        const rendererVatnafarF = {
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
          };

        // Vatnafar Flákar
        const vatnafarFlakar = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/vatnafar_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:vatnafar_flakar&outputFormat=json",
            copyright: "Landmælingar Íslands IS50V",
            visible: true, 
            title: "Vatnafar Flakar",
            renderer: rendererVatnafarF,
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

        // Constructing the renderer
        const rendererSveitarfelag = {
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
          };

        const sveitarfelagLayer = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/mork_sveitarf_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:mork_sveitarf_flakar&outputFormat=json",
            copyright: "Landmælingar Íslands IS50V",
            visible: false, 
            popupTemplate: templateSveitarfelag,
            renderer: rendererSveitarfelag,
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
                        //popupTemplate: templateObyggdanefnd,
                        renderer: rendererObyggdanefnd,
                        opacity: 0.7,
                    });

                    obnLayer.add(singleFeatureOBNLayer); // Add the FeatureLayer to the GroupLayer
                });
            });
        });

        // Örnefni
        // Define a renderer that displays only the text labels
        const labelRenderer = {
            type: "simple", // Use a simple renderer
            symbol: {
            type: "text", // Use text symbol for rendering labels
            color: "black", // Set the text color
            haloColor: "white", // Set halo (background) color for better visibility
            haloSize: 1, // Adjust the halo size if needed
            font: { // Define font properties for the text label
                size: 20, // Set the font size
                family: "Arial" // Set the font family
                // Add other font properties if required
            },
            labelPlacement: "above-center", // Adjust label placement as per your preference
            labelExpressionInfo: {
                expression: "$feature.ornefni" // Replace 'labelField' with the field name containing label text
            }
            }
        };

        const ornefni = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_50V%3Aornefni_flakar&maxFeatures=100000&outputFormat=application%2Fjson",
            copyright: "Landmælingar Íslands IS50V",
            renderer: labelRenderer,
            visible: false, 
            title: "Örnefni",
            });

        // Örnefni Flákar
        // Create a labeling renderer for the ornefni attribute in polygons

        const ornefniFlakar = new GeoJSONLayer({
          url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_flakar&outputFormat=json",
          copyright: "Landmælingar Íslands IS50V",
          visible: true, 
          title: "Örnefni flakar",
          elevationInfo: {mode: "on-ground"},
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
          elevationInfo: {mode: "on-ground"},
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
          elevationInfo: {mode: "on-ground"}, //https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#elevationInfo
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

        // Create a GroupLayer to contain örnefni
        const ornefniLayer = new GroupLayer({
          title: "Örnefni",
          visible: false,
          layers: [ornefniFlakar, ornefniLinur, ornefniPunktar],
         });

        // Loftmyndir XYZ
        const tileInfo = new TileInfo({
          spatialReference: {
            wkid: 3057 // Set the WKID for EPSG:3057 projection
          },
          origin: {
            x: -161616,
            y: -72.00000049173832
          },
          lods: [
            { level: 0, resolution: 4096 },
            { level: 1, resolution: 2048 },
            { level: 2, resolution: 1024},
            { level: 3, resolution: 512 },
            { level: 4, resolution: 256 },
            { level: 5, resolution: 128 },
            { level: 6, resolution: 64 },
            { level: 7, resolution: 32 },
            { level: 8, resolution: 16 },
            { level: 9, resolution: 8 },
            { level: 10, resolution: 4 },
            { level: 11, resolution: 2 },
            { level: 12, resolution: 1 },
            { level: 13, resolution: 0.5 },
            { level: 14, resolution: 0.25 },
            { level: 15, resolution: 0.125 },
            { level: 16, resolution: 0.0625 },
            // Add other levels as per your requirement
          ],
          size: [512, 512] // Tile size
        });

        const loftmyndirLayer = new WebTileLayer({
          urlTemplate: "https://ms.map.is/mapcache/tms/1.0.0/myndkort_512@isn93_512/{z}/{x}/{-y}.jpg",
          title: "Loftmyndir",
          copyright: 'Map data from &copy; <a href="https://www.loftmyndir.is/" target="_blank">Loftmyndir</a>',
          spatialReference: {
            wkid: 3057 // Set the WKID for EPSG:3057 projection
          },
          //tileInfo: tileInfo, // Set the custom tile information
          //crossOrigin: null, // Set the cross-origin policy
          // Define the extent if needed
          // extent: {
          //   xmin: 0,
          //   ymin: 0,
          //   xmax: 39913400.685578495,
          //   ymax: 40074944.685578
          // }
        });


        // Load a basemap from https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap-id
        const map = new Map({
            basemap: "satellite",
            ground: "world-elevation",
            layers:[
                sveitarfelagLayer,
                wmsLayer,
                sceneLayer,
                //ornefni,
                ornefniLayer,
                vatnafarLayer,
                obnLayer,
                loftmyndirLayer
            ],
            });
        
        return map;
        }    
      };
    });
    