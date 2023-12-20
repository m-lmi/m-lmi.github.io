/***********************************
* Load most of the basic layers
***********************************/
// author:Landmælingar Íslands
define([
    "esri/Map",
    "esri/layers/GroupLayer",  
    "esri/layers/GeoJSONLayer",
    "esri/layers/SceneLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/OGCFeatureLayer",
    "esri/layers/WMSLayer",
    "esri/layers/WFSLayer",
    "modules/multipointToPoint",
    ], function(
      Map, 
      GroupLayer, 
      GeoJSONLayer,
      SceneLayer,
      FeatureLayer,
      OGCFeatureLayer,
      WMSLayer,
      WFSLayer,
      MultipointToPoint,
      ) {
      return {
        setupLayers: function() {

        // Create SceneLayer from a Scene Service URL
        const sceneLayer = new SceneLayer({
            url: "https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer",
            title: "OpenStreetMaps 3D Buildings",
            visible: true,
            copyright: "Map data <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, Microsoft Building Footprints, Scene Layer by ESRI",
        });

        // Load a basemap from https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap-id
        const map = new Map({
          basemap: "satellite",
          ground: "world-elevation",
          layers:[sceneLayer,],
          });
        
        // Vatnafar Línur
        const vatnafarLinur = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/vatnafar_linur/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:vatnafar_linur&outputFormat=json",
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
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
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
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
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
            visible: false, // Set visibility of the group layer
            layers: [vatnafarLinur, vatnafarFlakar] // Add the GeoJSONLayers as sublayers
            });
          map.add(vatnafarLayer)

        const morkSveitarfelag = new GeoJSONLayer({
            url: "https://gis.lmi.is/geoserver/IS_50V/mork_sveitarf_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:mork_sveitarf_flakar&outputFormat=json",
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
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
        map.add(morkSveitarfelag,0)

        // Add Feature layer Obyggðanefnd

                //Þjóðlenðumörk Drangajökuls
                const thjodlendumork_drangajokuls = new GeoJSONLayer({
                  url: "https://gis.lmi.is/geoserver/obyggdanefnd/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=obyggdanefnd:thjodlendumork_drangajokuls&srsName=EPSG%3A4326&outputFormat=json",
                  title: "Þjóðlenðumörk Drangajökuls",
                  copyright: "<a href='https://obyggdanefnd.is/'>Óbyggðanefnd</a>",
                  visible: true, 
                  elevationInfo: {mode: "on-the-ground"},
                  popupTemplate: {
                    title: "Þjóðlenðumörk Drangajökuls",
                  },
                  renderer: {
                    type: "simple",
                    symbol: {
                      type: "simple-line", // Use simple-line for 2D lines
                      color: "red", // Set the color of the line
                      opacity: 0.8,
                      width: 5, // Adjust the width of the line
                      cap: "round",
                    }
                  },
                });
                map.add(thjodlendumork_drangajokuls);
        
                // Mörk SV10B - SV10A
                const morkSV10B10A = new GeoJSONLayer({
                  url: "https://gis.lmi.is/geoserver/obyggdanefnd/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=obyggdanefnd:mork-sv10b-sv10a&srsName=EPSG%3A4326&outputFormat=json",
                  copyright: "<a href='https://obyggdanefnd.is/'>Óbyggðanefnd</a>",
                  visible: true, 
                  title: "Mörk milli svæða SV10B-10A",
                  elevationInfo: {mode: "on-the-ground"},
                  popupTemplate: {
                    title: "Mörk milli svæða SV10B-10A",
                  },
                  renderer: {
                    type: "simple",
                    symbol: {
                      type: "simple-line", // Use simple-line for 2D lines
                      style: "dash",
                      color: "yellow", // Set the color of the line
                      opacity: 0.8,
                      width: 6, // Adjust the width of the line
                      cap: "round",
                    }
                  },
                  }); 
                map.add(morkSV10B10A)
        
                // Kröfur Rikisins SV10B
                const krofur_rikisins_sv10b_layer = new GeoJSONLayer({
                  url: "https://gis.lmi.is/geoserver/obyggdanefnd/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=obyggdanefnd:krofur_rikisins_sv10b&srsName=EPSG%3A4326&outputFormat=json",
                  copyright: "<a href='https://obyggdanefnd.is/'>Óbyggðanefnd</a>",
                  visible: true, 
                  title: "Kröfur ríkisins á svæði 10B",
                  elevationInfo: {mode: "on-the-ground"},
                  popupTemplate: {
                    title: "Kröfur ríkisins á svæði 10B",
                  },
                  renderer: {
                    type: "simple", // Specify the renderer type as 'simple'
                    symbol: {
                      type: "simple-line",
                      color: "black", // Set the color to black [R, G, B]
                      width: 2
                    }
                  },
                });
                map.add(krofur_rikisins_sv10b_layer)
                
        // Create the FeatureLayer with multiple polygons
        const obnLoadLayer = new FeatureLayer({
          url: "https://services.arcgis.com/oMbONQQmfNuIEo3g/arcgis/rest/services/obyggdanefnd_dranga_epsg3857/FeatureServer",
          copyright: "<a href='https://obyggdanefnd.is/'>Óbyggðanefnd</a>",
      });

      // Create a GroupLayer to contain individual polygons
      const obnLayer = new GroupLayer({
          title: "Óbyggðanefnd",
          copyright: "<a href='https://obyggdanefnd.is/'>Óbyggðanefnd</a>",
          visible: true,
          editable: false,
          elevationInfo: {mode: "on-the-ground",}
      });

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
                      title: `Mörk ${index + 1}: ${feature.attributes.athugasemdir}`, // Title for the layer
                      copyright: "<a href='https://obyggdanefnd.is/'>Óbyggðanefnd</a>",
                      visible: true, // Set initial visibility as needed
                      editable: false,
                      // Add any other properties or configurations for the layer
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
                      { value:4, symbol: {type: "simple-line", color: [50,0,200], width: 3}},
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
                        title: `Mörk ${index + 1}: ${feature.attributes.athugasemdir}`,
                        content: [
                            {
                                type: "text", // Use "text" for simple text display
                                text: `Gögn: ${feature.attributes.gogn}`,
                            },
                        ],
                    },
                      opacity: 1,
                  });
                  obnLayer.add(singleFeatureOBNLayer); // Add the FeatureLayer to the GroupLayer
              });
          });
      });
      map.add(obnLayer)

        // Örnefni
        // Define a renderer that displays only the text labels
        const ornefniFlakar = new GeoJSONLayer({
          url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_flakar&outputFormat=json",
          copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
          visible: true, 
          editable: false,
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
          copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
          visible: true, 
          editable: false,
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
        MultipointToPoint.convertToPoint(map);

        // Create a GroupLayer to contain örnefni
        const ornefniLayer = new GroupLayer({
          title: "Örnefni",
          copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
          visible: false,
          editable: false,
          layers: [ornefniFlakar, ornefniLinur],
          });
        map.add(ornefniLayer, 3)

        // WMS of LMI
        const wmsLayer = new WMSLayer({
          url: "https://gis.lmi.is/geoserver/IS_50V/wms?service=WMS&version=1.1.0",
          title: "Landmælingar Íslands IS 50V",
          copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
          visible: false, 
          sublayers: [
            {
              name: "IS_50V:ornefni_punktar", // Layer to filter out from WMS
              title: "Örnefni punktar", // title for in legend
              copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
              lengedUrl: ""}, // Url for legend image as png
            {
            name: "IS_50V:ornefni_linur", // Layer to filter out from WMS
            title: "Örnefni línur", // title for in legend
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
            lengedUrl: ""}, // Url for legend image as png
            {
            name: "IS_50V:ornefni_flakar", // Layer to filter out from WMS
            title: "Örnefni flákar", // title for in legend
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
            lengedUrl: ""}, // Url for legend image as png
            {
            name: "IS_50V:samgongur_linur", // layer to filter out from WMS
            title: "Samgöngur línur", // title for in legend
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
            legendUrl: ""}, // Url for legend image as png
            {
            name: "IS_50V:vatnafar_punktar", // Layer to filter out from WMS
            title: "Vatnafar punktar", // title for in legend
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
            lengedUrl: ""}, // Url for legend image as png
            {
              name: "IS_50V:vatnafar_linur", // Layer to filter out from WMS
              title: "Vatnafar línur", // title for in legend
              copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
              lengedUrl: ""}, // Url for legend image as png
            {
            name: "IS_50V:vatnafar_flakar", // Layer to filter out from WMS
            title: "Vatnafar flákar", // title for in legend
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
            lengedUrl: ""}, // Url for legend image as png
          ]}); 
          map.add(wmsLayer,0)

          const wmsImagery = new WMSLayer({
            url: "https://gis.lmi.is/mapcache/web-mercator/wms?service=WMS&version=1.1.0",
            title: "Landmælingar Íslands Kortar",
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
            visible: false, 
            sublayers: [{
                name: "Bathymetry", // layer to filter out from WMS
                title: "Bathymetry", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "Ferdakort_750", // Layer to filter out from WMS
                title: "Ferðakort 1:750.000", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "LMI_Island_einfalt", // Layer to filter out from WMS
                title: "LMÍ, Ísland, einfalt", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "LMI_Kort", // Layer to filter out from WMS
                title: "LMI Kort", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "LMI_Landslag", // Layer to filter out from WMS
                title: "LMI_Landslag", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "DEM", // Layer to filter out from WMS
                title: "IslandsDEM", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "IslandsDEMDaylight", // Layer to filter out from WMS
                title: "IslandsDEM Daylight", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "LMI_raster:Atlas_50", // Layer to filter out from WMS
                title: "Herforingjaráðskort Dana, 1:50.000", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "AMS", // Layer to filter out from WMS
                title: "AMS 1:50.000", // title for in legend
                visible: false,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
                {
                name: "LMI_raster:atlas", // Layer to filter out from WMS
                title: "Atlas 1:100.000", // title for in legend
                visible: true,
                copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            ]}); 
            map.add(wmsImagery,0)
        
        return map;
        }    
      };
    });
    