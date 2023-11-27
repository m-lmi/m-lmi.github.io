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
  "esri/layers/GeoJSONLayer", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
  //"esri/layers/SceneLayers",
  "esri/layers/FeatureLayer",
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
    GeoJSONLayer,
    //SceneLayers,
    FeatureLayer,
    ) {
    return {
      setupScene: function(map) {
      // The clipping extent for the scene
      const drangaExtent = {
        // autocasts as new Extent()
        xmax: -21,
        xmin: -23.5,
        ymax: 66.5,
        ymin: 65.5,
        spatialReference: {
          // autocasts as new SpatialReference()
          wkid: 4326
        }
      };

      const icelandExtent = {
        // autocasts as new Extent()
        xmax: -11.4946155548096,
        xmin: -26.5326824188232,
        ymax: 67.5664443969727,
        ymin: 62.295768737793,
        spatialReference: {
          // autocasts as new SpatialReference()
          wkid: 4326
        }
      };
  
      // Make new 3D SceneView
      const mapView = new SceneView({
        container: "viewDiv", //This your main container in HTML for all the widgets
        map: map, // scene if I upload scene ready with id from AGOL
        // Indicates to create a local scene
        viewingMode: "global", //opion "local" to make cropped 2D
        // Use the exent defined in clippingArea to define the bounds of the scene
        //clippingArea: icelandExtent, // Use for local
        extent: drangaExtent,
        // or us the option to define center instead of extent
        //center: [-18.80500, 65.02700],
        //zoom: 7
        // Turns off atmosphere and stars settings
        environment: {
          weather: {
            type: "cloudy", // autocasts as new CloudyWeather({ cloudCover: 1 })
            cloudCover: 0.2
          },
          atmosphere: {
            quality: "high"
          },
          /*lighting: {
            waterReflectionEnabled: true,
            ambientOcclusionEnabled: true
          }*/
        }
      });
        
        // Read URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const x = parseFloat(urlParams.get('x'));
        const y = parseFloat(urlParams.get('y'));
        const z = parseFloat(urlParams.get('z'));
        const tilt = parseFloat(urlParams.get('tilt'));
        const heading = parseFloat(urlParams.get('heading'));
  
        // If x, y, and z are valid, set the camera
        if (x && y && z) {
          mapView.when(() => {
            mapView.camera = {
              position: {
                x: x,
                y: y,
                z: z,
                spatialReference: mapView.spatialReference
              },
              tilt: tilt || 0,  // Default to 0 if not provided
              heading: heading || 0  // Default to 0 if not provided
            };
          });
        }
        
        return mapView;
      }    
    };
  });
  