require([
    "modules/mapConfig",
    "modules/basicWidgets",
    "modules/weatherDaylight",
    "modules/measurementWidget",
    //"modules/cameraPosition",
    "esri/config",
    "esri/WebMap",
    "esri/views/SceneView",
    "esri/Map",
    "esri/WebScene",
    //"esri/widgets/Search",
    //"esri/widgets/Legend",
    "esri/widgets/Home",
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
  ], (
    MapConfig,
    BasicWidgets,
    WeatherDaylight,
    MeasurementWidget,
    //CameraPosition,
    esriConfig,
    WebMap,
    SceneView,
    Map,
    WebScene, 
    //Search,
    //Legend,
    Home,
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
  ) => {
    
      // Initialize the map, widgets, etc.
    const mapView = MapConfig.setupScene(); // Capture the returned mapView
    WeatherDaylight.setupWeatherDaylight(mapView);
    MeasurementWidget.setupMeasurementWidget(mapView);
    BasicWidgets.setupBasicWidgets(mapView);

    let activePanel = null;

    document.getElementById("basemapsBtn").addEventListener("click", function() {
        togglePanel("basemapsPanel");
      });
      
      document.getElementById("layersBtn").addEventListener("click", function() {
        togglePanel("layersPanel");
      });

      document.getElementById("searchBtn").addEventListener("click", function() {
        togglePanel("searchPanel");
      });      

    document.getElementById("distanceBtn").addEventListener("click", function() {
        togglePanel("distancePanel");
      });
  
    document.getElementById("areaBtn").addEventListener("click", function() {
        togglePanel("areaPanel");
    });

    document.getElementById("weatherBtn").addEventListener("click", function() {
        togglePanel("weatherPanel");
      });

    document.getElementById("daylightBtn").addEventListener("click", function() {
        togglePanel("daylightPanel");
    });

    // Toggle pannels, except that problematic measurements buttons
    function togglePanel(panelId) {
        if (activePanel) {
            document.getElementById(activePanel).style.display = "none";
        }
        
        if (activePanel !== panelId) {
            document.getElementById(panelId).style.display = "block";
            activePanel = panelId;
        } else {
            activePanel = null;
        }
        }

    /*
    // Load a basemap from https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap-id
    const map = new Map({
      basemap: "satellite",
      ground: "world-elevation"
    });

    // load webscene from ArcGIS Online
    const terrain3d = new WebScene({
      portalItem: {
        id: "7029fb60158543ad845c7e1527af11e4"
      }
    });

    // The clipping extent for the scene
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
      extent: icelandExtent,
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
        lighting: {
          waterReflectionEnabled: true,
          ambientOcclusionEnabled: true
        }
      }
    });
    */

    /*
    // Add GeoJSON of municipality boundaries
    const morkSveitarfelag = new GeoJSONLayer({
    url: "https://gis.lmi.is/geoserver/IS_50V/mork_sveitarf_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:mork_sveitarf_flakar&outputFormat=json",
    copyright: "Landmælingar Íslands IS50V",
    visible: true, 
    //popupTemplate: template,
    //renderer: renderer_morkSveitarfelag,
    title: "Mörk Sveitarfelag",
    orderBy: {
      field: "nrsveitarfelags"
    }
    });
    map.add(morkSveitarfelag);
    */

    // Add earthquakes as features
    /*const featureLayer = new FeatureLayer({
        url: "https://luk.vedur.is/arcgis/rest/services/skjalftar/skjalftar_isn93/FeatureServer/1"
    });
    map.add(featureLayer);*/

  /***********************************
  * Add weather and day widget
  ***********************************/
 /*
  const weatherExpand = new Expand({
    view: view,
    expandTooltip: "Expand weather widget",
    content: new Weather({
      view: view
    }),
    group: "top-left",
    expanded: false
  });

  const daylightExpand = new Expand({
    view: view,
    expandTooltip: "Expand daylight widget",
    content: new Daylight({
      view: view
    }),
    group: "top-left"
  });
  view.ui.add([weatherExpand, daylightExpand], "top-left"); 
*/
  
  // Add legend
    const legend = new Legend ({
        view: mapView
    });
    mapView.ui.add(legend, "bottom-right");
});